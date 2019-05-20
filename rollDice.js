var score1 = document.getElementById("score1"),
    score2 = document.getElementById("score2"),
    panel1 = document.querySelector(".player-1-panel");
    panel2 = document.querySelector(".player-2-panel");
    player1 = document.getElementById("player1"),
    player2 = document.getElementById("player2"),
    newButton = document.getElementById("btn-new"),
    rollButton = document.getElementById("btn-roll"),
    holdButton = document.getElementById("btn-hold"),
    dice = document.querySelectorAll("img"),
    resetScore = 0,
    scorePlayer1 = 0,
    scorePlayer2 = 0,
    count = 0,
    gameOver = false;
    currentPlayer = 1;


rollButton.addEventListener("click", function(){
    if(gameOver == false){
        var num1 = randomNumbers();
        var num2 = randomNumbers();
        count += num1 + num2;

        if(num1 == 6 || num2 == 6)
        resetScore++;
        else
        resetScore = 0;

        if(num1 == 1 || num2 == 1){
            changePlayer();
        }else if(resetScore >= 2){
            currentPlayer === 1 ? scorePlayer1 = 0 : scorePlayer2 = 0;
            resetScore = 0;
            document.querySelector("#score"+currentPlayer).textContent = "0";
            changePlayer();
        }
        else{
            dice[0].setAttribute("src","dice-"+num1+".png");
            dice[1].setAttribute("src","dice-"+num2+".png");
            document.querySelector("#current"+currentPlayer).textContent = count;
        }    
    }
});

holdButton.addEventListener("click",function(){
    //Undefined, 0, null or "" are COERCED to FALSE
    var winningScore = document.querySelector(".final-score").value;
    if(!winningScore){
        winningScore = 50;
    }
    
    if(gameOver == false){
        //Sumar la cuenta actual al puntuaje
        if(currentPlayer === 1){
            scorePlayer1 += count;
            score1.textContent = scorePlayer1;
        }
        else{
            scorePlayer2 += count;
            score2.textContent = scorePlayer2;
        }
        if(scorePlayer1 >= winningScore || scorePlayer2 >= winningScore){
            document.querySelector("#player"+currentPlayer).textContent = "WINNER";
            dice[0].setAttribute("src","");
            dice[1].setAttribute("src","");
            document.querySelector(".player-"+currentPlayer+"-panel").classList.remove("active");
            document.querySelector(".player-"+currentPlayer+"-panel").classList.add("winner");
            gameOver = true;
        }else
        changePlayer();
    }
});

newButton.addEventListener("click",newGame);

function newGame(){
    scorePlayer1 = 0; 
    scorePlayer2 = 0; 
    gameOver = false;
    score1.textContent = scorePlayer1;
    score2.textContent = scorePlayer2;
    document.querySelector("#player1").textContent = "Player 1";
    document.querySelector("#player2").textContent = "Player 2";
    document.querySelector(".player-"+currentPlayer+"-panel").classList.add("active");
    document.querySelector(".player-"+currentPlayer+"-panel").classList.remove("winner");
    changePlayer();
}

function randomNumbers(){
    var num = Math.floor(Math.random()*6 + 1);
    return num;
}

function changePlayer(){
    toggleActive();
    //Borrar los dados
    dice[0].setAttribute("src","");
    dice[1].setAttribute("src","");
      //Resetear el current count
      document.querySelector("#current"+currentPlayer).textContent = 0;
    //Cambiar el jugador
    currentPlayer === 1 ? currentPlayer = 2 : currentPlayer = 1;
    //Resetear la cuenta
    count = 0;
}

function toggleActive(){
    panel1.classList.toggle("active");
    panel2.classList.toggle("active");
    player1.classList.toggle("active");
    player2.classList.toggle("active");
}
    


