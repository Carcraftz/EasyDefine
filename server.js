//server side JS code (node.js)
const express = require("express");
const app = express();
const fetch = require("node-fetch");
app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

//when a get request is made to /define on easydefine.glitch.me
app.get("/define", (request, response) => {
  let wordtodefine = request.query.word;
  //
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "zjG4JhpaJPmshnfmEzrmdGz98mNip1fUPaijsnYSMOUXfpaLev"
    }
  };
  fetch("https://wordsapiv1.p.rapidapi.com/words/" + wordtodefine, options)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      response.json(json)
    });
});
app.get("/similar", (request, response) => {
  let wordtodefine = request.query.word;
  fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${wordtodefine}?key=cf7ab287-61c7-4a40-9d68-cc3905c25a42`)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      response.json(json)
    });
});
//https://dictionaryapi.com/api/v3/references/thesaurus/json/test?key=cf7ab287-61c7-4a40-9d68-cc3905c25a42

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
