const { Router } = require("express");
const controller = require('../controllers/users.controller');

const router = Router();

router.get("/", controller.getAllUsers);
router.get("/:username", controller.getUser);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);

module.exports = router;