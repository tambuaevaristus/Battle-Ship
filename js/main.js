const rows = 7;
const cols = 7;
const table = document.getElementById("table");
let form = document.getElementById("form");
form.addEventListener("submit", play)

const y_Axis = ["A", "B", "C", "D", "E", "F", "G"];

function createGrid() {
  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");
    let x = y_Axis[i];
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      cell.setAttribute("class", "cell");
      cell.setAttribute("id", x+""+j)
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
}

function loadShips(){
    
    let locationIdArray = []

for (let i = 0; i <3; i++){
    let randomRow = Math.floor(Math.random() *7)
    let randomCol = y_Axis[Math.floor(Math.random() *7)]

    // make sure a  location does not repeat
    let locationId = randomCol+""+randomRow

    // if(locationIdArray.includes(locationId)){
    
    // }{
        locationIdArray.push(locationId);
        console.log(locationIdArray);
        document.getElementById(locationId).style.backgroundImage = "url(/assets/ship.png)"
        document.getElementById(locationId).style.display = "none"
    // }
    
}

}


function play(e){
    e.preventDefault();
   let  inputGuest = document.getElementById("input").value;

  

   let cell = document.getElementById(inputGuest);

   if(cell.style.display == "none"){
    cell.style.backgroundImage =="url(/assets/ship.png)"
    console.log("on target");
    document.getElementById(locationId).style.display = "block"
   }else{
    cell.style.backgroundImage =="url(/assets/miss.png)"
    console.log("missed");
   }
}

createGrid();
loadShips();