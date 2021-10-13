//Importamos express, es nuestro framework para el servidor con node.js
const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

//Peticiones al servidor
//app.get("/", (req, res) => {
//  res.send("API is running");
//});

//app.get("/api/entrys", (req, res) => {
//  res.json(notes);
//});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

//Indicamos en que puerto va a estar hosteado el servidor
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
