const express = require("express");
const commentController = require("../controllers/CommentController.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

router.post("/", verifyToken, commentController.createComment);
router.get("/:match", verifyToken, commentController.getComments);

module.exports = router;
