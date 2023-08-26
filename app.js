const express = require("express");
const cors = require("cors");
const http = require("http");
// const DbConnect = require("./src/config/dbConfig");
const Socket = require("socket.io");
const Dotenv = require("dotenv");
const MainRouter = require("./src/routes");
require("colors");
if (process.env.NODE_ENV === "development") {
}

const MyServer = async () => {
  // Runnning dotenv
  Dotenv.config();
  if (process.env.NODE == "development") {
  }

  const app = express();
  const server = http.createServer(app);
  const PORT = process.env.PORT || 3006;
  try {
    // Socket IO
    let Io = Socket(server, { cors: { origin: "*", credential: true } });

    // Running DataBase;
    // await DbConnect();

    //App config
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Main Routes
    app.use(MainRouter);

    server.listen(PORT, () =>
      console.log(`Server Started on ${PORT}`.cyan.bold)
    );

    Io.on("connection", (socket) => {
      socket.on("initial-emit", (args) => {
        socket.emit("initial-on", args);
      });
      socket.on(`disconnect`, (reason) => {
        console.log("Io disconnected");
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//Running Server
MyServer();
