const express = require("express");
const app = express();


app.use((req, res, next) => {
  console.log("Time:- ", Date.now());
  next();
});

// The function is executed for any type of HTTP request on the /users/:id path.
app.use("/users/:id", (req, res, next) => {
  console.log("Request Type :- ", req.method);
  next();
});

app.get("/", (req, res, next) => {
  res.send("Welcome to middlewares");
});

app.get("/users/:id", (req, res) => {
  res.send(["John", "Mitch", "Doe"]);
});

const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Listening to port ${port}`));