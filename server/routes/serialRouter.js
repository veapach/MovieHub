const Router = require("express");
const router = new Router();
const serialController = require("../controller/serialController");

router.post("/series", checkRole("ADMIN"), serialController.createSerial);
router.get("/series", serialController.getSerials);
router.get("/series/:id", serialController.getSerialById);
router.put("/series/:id", checkRole("ADMIN"), serialController.editSerial);
router.delete("/series/:id", checkRole("ADMIN"), serialController.deleteSerial);

module.exports = router;
