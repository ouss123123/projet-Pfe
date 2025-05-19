const express = require("express");
const commentController = require("../controllers/CommentController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const validate = require("../middlewares/validate.js");

const router = express.Router();

router.post("/",verifyToken,commentController.createComment)

module.exports = router;
