const Joi = require("@hapi/joi");
const express = require("express");
const app = express();

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

//Put -> Update
//Middleware in Node JS
app.use(express.json());

app.put("/api/movies/:id", (req, res) => {
  //Validation for id from the user.
  console.log("Put method!", req.params);
  const idValidationSchema = Joi.object({
    id: Joi.number().integer(),
  });
  const idValidationResult = idValidationSchema.validate(req.params);
  if (idValidationResult.error) {
    const errMessage = idValidationResult.error.details[0].message;
    console.log("errMessage :- ", errMessage);
    res.status(400).send(errMessage);
    return;
  }

  //Find the movie, if exists or not
  let movie = movies.find((m) => m.id === parseInt(req.params.id));
  //if not return with suitable message
  if (!movie) {
    res.send(`No movie found for the id :- ${req.params.id}`);
  }

  //Validate for name string
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
 
  //if exists, update the movie
  movie.name = req.body.name;
  movie.genre = req.body.genre;
  res.send(movie);
});


const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Listening to port ${port}`));