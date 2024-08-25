const Router = require("express");
const router = new Router();
const reviewController = require("../controller/review.controller");

router.post("/reviews", reviewController.createReview); //создание отзыва
router.get("/reviews/user", reviewController.getReviewsByUser); //получение отзывов от пользователя http://localhost:8080/api/reviews/user?id=1
router.delete("/reviews/:id", reviewController.deleteReview); //удаление отзыва (moviehub.com/api/reviews/{review_id})
router.get("/reviews/film", reviewController.getAllReviewsForFilm); //http://localhost:8080/api/reviews/film?id=1
router.put("/reviews/edit", reviewController.editReview); //http://localhost:8080/api/reviews/edit?id=1
router.get("/reviews/average-rating", reviewController.getAverageRating); //http://localhost:8080/api/reviews/average-rating?film_id=1

module.exports = router;
