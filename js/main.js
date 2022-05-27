// ************
// Model
// ***********

const rows = 7;
const cols = 7;
var shipsSunk = 0;
var numberOfGuess = 0;
var shipLocations = [];
const y_Axis = ["A", "B", "C", "D", "E", "F", "G"];

const table = document.getElementById("table");
let form = document.getElementById("inputForm");
form.addEventListener("submit", play);







// ************
// View   //
// ***********

function displayMessage(message) {
  var messageArea = document.getElementById("messageArea");
  messageArea.innerHTML = message;
}

function displayHit(location) {
  var cell = document.getElementById(location);
  cell.setAttribute("class", "hit");
  var audio = new Audio("/assets/mixkit-martial-arts-fast-punch-2047.wav");
  audio.play();
}

function displayMiss(location) {
  var cell = document.getElementById(location);
  cell.setAttribute("class", "miss");
  var audio = new Audio("/assets/mixkit-technological-futuristic-hum-2133.wav");
  audio.play();
}

function displayWin(message) {
  var messageArea = document.getElementById("messageArea");
  messageArea.innerHTML = message;
  var audio = new Audio("/assets/mixkit-stadium-crowd-light-applause-362.wav");
  audio.play();
}

// Create imaginary grid on the board
function createGrid() {
  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");
    let x = y_Axis[i];
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", x + "" + j);
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
}

// Display ship location on the board
function loadShips() {
  for (let i = 0; i < 15; i++) {
    let randomRow = Math.floor(Math.random() * 7);
    let randomCol = y_Axis[Math.floor(Math.random() * 7)];

    let locationId = randomCol + "" + randomRow;

    // make sure a  location does not repeat
    if (shipLocations.includes(locationId) == false) {
      shipLocations.push(locationId);
    }
    if (shipLocations.length == 4) {
      return;
    }

    shipLocations.map((location) => {
      document.getElementById(location).setAttribute("data-state", "1");
      document.getElementById(location).style.backgroundColor = "red";
      // displayHit(location)
    });
  }
}





// ***************
// Controller Methods
//****************** */

function play(e) {
  e.preventDefault();
  const inputGuest = document.getElementById("input").value;

  const cell = document.getElementById(inputGuest);

  if (cell.className == "miss") {
    displayMessage("You Seleted this cell already!!!  Try again ");
  } else if (cell.className == "hit") {
    displayMessage("You Destroyed this ship already!!!  Try again ");
  } else {
    numberOfGuess++;
    if (shipsSunk == 2) {
      displayHit(inputGuest);
      displayWin(
        "Congrats You Sinked 3 ships after " + numberOfGuess + " Attemps"
      );
      return;
    } else if (cell.getAttribute("data-state") == "1") {
      displayHit(inputGuest);
      shipsSunk++;
      displayMessage("Congratulations You Destroyed " + shipsSunk + " Ship");
    } else {
      displayMiss(inputGuest);
      displayMessage("You missed!!! Try Again!");
    }
  }

  //   document.getElementById("input").value = " ";
}

function startGame() {
  shipLocations =[];
  loadShips();
  var audio = new Audio("/assets/mixkit-trumpet-fanfare-2293.wav");
  audio.play();
}

createGrid();
