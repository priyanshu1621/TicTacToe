const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn= document.querySelector(".btn");

let currentPlayer;
let gameGrid;

// Winning of either x Or y player
const winningPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

// Let create the function to initialise the game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "" ,"" ,"", "", "", "",""];
    boxes.forEach((box, index) => {
        box.innerText ="";
        boxes[index].style.pointerEvents = "all";
        
        //one more things to add , green color to remove we the winner win the game ( initialize box with css property again)
        box.classList = `box box${index+1}`;

    } );
    newGameBtn.classList.remove("active");
    // newGameBtn.classList.remove("active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

initGame();

// Swap chance function
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    // Ui update
    
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}


//  check gameOver
function checkGameOver(){
    
    let answer = "";

    winningPosition.forEach((position) => {
        // all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]]  !== "")
        && (gameGrid[position[0]] === gameGrid[ position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]] )){


            //check if winner is x
            if(gameGrid[position[0]] === ["x"])
                answer = "X";
            else{
                answer ="O";

            }
            // disable pointer events -> when we got the winner
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })
           
            // Now we know x/0 is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            
        }

        // when there is no winner (Tie)
        let fillCount = 0;
        gameGrid.forEach((box) =>{
            if(box !== "")
                fillCount++;
        });

        // board is filled , game is TIE
        if(fillCount === 9){
            gameInfo.innerHTML = "Game Tied!";
            newGameBtn.classList.add("active");
        }

    });
// If we have a winner
    // is answer is non-empty -> we got winner
    if(answer !== "")
        {
            gameInfo.innerHTML = `Winner Player - ${answer}`;
            newGameBtn.classList.add("active");
            return
        }
}

// we know no winner found,
// Handel click which helps in mark and un-mark of indexes
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;

        // by this cursor not change to pointer
        boxes[index].style.pointerEvents = "none";

        // swap Turn
        swapTurn();
        // Check is there any winner
        checkGameOver();
    }
}
// check click the send the index to game grid
boxes.forEach((box, index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click" , initGame);



