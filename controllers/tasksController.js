const Task = require("../models/Task");
const catchAsync = require("../utils/catchAsync");

exports.getAllTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    result: "success",
    tasks,
  });
});

exports.createTask = catchAsync(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    result: "success",
    task,
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(Error("No task found by this id"));
  }
  res.status(201).json({
    result: "success",
    task,
  });
});

exports.updateTask = catchAsync(async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedTask) {
    return next(Error("No task found by this id"));
  }
  res.status(200).json({
    result: "success",
    updatedTask,
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  if (!deletedTask) {
    return next(Error("No task found by this id"));
  }
  res.status(204).send();
});
