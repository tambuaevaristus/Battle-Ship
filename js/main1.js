// ************
// Model
// ***********
var model = {
  rows: 7,
  cols: 7,
  shipsSunk: 0,
  numberOfGuess: 0,
  shipLocations: [],
  y_Axis: ["A", "B", "C", "D", "E", "F", "G"],

  table: document.getElementById("table"),
  form: document.getElementById("inputForm"),
  
};

// ************
// View   //
// ***********

view = {
  displayMessage: function (message) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = message;
  },

  displayHit: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
    var audio = new Audio("/assets/mixkit-martial-arts-fast-punch-2047.wav");
    audio.play();
  },

  displayMiss: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
    var audio = new Audio(
      "/assets/mixkit-technological-futuristic-hum-2133.wav"
    );
    audio.play();
  },

  displayWin: function (message) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = message;
    var audio = new Audio(
      "/assets/mixkit-stadium-crowd-light-applause-362.wav"
    );
    audio.play();
  },

  // Create imaginary grid on the board
  createGrid: function () {
    for (let i = 0; i < model.rows; i++) {
      const tr = document.createElement("tr");
      let x = model.y_Axis[i];
      for (let j = 0; j < model.cols; j++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", x + "" + j);
        tr.appendChild(cell);
      }
      table.appendChild(tr);
    }
  },

  // Display ship location on the board
  loadShips: function () {
    for (let i = 0; i < 15; i++) {
      let randomRow = Math.floor(Math.random() * 7);
      let randomCol = model.y_Axis[Math.floor(Math.random() * 7)];

      let locationId = randomCol + "" + randomRow;

      // make sure a  location does not repeat
      if (model.shipLocations.includes(locationId) == false) {
        model.shipLocations.push(locationId);
      }
      if (model.shipLocations.length == 4) {
        return;
      }

      model.shipLocations.map((location) => {
        document.getElementById(location).setAttribute("data-state", "1");
        // document.getElementById(location).style.backgroundColor = "red";
        // displayHit(location)
      });
    }
  },
};





// ***************
// Controller Methods
//****************** */

var controller = {

   play: function (e) {
        e.preventDefault();
        const inputGuest = document.getElementById("input").value;
      
        const cell = document.getElementById(inputGuest);
      
        if (cell.className == "miss") {
          view.displayMessage("You Seleted this cell already!!!  Try again ");
        } else if (cell.className == "hit") {
          view.displayMessage("You Destroyed this ship already!!!  Try again ");
        } else {
          model.numberOfGuess++;
          if (model.shipsSunk == 2) {
            view.displayHit(inputGuest);
            view.displayWin(
              "Congrats You Sinked 3 ships after " + numberOfGuess + " Attemps"
            );
            return;
          } else if (cell.getAttribute("data-state") == "1") {
            view.displayHit(inputGuest);
            shipsSunk++;
            view.displayMessage("Congratulations You Destroyed " + shipsSunk + " Ship");
          } else {
            view.displayMiss(inputGuest);
            view.displayMessage("You missed!!! Try Again!");
          }
        }
      
        //   document.getElementById("input").value = " ";
      },
      
      startGame: function () {
        // shipLocations = [];
        view.loadShips();
        var audio = new Audio("/assets/mixkit-trumpet-fanfare-2293.wav");
        audio.play();
      }
      
}

model.form.addEventListener("submit", controller.play);

document.getElementById("button").onclick = controller.startGame;

view.createGrid();
