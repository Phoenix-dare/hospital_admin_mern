const departmentRouter = require("express").Router();
const Department = require("../models/departments");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

departmentRouter.get("/", async (request, response) => {
  const getDepartments = await Department.find({});
  response.status(200).json(getDepartments);
});
departmentRouter.get("/:id", async (request, response) => {});

departmentRouter.post(
  "/",
  middleware.userExtractor,
  middleware.checkAdmin,
  async (request, response) => {
    if (request.forbidden) {
      return response.status(401).json({ message: "You shall not Pass" });
    }

    const { name, founded, description } = request.body;
    const department = new Department({ name, founded, description });
    const savedDepartment = await department.save();
    response.status(201).json(savedDepartment);
  }
);

departmentRouter.put(
  "/:id",
  middleware.userExtractor,
  middleware.checkAdmin,
  async (request, response) => {
    if (request.forbidden) {
      return response.status(401).json({ message: "You shall not Pass" });
    }

    const updated = request.body;

    const department = await Department.findByIdAndUpdate(
      request.params.id,
      updated,
      { new: true, runValidators: true, context: "query" }
    );
    if (department) {
      response.status(200).json(updated);
    } else {
      response.status(404).end();
    }
  }
);

departmentRouter.delete(
  "/:id",
  middleware.userExtractor,
  middleware.checkAdmin,
  async (request, response) => {
    if (request.forbidden) {
      return response.status(401).json({ message: "You shall not Pass" });
    }
    const department = await Department.findById(request.params.id);
    if (!department) {
      return response
        .status(404)
        .json({ message: "requested resource not found" });
    }
    await Department.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  }
);

module.exports = departmentRouter;
