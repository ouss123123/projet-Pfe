const express = require("express");
const stadiumController = require("../controllers/StadiumController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const {
  createStadiumValidator,
  deleteStadiumValidator
} = require("../validations/stadiumValidation.js");
const validate = require("../middlewares/validate.js");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  createStadiumValidator,
  validate,
  stadiumController.createStadium
);

router.get(
    "/"
    ,verifyToken,
    stadiumController.getStadiums
)

router.delete(
  "/:id",
  verifyToken,
  deleteStadiumValidator,
  validate,
  stadiumController.deleteStadium
);

module.exports = router;
