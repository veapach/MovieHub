const { Film } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const { Op } = require("sequelize");

class filmController {
  async createFilm(req, res, next) {
    try {
      const { name, genre, year_of_release, cast_members, description, duration, trailer, is_serial, rating } =
        req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const film = await Film.create({
        name,
        poster: fileName,
        genre,
        year_of_release,
        cast_members: Array.isArray(cast_members) ? cast_members : [cast_members],
        description,
        duration,
        trailer,
        is_serial,
        rating,
      });
      return res.json(film);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getFilms(req, res) {
    let { genre, rating, limit, page } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    let films;
    if (!genre && !rating) {
      films = await Film.findAndCountAll({ limit, offset });
    }
    if (genre && !rating) {
      films = await Film.findAndCountAll({ where: { genre }, limit, offset });
    }
    if (!genre && rating) {
      films = await Film.findAndCountAll({ where: { rating: { [Op.gte]: rating } }, limit, offset });
    }
    if (genre && rating) {
      films = await Film.findAndCountAll({ where: { genre, rating: { [Op.gte]: rating } }, limit, offset });
    }
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

      if (req.files && req.files.img) {
        const { img } = req.files;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
        updateData.poster = fileName;
      }

      const [updated] = await Film.update(updateData, { where: { id } });

      if (!updated) {
        return res.status(404).json({ message: "Film not found" });
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
      return res.json({ message: "Фильм удален" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new filmController();
