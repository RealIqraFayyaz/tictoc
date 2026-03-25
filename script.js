let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;

let board = ["","","","","","","","",""];

let winPatterns = [
  // Horizontal wins
  [0,1,2],
  [3,4,5],
  [6,7,8],
  // vertical wins
  [0,3,6],
  [1,4,7],
  [2,5,8],
  // Diagonal wins.
  [0,4,8],
  [2,4,6]
];

cells.forEach((cell,index)=>{
  cell.addEventListener("click",()=>cellClick(index));
});

function cellClick(index){
  if(board[index] !== "" || !gameActive){
    return;
  }

  board[index] = currentPlayer;
  
  // Set text and color
  cells[index].textContent = currentPlayer;
  if(currentPlayer === "X"){
    cells[index].classList.add("x");
  }else{
    cells[index].classList.add("o");
  }

  checkWinner();

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner(){
  for(let pattern of winPatterns){
    let a = board[pattern[0]];
    let b = board[pattern[1]];
    let c = board[pattern[2]];

    if(a && a === b && b === c){
      statusText.textContent = a + " Wins!";
      gameActive = false;
      return;
    }
  }

  if(!board.includes("")){
    statusText.textContent = "Draw!";
    gameActive = false;
  }
}

function restartGame(){
  board = ["","","","","","","","",""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x","o");
  });
  statusText.textContent = "";
  currentPlayer = "X";
  gameActive = true;
}