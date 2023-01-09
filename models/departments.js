const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:"dep.jpeg"
  },
  founded: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
});

departmentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Departments = mongoose.model("Departments", departmentSchema);
module.exports = Departments;
