const Router = require("express");
const router = new Router();
const reviewController = require("../controller/reviewController");

router.post("/", reviewController.createReview); //создание отзыва
router.get("/", reviewController.getReviews); //получение всех отзывов
router.get("/user", reviewController.getReviewsByUser); //получение отзывов от пользователя http://localhost:8080/api/reviews/user?id=1
router.delete("/:id", reviewController.deleteReview); //удаление отзыва (moviehub.com/api/reviews/{review_id})
router.get("/film", reviewController.getAllReviewsForFilm); //http://localhost:8080/api/reviews/film?id=1
router.put("/edit", reviewController.editReview); //http://localhost:8080/api/reviews/edit?id=1
router.get("/getReview", reviewController.getReviewFromUserForFilm); //http://localhost:8080/api/reviews/getReview?user_id=1&film_id=1

module.exports = router;
