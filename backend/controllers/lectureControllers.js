const asyncHandler = require("express-async-handler");
const Lecture = require("../models/lectureModel");

const createLecture = asyncHandler(async (req, res) => {
  const { title, content, image, publicationDate } = req.body;
  if (!title || !content || !image || !publicationDate) {
    res.status(400);
    throw new Error("Por favor rellena todos los datos");
  } else {
    const lecture = await Lecture.create({
      title,
      content,
      image,
      publicationDate,
    });
    if (lecture) {
      res.status(201).json({
        title: lecture.title,
        content: lecture.content,
        image: lecture.image,
        publicationDate: lecture.publicationDate,
      });
    } else {
      res.status(400);
      throw new Error("Hubo un error al guardar la lectura");
    }
  }
});

module.exports = {
  createLecture,
};
