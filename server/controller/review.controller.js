const db = require("../db");

class ReviewController {
  //функция создания отзыва, post запрос когда пользователь нажимает кнопку отправить запрос, все данные в json передаются в body.
  async createReview(req, res) {
    const { user_id, film_id, review, rating } = req.body; //нужно будет передавать в body эти данные(review = текст из окошка с отзывом, rating = оценка которую поставил пользователь с помощью ползунка)
    const newReview = await db.query(
      "INSERT INTO reviews (user_id, film_id, review, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, film_id, review, rating]
    ); //добавление в таблицу reviews этот отзыв. общая таблица всех reviews, чтобы потом можно было на странице с фильмом вытаскиывать все отзывы к нему с помощью film_id. А также можно было выбрать все отзывы пользователя по user_id(функция getReviewsByUser)
    res.json(newReview.rows[0]);
  }

  //удаление отзыва
  async deleteReview(req, res) {
    const id = req.params.id;
    const review = await db.query("DELETE FROM reviews WHERE id = $1 RETURNING *", [id]);
    res.json(review.rows[0]);
  }

  //получение всех отзывов к фильму
  async getAllReviewsForFilm(req, res) {
    const film_id = req.query.id;
    const reviews = await db.query("SELECT * FROM reviews WHERE film_id = $1", [film_id]);
    res.json(reviews.rows);
  }

  //получить отзывы по пользователю
  async getReviewsByUser(req, res) {
    const user_id = req.query.id;
    const reviews = await db.query("SELECT * FROM reviews WHERE user_id = $1", [user_id]);
    res.json(reviews.rows);
  }

  //Изменение отзыва
  async editReview(req, res) {
    const review_id = req.query.id;
    const { review, rating } = req.body;
    const newReview = await db.query("UPDATE reviews SET review = $1, rating = $2 WHERE id = $3 RETURNING *", [
      review,
      rating,
      review_id,
    ]);
    res.json(newReview.rows[0]);
  }

  // Получение средней оценки для определенного фильма
  async getAverageRating(req, res) {
    const film_id = req.query.film_id;
    const result = await db.query("SELECT AVG(rating) AS average_rating FROM reviews WHERE film_id = $1", [film_id]);
    const averageRating = result.rows[0].average_rating;

    // Проверка, чтобы избежать возврата null, если нет отзывов для фильма
    if (averageRating === null) {
      return res.status(404).json({ message: "Нет отзывов для данного фильма" });
    }

    res.json({ averageRating: parseFloat(averageRating).toFixed(2) });
  }
}

module.exports = new ReviewController();
