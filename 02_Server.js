const express = require("express");
const app = express();
app.use(express.static("public"));

app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + "/02_WelcomeExpress.html");
});

app.get("/process", (req, res) => {
  let formValues = {
    username: req.query.username,
    lastname: req.query.lastname,
  };
  //res.send("Your request has been processed! :- " + JSON.stringify(formValues));
  res.send(req.query);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port ${port}`));
