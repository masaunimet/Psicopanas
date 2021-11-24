//Importamos express, es nuestro framework para el servidor con node.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const entryRoutes = require("./routes/entryRoutes");
const tagRoutes = require("./routes/tagRoutes");
const emotionRoutes = require("./routes/emotionRoutes");
const foromessageRoutes = require("./routes/foromessageRoutes");
const foromessagesaludRoutes = require("./routes/foromessagesaludRoutes");
const foromessagevivenciaRoutes = require("./routes/foromessagevivenciaRoutes");
const foromessagehobbieRoutes = require("./routes/foromessagehobbieRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");
const { dirname } = require("path");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/entries", entryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/emotions", emotionRoutes);
app.use("/api/foromessages",foromessageRoutes);
app.use("/api/foromessagessalud",foromessagesaludRoutes);
app.use("/api/foromessagesvivencias",foromessagevivenciaRoutes);
app.use("/api/foromessageshobbies",foromessagehobbieRoutes);

//---------------Deployment----------------

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

//Indicamos en que puerto va a estar hosteado el servidor
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
