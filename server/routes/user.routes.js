const Router = require("express");
const router = new Router();
const userController = require("../controller/user.controller");

router.post("/user", userController.createUser); //создание пользователя
router.get("/user", userController.getUsers); //получение пользователей всех
router.get("/user/:id", userController.getOneUser); //получение определенного пользователя по id(moviehub.com/api/user/{user_id})
router.put("/user", userController.updateUser); //изменение пользователя
router.delete("/user/:id", userController.deleteUser); //удаление пользователя (moviehub.com/api/user/{user_id})

module.exports = router;
