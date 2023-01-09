const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employee: {
    type: Number,
    unique: true,
  },
  age: {
    type: Number,
  },
  image: {
    type: String,
    default:"employee.jpeg"
  },
  description: {
    type: String,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departments",
    required: true,
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DepartmentHeads",
    required: true,
  },
});
employeeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Employees = mongoose.model("Employees", employeeSchema);
module.exports = Employees;
