const Router = require("express");
const router = new Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { check } = require("express-validator");

router.post(
  "/registration",
  [
    check("nickname", "Имя не может быть пустым").notEmpty(),
    check("email", "Некорректный email").isEmail(),
    check("password", "Пароль должен быть не менее 5 символов").isLength({ min: 5, max: 12 }),
  ],
  userController.registration
);
router.post("/login", userController.login);
router.get("/getall", userController.getUsers); //получение пользователей всех
router.get("/:id", userController.getOneUser); //получение определенного пользователя по id(http://localhost:8080/api/user/{user_id})
router.put("/edit", authMiddleware, userController.updateUser); //изменение пользователя(http://localhost:8080/api/user/edit?id=1)
router.delete("/:id", authMiddleware, userController.deleteUser); //удаление пользователя (http://localhost:8080/api/user/{user_id})
router.put("/add_friend", authMiddleware, userController.addFriend); //Добавление в друзья (http://localhost:8080/api/user/add_friend?id={user_id}), в body friendId.

module.exports = router;
