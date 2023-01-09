const mongoose = require("mongoose");

const departmentHeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employee: {
    type: Number,
    unique: true,
  },
  image: {
    type: String,
    default:"head.jpeg"
  },
  description: {
    type: String,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

departmentHeadSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const DepartmentHeads = mongoose.model("DepartmentHeads", departmentHeadSchema);
module.exports = DepartmentHeads;
