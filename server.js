///////////////
//SETTING DEPENDENCIES
///////////////
const express = require('express');
const pokemons = require("./models/pokemon.js")
const methodOverride = require("method-override")


///////////////
//INITIALIZING EXPRESS
///////////////
const app = express();
// const port = 3000;


//MIDDLEWARE
//runs in the middle of the request/response cycle
//not necessary
// app.use((req, res, next) => {
  //   console.log("I run for all routes")
  //   next()
  // })
  
  //TELLING EXPRESS TO USE MIDDLEWARE
  //Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
  //The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
  app.use(express.static("public"));
  app.use(express.urlencoded({
      extended: false
  }));
  app.use(methodOverride("_method"));
  
  ///////////////
  //DEFINE ROUTES
  ///////////////

  //I
  //N
  //D
  //U
  //C
  //E
  
//INDEX
//creates an index page with the data from the fruits array (fruits.js)
app.get("/pokemons/new", (req, res) => {
    //applies the value of fruits to the allFruits object that we can utilize in index.ejs
    res.render("index.ejs", {
      data: pokemon
  });
});

//NEW
//gets info from the new.ejs file. a form was made to allow a user to create a new fruit
app.get("/pokemons/new", (req, res) => {
  res.render("new.ejs");
});

//DELETE
app.delete("/pokemons/:id", (req, res) => {
  pokemon.splice(req.params.id, 1);
  res.redirect("/pokemons");
});

//UPDATE ROUTE
app.put("/pokemons/:id", (req, res) => {
  const updatePokemon = {
      name: req.body.name,
      img: req.body.img,
      type: req.body.img,
      stats: {
          hp: req.body.hp,
          attack: req.body.attack,
          defense: req.body.defense,
          spattack: req.body.spattack,
          spdefense: req.body.spdefense,
          speed: req.body.speed
      }
  };
  pokemon[req.params.id] = updatePokemon;
  res.redirect(`/pokemons/${req.params.id}`);
});

//CREATE NEW
//this takes the input that was received in the new section, and pushes the info to the fruits array. has a conditional to recognize a boolean value
app.post("/pokemons/", (req, res) => {
  const newPokemon = {
      name: req.body.name,
      img: req.body.img,
      type: req.body.img,
      stats: {
          hp: req.body.hp,
          attack: req.body.attack,
          defense: req.body.defense,
          spattack: req.body.spattack,
          spdefense: req.body.spdefense,
          speed: req.body.speed
      }
  };
  pokemon.push(newPokemon);
  res.redirect("/pokemons");
});

//EDIT
app.get("/pokemons/:id/edit", (req, res)=>{
  res.render("edit.ejs", {
      aPokemon: pokemon[req.params.id],
      index: req.params.id
  });
});

//SHOW
//shows info on the specific fruit that was selected
app.get("/pokemons/:id", (req, res)=>{
  res.render("show.ejs", {
      index: req.params.id,
      aPokemon: pokemon[req.params.id]
  });
});

//ROUTE LISTENER
app.listen(3000, ()=>{
  console.log("Welcome to the world of Pokemon!")
});