const { Router } = require("express");
const controller = require('../controllers/categories.controller');

const router = Router();

router.get("/", controller.getAllCategories);
//router.post("/", controller.createCategory);

module.exports = router;