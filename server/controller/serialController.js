const { Serial } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const { Op } = require('sequelize');

class serialController {
  async createSerial(req, res, next) {
    try {
      const {
        name,
        genre,
        year_of_start,
        year_of_ending,
        cast_members,
        description,
        seasons,
        episodes_in_season,
        duration_of_episode,
        trailer,
        rating,
      } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const serial = await Serial.create({
        name,
        poster: fileName,
        genre,
        year_of_start,
        year_of_ending,
        cast_members: Array.isArray(cast_members) ? cast_members : [cast_members],
        description,
        seasons,
        episodes_in_season,
        duration_of_episode,
        trailer,
        rating,
      });
      return res.json(serial);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getSerials(req, res) {
    let { genre, rating } = req.query;
    let serials;
    const whereClause = {};
    if (genre) whereClause.genre = genre;
    if (rating) whereClause.rating = { [Op.gte]: rating };
    serials = await Serial.findAndCountAll({ where: whereClause });
    return res.json(serials);
  }

  async getSerialById(req, res) {
    const { id } = req.params;
    const serial = await Serial.findOne({ where: { id } });
    return res.json(serial);
  }

  async editSerial(req, res) {
    try {
      const { id } = req.query;
      const updateData = req.body;

      if (req.files && req.files.img) {
        const { img } = req.files;
        let fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        updateData.poster = fileName;
      }

      const [updated] = await Serial.update(updateData, { where: { id } });

      if (!updated) {
        return res.status(404).json({ message: 'Сериал не найден' });
      }

      const updatedSerial = await Serial.findOne({ where: { id } });
      return res.json(updatedSerial);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteSerial(req, res, next) {
    try {
      const { id } = req.params;
      await Serial.destroy({ where: { id } });
      return res.json({ message: 'Сериал удален' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new serialController();
