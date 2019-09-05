const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {type: String, required: true},
  category: {type: String, required: true},
  status : { type: Boolean},
  date: { type: Date, default: null}
});

module.exports = mongoose.model('Taskmodel', taskSchema);


