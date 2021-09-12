const mongoose = require('mongoose');

// Article Schema
const appSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
let Application = module.exports = mongoose.model('Application', appSchema);
