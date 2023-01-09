const departmentHeadRouter = require("express").Router();
const DepartmentHeads = require("../models/departmentHeads");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

departmentHeadRouter.get("/", async (request, response) => {
  const deparmentHeads = await DepartmentHeads.find({})
  response.status(200).json(deparmentHeads)
});
departmentHeadRouter.get("/:id", async (request, response) => {});

departmentHeadRouter.post(
  "/",
  middleware.userExtractor,middleware.checkAdmin,
  async (request, response) => {

    if (request.forbidden) {
      return response.status(401).json({message:"You shall not Pass"})
    }
    const { name, description,department } = request.body;
    const employee=Math.floor(Math.random() * 10000)
    console.log(employee)
    const departmentHead = new DepartmentHeads({ name,description,department,employee });
    const savedHead = await departmentHead.save();
    response.status(201).json(savedHead);
  }
);

departmentHeadRouter.put("/:id",middleware.userExtractor,middleware.checkAdmin, async (request, response) => {
  if (request.forbidden) {
    return response.status(401).json({message:"You shall not Pass"})
  }

  const updated = request.body;

  const departmentHead = await DepartmentHeads.findByIdAndUpdate(
    request.params.id,
    updated,
    { new: true, runValidators: true, context: "query" }
  );
  if (departmentHead) {
    response.status(200).json(updated);
  } else {
    response.status(404).end();
  }
});

departmentHeadRouter.delete("/:id",middleware.userExtractor,middleware.checkAdmin, async (request, response) => {
  if (request.forbidden) {
    return response.status(401).json({message:"You shall not Pass"})
  }
  const departmentHead = await DepartmentHeads.findById(request.params.id);
  if (!departmentHead) {
    return response
      .status(404)
      .json({ message: "requested resource not found" });
  }
  await DepartmentHeads.findByIdAndRemove(request.params.id);
  return response.status(204).end();
});

module.exports = departmentHeadRouter;
