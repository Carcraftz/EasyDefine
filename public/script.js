// force https
if (location.protocol != "https:") {
  location.href =
    "https:" + window.location.href.substring(window.location.protocol.length);
}
//remove items on page load
$(function() {
  $("#syllables").hide();
  $("#definition").hide();
  $("#similar").hide();
});
//get word info
function getWordInfo() {
  console.log(document.getElementById("inputField").value);
  let word = document.getElementById("inputField").value;
  document.getElementById("altoption").value = "Define Another Word";
  document.getElementById("word-header").innerHTML = word;
  //hide elements
  $("#enterbox").toggle("fast", function() {});
  $("#description").toggle("fast", function() {});
  //show data
  $("#definition").show();
  $("#syllables").show();
  $("#similar").show();
  //$("#similar > .table")[0].hide()

  //get definitions
  fetch("define?word=" + word)
    .then(response => response.json()) // parse the JSON from the server
    .then(data => {
      let finalstringdef = "";
      let i = 1;
      data.results.forEach(result => {
        finalstringdef += i + ": " + result.definition + "<br>";
        i++;
      });
      let finalstringsyll = "";
      finalstringsyll += "Count: " + data.syllables.count + "<br>[";
      data.syllables.list.forEach(syllable => {
        finalstringsyll += syllable + "|";
      });
      finalstringsyll = finalstringsyll.substring(
        0,
        finalstringsyll.length - 1
      );
      finalstringsyll += "]";
      $("#definition > .loader").hide();
      $("#definition > .text")[0].innerHTML = finalstringdef;
      $("#syllables > .loader").hide();
      $("#syllables > .text")[0].innerHTML = finalstringsyll;
    });
  //get synonyms and antonyms
  fetch("similar?word=" + word)
    .then(response => response.json()) // parse the JSON from the server
    .then(data => {
      let table = $("#similar > .table")[0];
      let syns = [];
      let ants = [];
    //collect data
      data.forEach(entry => {
        entry.meta.syns.forEach(syn1 => {
          syn1.forEach(syn => {
            console.log(syn);
            syns.push(syn);
          });
        });
        entry.meta.ants.forEach(ant1 => {
          ant1.forEach(ant => {
            console.log(ant);
            ants.push(ant);
          });
        });
      });
      console.log(syns);
      console.log(ants);
      //populate table
      for (let i = 1; i <= Math.max(syns.length, ants.length); i++) {
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        if (syns[i]) {
          cell1.innerHTML = syns[i];
        }
        var cell2 = row.insertCell(1);
        if (ants[i]) {
          cell2.innerHTML = ants[i];
        }
      }
      $("#similar > .loader").hide();
    });
}
