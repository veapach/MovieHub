const db = require("../db");

class ReviewController {
  //функция создания отзыва, post запрос когда пользователь нажимает кнопку отправить запрос, все данные в json передаются в body.
  async createReview(req, res) {
    const { user_id, film_id, review, rating, date_of_review } = req.body; //нужно будет передавать в body эти данные(review = текст из окошка с отзывом, rating = оценка которую поставил пользователь с помощью ползунка)
    const newReview = await db.query(
      "INSERT INTO reviews (user_id, film_id, review, rating, date_of_review) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, film_id, review, rating, date_of_review]
    ); //добавление в таблицу reviews этот отзыв. общая таблица всех reviews, чтобы потом можно было на странице с фильмом вытаскиывать все отзывы к нему с помощью film_id. А также можно было выбрать все отзывы пользователя по user_id(функция getReviewsByUser)
    res.json(newReview.rows[0]);
  }

  async getReviewsByUser(req, res) {
    const id = req.query.id;
    const reviews = await db.query("SELECT * FROM reviews WHERE user_id = $1", [id]);
    res.json(reviews.rows);
  }
}

module.exports = new ReviewController();
