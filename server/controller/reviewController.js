const { Review } = require("../models/models");
const ApiError = require("../error/ApiError");

class ReviewController {
  //функция создания отзыва, post запрос когда пользователь нажимает кнопку отправить запрос, все данные в json передаются в body.
  async createReview(req, res, next) {
    try {
      const { user_id, film_id, review_text, rating, date_of_review } = req.body;
      const review = await Review.create({ user_id, film_id, review_text, rating, date_of_review });
      return res.json(review);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //Получение всех отзывов
  async getAllReviews(req, res, next) {
    try {
      const reviews = await Review.findAll();
      return res.json(reviews);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //удаление отзыва
  async deleteReview(req, res, next) {
    try {
      const { id } = req.params;
      await Review.destroy({ where: { id } });
      return res.json({ message: "Отзыв удален" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //получение всех отзывов к фильму
  async getAllReviewsForFilm(req, res, next) {
    try {
      const { film_id } = req.query;
      const reviews = await Review.findAll({ where: { film_id } });
      return res.json(reviews);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //Получить отзыв к фильму от пользователя
  async getReviewFromUserForFilm(req, res, next) {
    try {
      const { user_id, film_id } = req.query;
      const review = await Review.findAll({ where: { user_id, film_id } });
      return res.json(review);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  //получить отзывы по пользователю
  async getReviewsByUser(req, res, next) {
    try {
      const { user_id } = req.query;
      const reviews = await Review.findAll({ where: { user_id } });
      return res.json(reviews);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //Изменение отзыва
  async editReview(req, res, next) {
    try {
      const { id } = req.query;
      const { review_text, rating, date_of_review } = req.body;
      const review = await Review.update({ review_text, rating, date_of_review }, { where: { id } });
      return res.json(review);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ReviewController();
