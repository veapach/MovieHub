const Router = require("express");
const router = new Router();
const filmController = require("../controller/filmController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), filmController.createFilm);
router.get("/", filmController.getFilms);
router.get("/:id", filmController.getFilmById); //http://localhost:8080/api/film/{film_id} //req.params
router.put("/edit", filmController.editFilm); //http://localhost:8080/api/film/edit?id=1 //req.query
router.delete("/:id", filmController.deleteFilm); //http://localhost:8080/api/film/{film_id} //req.params

module.exports = router;
