const { Router } = require("express");
const controller = require('../controllers/posts.controller');

const router = Router();

router.get("/", controller.getAllPosts);
router.get("/:id", controller.getPost);
router.get("/user/:username", controller.getPostsByUser);
router.get("/tags/:tag", controller.getPostsByTag);
router.post("/", controller.createPost);
router.put("/:id", controller.updatePost);
router.delete("/:data", controller.deletePost);

module.exports = router;