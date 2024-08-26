const Router = require("express");
const router = new Router();
const filmController = require("../controller/filmController");

router.post("/", filmController.createFilm);
router.get("/", filmController.getFilms);
router.get("/:id", filmController.getFilmById); //http://localhost:8080/api/film/{film_id} //req.params
router.put("/edit", filmController.editFilm); //http://localhost:8080/api/film/edit?id=1 //req.query
router.delete("/:id", filmController.deleteFilm); //http://localhost:8080/api/film/{film_id} //req.params

//TO-DO:
//router.get("/average-rating", filmController.getAverageRatingForFilm); //http://localhost:8080/api/film/average-rating?film_id=1
//req.query

module.exports = router;
