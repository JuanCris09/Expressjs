const express = require("express");
const app = express();

//1. Middleware function
let validateId = (req, res, next) => {
  console.log("1. Id :-:- ", req.params.id);
  next();
};

//2. Middleware function
let validateDBInfo = (req, res, next) => {
  console.log("2. Validating user info :-:- ", req.method);
  next();
};

app.use("/users/:id", validateId, validateDBInfo);

app.get("/users/:id", (req, res) => {
  res.send(["John", "Mitch", "Doe"]);
});

app.get("/users/data/:id", [validateId, validateDBInfo], (req, res) => {
  res.send(["John", "Mitch", "Doe"]);
});

const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Listening to port ${port}`));