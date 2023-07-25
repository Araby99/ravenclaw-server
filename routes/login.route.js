const { Router } = require("express");
const controller = require('../controllers/login.controller');

const router = Router();

router.post("/", controller.login);

module.exports = router;