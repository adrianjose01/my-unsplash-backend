const Image = require("../models/image");
const bcrypt = require("bcryptjs");

exports.getImages = (req, res, next) => {
  Image.find()
    .then((images) => {
      res.status(200).json({ images, message: "Images Fetched!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createImage = (req, res, next) => {
  const { label } = req.body;
  const { imageUrl } = req.body;
  const { password } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedValue) => {
      const image = new Image({
        label,
        imageUrl,
        password: hashedValue,
      });
      return image.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Image Created" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteImage = (req, res, next) => {
  const { imageId } = req.params;
  const { password } = req.body;
  Image.findById(imageId)
    .then((image) => {
      if (!image) {
        const error = new Error("Image Not Found!");
        error.statusCode = 401;
        throw error;
      }
      return bcrypt.compare(password, image.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong Password");
        error.statusCode = 401;
        throw error;
      }
      return Image.findByIdAndRemove(imageId);
    })
    .then(() => {
      res.status(200).json({ message: "Image deleted" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
