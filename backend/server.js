require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
//express app
const app = express(); //Creates an Express application.

//middleware
app.use(express.json());

app.use((req, resp, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);

//connecting DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected & Listening to Port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
