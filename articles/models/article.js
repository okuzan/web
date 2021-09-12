const mongoose = require('mongoose');

// Article Schema
const mailSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  }
});
let Article = module.exports = mongoose.model('Article', mailSchema);

