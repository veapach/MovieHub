const Router = require("express");
const router = new Router();
const userController = require("../controller/userController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", userController.auth);
router.post("/", userController.createUser); //создание пользователя
router.get("/", userController.getUsers); //получение пользователей всех
router.get("/:id", userController.getOneUser); //получение определенного пользователя по id(http://localhost:8080/api/user/{user_id})
router.put("/:id", userController.updateUser); //изменение пользователя(http://localhost:8080/api/user/{user_id})
router.delete("/:id", userController.deleteUser); //удаление пользователя (http://localhost:8080/api/user/{user_id})
router.get("/isadmin", userController.isUserAdmin); //проверка есть ли права админа у пользователя
//(http://localhost:8080/api/user/isadmin?id=1)

module.exports = router;
