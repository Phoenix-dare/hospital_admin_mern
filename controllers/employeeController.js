const employeeRouter = require("express").Router();
const Employees = require("../models/employees");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

employeeRouter.get("/", async (request, response) => {
  const employees = await Employees.find({})
    .populate("department")
    .populate("head");
  response.status(200).json(employees);
});
employeeRouter.get("/:id", async (request, response) => {});

employeeRouter.post(
  "/",
  middleware.userExtractor,middleware.checkAdmin, async (request, response) => {
    if (request.forbidden) {
      return response.status(401).json({message:"You shall not Pass"})
    }

    const { name, description, department, head, age } = request.body;
    const employee = Math.floor(Math.random() * 10000);

    const addEmployee = new Employees({
      name,
      description,
      department,
      employee,
      head,
      age,
    });
    const savedEmployee = await addEmployee.save();
    response.status(201).json(savedEmployee);
  }
);

employeeRouter.put("/:id", middleware.userExtractor,middleware.checkAdmin,async (request, response) => {
  if (request.forbidden) {
    return response.status(401).json({message:"You shall not Pass"})
  }
  const updated = request.body;

  const employee = await Employees.findByIdAndUpdate(
    request.params.id,
    updated,
    { new: true, runValidators: true, context: "query" }
  );
  if (employee) {
    response.status(200).json(updated);
  } else {
    response.status(404).end();
  }
});

employeeRouter.delete("/:id",middleware.userExtractor,middleware.checkAdmin, async (request, response) => {
  if (request.forbidden) {
    return response.status(401).json({message:"You shall not Pass"})
  }
  const employee = await Employees.findById(request.params.id);
  if (!employee) {
    return response
      .status(404)
      .json({ message: "requested resource not found" });
  }
  await Employees.findByIdAndRemove(request.params.id);
  return response.status(204).end();
});

module.exports = employeeRouter;
