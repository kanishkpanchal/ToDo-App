const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require("mongoose");


const Task = require('./models/task');

const app = express();
mongoose.connect("mongodb+srv://kan:XC4uug9yVGzqdJav@cluster0-x4xby.mongodb.net/todo?retryWrites=true&w=majority")
.then(() => {
console.log('Connected to DB!');
})
.catch(() => {
  console.log("Connecion Failed!")
});

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/tasks/", (req,res,next) =>{
  const task = new Task({
    title: req.body.title,
    category: req.body.category,
    status: req.body.status
  });
  console.log(task);
  task.save().then(result =>{
    res.status(201).json({
      message: 'Task Added Succesfully',
      taskId: result._id
    });
  });

});

app.get('/api/tasks',(req,res,next) => {
  Task.find().then(documents => {
    res.status(200).json({
      message: 'Task Added Successfully',
      tasks: documents
    });
  });
});

app.delete("/api/tasks/:id", (req, res, next) => {
  console.log(req.params.id);
  Task.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({message: "Task deleted!"});
  });
});

app.put("/api/tasks/:id", (req,res,next) => {
  const task = new Task({
    title: req.body.title,
    category: req.body.category,
    status: req.body.status
  });
  var newvalues = { $set: {status: task.status} };
  Task.updateOne({ _id: req.params.id}, newvalues ).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Task Status Updated!'
    });
  });
});

module.exports = app;
