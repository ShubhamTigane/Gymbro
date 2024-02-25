const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, resp) => {
  const user_id = req.user._id;
  const workout = await Workout.find({ user_id }).sort({ createdAt: -1 });

  resp.status(200).json(workout);
};

//get a single workout
const getWorkout = async (req, resp) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return resp.status(404).json({ error: "no such workout" });
  }
  resp.status(200).json(workout);
};

//create new workout (POST)
const createWorkout = async (req, resp) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return resp
      .status(400)
      .json({ error: "Please fill all the empty fields", emptyFields });
  }

  //add to db
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    resp.status(200).json(workout);
  } catch (error) {
    resp.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, resp) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp.status(404).json({ error: "is not a valid ID" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return resp.status(400).json({ error: "No such workout" });
  }
  resp.status(200).json(workout);
};

const updateWorkout = async (req, resp) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp.status(404).json({ error: "is not a valid ID" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return resp.status(400).json({ error: "no such workout" });
  }

  resp.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
