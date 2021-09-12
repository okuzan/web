const mongoose = require('mongoose');

// Article Schema
const candSchema = mongoose.Schema({
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
let Candidate = module.exports = mongoose.model('Candidate', candSchema);
