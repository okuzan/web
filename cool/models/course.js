const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  }
});
let Course = module.exports = mongoose.model('Course', courseSchema);
