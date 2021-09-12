const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  }
});
let Ukraine = module.exports = mongoose.model('Ukraine', schema);
