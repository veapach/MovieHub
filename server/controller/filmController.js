const { Film } = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path');
const { Op } = require('sequelize');
const { transliterate } = require('transliteration');

class filmController {
  async createFilm(req, res, next) {
    try {
      const { name, genre, year_of_release, cast_members, description, duration, trailer, rating } = req.body;
      const { img } = req.files;

      // Транслитерация имени и удаление пробелов
      let fileName = `${transliterate(name).replace(/\s+/g, '_')}_poster.jpg`;

      img.mv(path.resolve(__dirname, '..', 'static/posters', fileName));
      const film = await Film.create({
        name,
        poster: fileName,
        genre,
        year_of_release,
        cast_members: Array.isArray(cast_members) ? cast_members : [cast_members],
        description,
        duration,
        trailer,
        rating,
      });
      return res.json(film);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getFilms(req, res) {
    let { genre, rating } = req.query;
    let films;
    const whereClause = {};
    if (genre) whereClause.genre = genre;
    if (rating) whereClause.rating = { [Op.gte]: rating };
    films = await Film.findAndCountAll({ where: whereClause });
    return res.json(films);
  }
  async getFilmById(req, res) {
    const { id } = req.params;
    const film = await Film.findOne({ where: { id } });
    return res.json(film);
  }
  async editFilm(req, res) {
    try {
      const { id } = req.query;
      const updateData = req.body;
      const { name } = req.body;

      if (req.files && req.files.img) {
        const { img } = req.files;
        let fileName;
        if (name) {
          // Транслитерация имени и удаление пробелов
          fileName = `${transliterate(name).replace(/\s+/g, '_')}_poster.jpg`;
        } else {
          const film = await Film.findByPk(id);
          if (!film) {
            return res.status(404).json({ message: 'Фильм не найден' });
          }
          fileName = `${transliterate(film.name).replace(/\s+/g, '_')}_poster.jpg`;
        }
        img.mv(path.resolve(__dirname, '..', 'static/posters', fileName));
        updateData.poster = fileName;
      }

      const [updated] = await Film.update(updateData, { where: { id } });

      if (!updated) {
        return res.status(404).json({ message: 'Фильм не найден' });
      }

      const updatedFilm = await Film.findOne({ where: { id } });
      return res.json(updatedFilm);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async deleteFilm(req, res, next) {
    try {
      const { id } = req.params;
      await Film.destroy({ where: { id } });
      return res.json({ message: 'Фильм удален' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new filmController();
