const express = require("express");

const router = express.Router();

const imageController = require("../controllers/images");

router.get("/images", imageController.getImages);

router.post("/images", imageController.createImage);

router.delete("/images/:imageId", imageController.deleteImage);

module.exports = router;
