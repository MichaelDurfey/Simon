const checkBox = document.getElementById("checkbox");
let randomMovesArr = [];
let currentIteration = [];
let playerMoves = [];
let counter = 0;
let playerCounter = 0;
let computerTurn = true;
let playerTurn = false;
let move;
let timeout;
let idleTime = 0;
let idleInterval;
let pushed;

const greenNoise = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const redNoise = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const yellowNoise = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const blueNoise = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
const errorSound = new Audio('https://freesound.org/data/previews/142/142608_1840739-lq.mp3');
const noises = [greenNoise, redNoise, yellowNoise, blueNoise];

$('.strictButton').on('click', () => {
  $('#strictLight').toggleClass('active');
})


$("#checkbox").on("click", () => {     
  checkBox.classList.toggle("checked")
  if(!$("#checkbox").hasClass("checked")) {reset();}
});

const lightenedColorsArr = ['green', 'red', 'yellow', 'blue'];

const winnerAction = () => {
  $('.mainCircle').html(`
  <div class = "winText">
  <h1 >You win!</h1>
  </div> 
`)
}

const reset = () => {
  window.clearInterval(move);
  window.clearInterval(idleInterval)
  randomMovesArr = [];
  currentIteration = [];
  playerMoves = [];
  playerTurn = false;
  computerTurn = true;  
  playerCounter = 0;
  counter = 0;
  $('.count').text(`--`)
}

const moveFunction = () => {
  counter = 0;
  window.clearInterval(idleInterval)
  if (currentIteration.length <= 9) {
    timeout = 800;
  }
  else if (currentIteration.length >= 9) {
    timeout = 600;
  }
  else if (currentIteration.length >= 15){
    timeout = 400;
  }
  if (computerTurn = true){
      move = window.setInterval( () => {            
        if (counter == currentIteration.length){
          window.clearInterval(move);
          playerTimeConstraint();
          playerTurn = true;
          computerTurn = false;
        }
        else if (counter == randomMovesArr.length){
          winnerAction();
          window.clearInterval(move);
          window.clearInterval(idleInterval);
        }
        else if (counter < currentIteration.length + 1) {    
          let lightUpButton = randomMovesArr[counter];
          $('.count').text(`${currentIteration.length}`)
          let color = lightenedColorsArr[lightUpButton];
          let noise = noises[lightUpButton];
          $(`#${lightUpButton}`).toggleClass( () => {
            noise.play();
            setTimeout(()=>{$(`#${lightUpButton}`).toggleClass(`${color}`)}, timeout - 200);
            return color;
          });    
          counter++;
        }
    }, timeout);
  }
} // MOVE FUNCTION

const start = () => {
  if($("#checkbox").hasClass("checked")) {
    idleTime = 0;
    while(randomMovesArr.length < 21) {
      randomMovesArr.push(Math.floor(Math.random() * 4));
    }
    currentIteration.push(randomMovesArr[0])
    moveFunction();
  }
};


const buttonPress = (id) => {
  idleTime = 0;
  if (playerTurn == true){
    playerMoves.push(id);
    if (randomMovesArr[playerCounter] != playerMoves[playerCounter]){
      if ($('.strictLight').hasClass('active')){
        reset();
        start();
      } else {
      errorSound.play();
      playerMoves = [];
      playerCounter = 0;
      playerTurn = false;
      computerTurn = true;
      moveFunction();
      }
    }
    else if (randomMovesArr[playerCounter] == playerMoves[playerCounter]){
      playerCounter++;  
    }
    if (playerCounter == currentIteration.length){
      let currentIterationLength = currentIteration.length
      currentIteration.push(randomMovesArr[currentIterationLength]);
      playerMoves = [];
      playerCounter = 0;
      moveFunction();
      computerTurn = true;
      playerTurn = false;
    }
  }
}

//-- BUTTON PRESSES --//
  $('#0').on('click', ()=> { 
    if($("#checkbox").hasClass("checked")){
      idleTime = 0;
      greenNoise.play();
      $('#0').toggleClass('green', 300).promise().done(function(){$('#0').toggleClass('green', 300, "easeOutSine");});
    }
  })
  $('#1').on('click', ()=> { 
    if($("#checkbox").hasClass("checked")){
      idleTime = 0;
      redNoise.play();
      $('#1').toggleClass('red', 300).promise().done(function(){$('#1').toggleClass('red', 300, "easeOutSine");});
    }
  })
  $('#2').on('click', ()=> { 
    if($("#checkbox").hasClass("checked")){
      idleTime = 0;
      yellowNoise.play();
      $('#2').toggleClass('yellow', 300).promise().done(function(){$('#2').toggleClass('yellow', 300, "easeOutSine");});
    }
  })
 $('#3').on('click', ()=> { 
    if($("#checkbox").hasClass("checked")){
      idleTime = 0;
      blueNoise.play();
      $('#3').toggleClass('blue', 300).promise().done(function(){$('#3').toggleClass('blue', 300, "easeOutSine");});
    }
  })
//----BUTTONPRESSES END ---//
let maxTime;

const playerTimeConstraint = () => {
  idleInterval = window.setInterval( () => {
      idleTime += 1;
      if (currentIteration.length <= 9) {
          maxTime = 3;
      }
      else if (currentIteration.length >= 9) {
        maxTime = 2;
      }
      else if (currentIteration.length >= 15){
        maxTime = 1;
      }
      if (idleTime > maxTime){
        window.clearInterval(idleInterval)
        errorSound.play();
        if ($('.strictLight').hasClass('active')){
            reset();
            start();
         } else {
        playerMoves = [];
        playerCounter = 0;
        playerTurn = false;
        computerTurn = true;
        idleTime = 0;
        moveFunction();
        }
      }
  }, 1000)

}