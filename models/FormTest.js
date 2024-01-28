const mongoose = require("mongoose");

const FormTestSchema = mongoose.Schema({
  url: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("FormTest", FormTestSchema);
