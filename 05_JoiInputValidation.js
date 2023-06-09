const express = require("express");
const app = express();
//npm install @hapi/joi
const Joi = require("@hapi/joi");

const movies = [
  { id: 1, name: "Star Wars", genre: "Adventure" },
  { id: 2, name: "Transformers", genre: "Adventure" },
  { id: 3, name: "Toy Story", genre: "Drama" },
  { id: 4, name: "The Pursuit of Happiness", genre: "Fiction" },
  { id: 5, name: "Terminator", genre: "Action" },
];

//Get all the movies
app.get("/api/movies", (req, res) => {
  res.send(movies);
});

//Middleware in Node JS
app.use(express.json());

app.post("/api/movies", (req, res) => {
  console.log("Request Body :- ", req.body);
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    genre: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    const errorMsg = result.error.details[0].message;
    console.log("result:- ", errorMsg);
    res.status(400).send(errorMsg);
    return;
  }

  //Adding the movie to movies list
  let newMovie = {
    id: movies.length + 1,
    name: name,
    genre: genre,
  };

  movies.push(newMovie);
  res.send(newMovie);
});

const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Listening to port ${port}`));