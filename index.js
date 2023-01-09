const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

require("express-async-errors");
require("dotenv").config();

const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/userController");
const loginRouter = require("./controllers/loginController");
const departmentRouter=require("./controllers/departmentController")
const departmentHeadRouter= require("./controllers/departmentHeadController")
const employeeRouter = require("./controllers/employeeController")
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("dist"));

const url = process.env.MONGODB_URI;

console.log("connecting to Database");
mongoose.set("strictQuery", true);
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
//app.use(middleware.checkAdmin)

app.use("/api/users",usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/departmentHead", departmentHeadRouter);

app.use(middleware.unknownEndpoint);


process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
