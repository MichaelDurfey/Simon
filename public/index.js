 let checkBox = document.getElementById("checkbox");

$("#checkbox").on("click", () => { 
    
  checkBox.classList.toggle("checked")

})

let start = () => console.log("start!")

let greenLightened = '#00f56e';
let redLightened = '#e0151f';
let blueLightened = '#0f77e6';
let yellowLightened = '#f1c709';


let checked = () =>{ 
  console.log(x)
  return x;
}

/*generate Random Moves Arr with length 20*/

let randomMovesArr = [];
let currentIteration = [];
let counter = 0;
let count = 1;

let moveFunction = () => {
  counter++;
  currentIteration.push(randomMovesArr[counter])
  currentIteration[counter]
}