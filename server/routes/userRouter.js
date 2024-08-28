const Router = require("express");
const router = new Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.auth);
router.get("/getall", userController.getUsers); //получение пользователей всех
router.get("/:id", userController.getOneUser); //получение определенного пользователя по id(http://localhost:8080/api/user/{user_id})
router.put("/edit", userController.updateUser); //изменение пользователя(http://localhost:8080/api/user/edit?id=1)
router.delete("/:id", userController.deleteUser); //удаление пользователя (http://localhost:8080/api/user/{user_id})

module.exports = router;
