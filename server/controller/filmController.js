const { Film } = require("../models/models");
const ApiError = require("../error/ApiError");

class filmController {
  async createFilm(req, res) {
    const { name, genre, year_of_release, cast_members, description, duration, trailer, is_serial, rating } = req.body;
    const film = await Film.create({
      name,
      genre,
      year_of_release,
      cast_members,
      description,
      duration,
      trailer,
      is_serial,
      rating,
    });
    return res.json(film);
  }
  async getFilms(req, res) {
    const films = await Film.findAll();
    return res.json(films);
  }
  async getFilmById(req, res) {
    const { id } = req.params;
    const film = await Film.findOne({ where: { id } });
    return res.json(film);
  }
  async editFilm(req, res) {
    const { id } = req.query;
    const updateData = req.body;
    const [updated] = await Film.update(updateData, { where: { id } });
    return res.json(updated);
  }
  async deleteFilm(req, res) {
    const { id } = req.params;
    await Film.destroy({ where: { id } });
    return res.json({ message: "Film deleted" });
  }

  //TO-DO:
  // async getAverageRatingForFilm(req, res) {
  //   const { film_id } = req.query;

  //   try {
  //     const result = await Review.findOne({
  //       where: { filmId: film_id },
  //       attributes: [[sequelize.fn("AVG", sequelize.col("rating")), "average_rating"]],
  //       raw: true,
  //     });

  //     const averageRating = result.average_rating;

  //     // Проверка, чтобы избежать возврата null, если нет отзывов для фильма
  //     if (averageRating === null) {
  //       return res.status(404).json({ message: "Нет отзывов для данного фильма" });
  //     }

  //     res.json({ averageRating: parseFloat(averageRating).toFixed(2) });
  //   } catch (error) {
  //     return res.status(500).json({ message: "Ошибка при получении среднего рейтинга", error });
  //   }
  // }
}

module.exports = new filmController();
