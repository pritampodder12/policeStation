const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");

const thief = require("./backend/routes/thief");
// const admin = require('./routes/admin');
// const home = require('./routes/home');

const app = express();

mongoose
  .connect("mongodb://localhost:27017/police_station")
  .then(() => console.log("Connected to Mongodb...."))
  .catch(err => console.log("Could not connect to MongoDB....", err));

app.use(cors());
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "public")));
// app.use("/images",express.static(path.join("images")));

app.use(express.json());

app.use("/api/thiefs", thief);
// app.use('/api/students',students);
// app.use('/api/admin',admin);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listenning to port ${port}......`));
