const asyncHandler = require("express-async-handler");
const Lecture = require("../models/lectureModel");
const moment = require("moment");

/**
 * @desc Comprueba si con los datos suministrado pueden crear una lectura para luego devolverlo
 * como un JSON si pudo ser creada
 */
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

/**
 * @desc Busca una lectura del backend por el id y la devuelve en un JSON
 */
const getLectureByID = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (lecture) {
    res.json(lecture);
  } else if (!lecture) {
    res.status(404).json({ message: "Lectura no encontrada" });
  } else {
    res.json(lecture);
  }
});

/**
 * @desc Busca una lectura del backend por la fecha y la devuelve en un JSON
 */
const getActualLecture = asyncHandler(async (req, res) => {
  const start = moment().startOf("Day").toDate();
  const publicatedLectures = await Lecture.find({
    publicationDate: { $lte: start },
  });

  if (publicatedLectures) {
    res.json(publicatedLectures);
  } else {
    res.status(404);
    throw new Error("Ha ocurrido un error");
  }
});

/**
 * @desc Edita una lectura del backend por el id y la devuelve en un JSON
 */
const updateLectureByID = asyncHandler(async (req, res) => {
  const { title, content, image, publicationDate } = req.body;
  const lecture = await Lecture.findById(req.params.id);

  if (lecture) {
    lecture.title = title;
    lecture.content = content;
    lecture.image = image;
    lecture.publicationDate = publicationDate;

    const updatedLecture = await lecture.save();
    res.json(updatedLecture);
  } else {
    res.status(404);
    throw new Error("Lectura no encontrada");
  }
});

/**
 * @desc Busca la lista de lecturas publicadas del backend y la devuelve en un JSON
 */
const listPublicatedLectures = asyncHandler(async (req, res) => {
  const start = moment().startOf("Day").toDate();
  const publicatedLectures = await Lecture.find({
    publicationDate: { $lte: start },
  });

  if (publicatedLectures) {
    res.json(publicatedLectures);
  } else {
    res.status(404);
    throw new Error("Ha ocurrido un error");
  }
});

/**
 * @desc Busca la lista de lecturas no publicadas del backend y la devuelve en un JSON
 */
const listNonPublicatedLectures = asyncHandler(async (req, res) => {
  const start = moment().startOf("Day").toDate();
  const nonPublicatedLectures = await Lecture.find({
    publicationDate: { $gte: start },
  });

  if (nonPublicatedLectures) {
    res.json(nonPublicatedLectures);
  } else {
    res.status(404);
    throw new Error("Ha ocurrido un error");
  }
});

module.exports = {
  createLecture,
  getLectureByID,
  listPublicatedLectures,
  listNonPublicatedLectures,
  updateLectureByID,
  getActualLecture,
};
