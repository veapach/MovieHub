const Router = require("express");
const router = new Router();
const reviewController = require("../controller/review.controller");

router.post("/review", reviewController.createReview); //создание отзыва
router.get("/review", reviewController.getReviewsByUser); //получение отзывов от пользователя moviehub.com/api/review?id={user_id}
//будет добавлено getAllReviewsForFilm, editReview

module.exports = router;
