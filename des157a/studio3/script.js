(function(){
    'use strict';
    console.log('reading js');

    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const display = document.getElementById('display');
    const score = document.getElementById('score');
    const game = document.getElementById('game');
    const actionArea = document.getElementById('actions');
    let para = document.querySelectorAll('p');
    const inner1 = document.getElementById('gameinner1');
    const inner2 = document.getElementById('gameinner2');
    const inner3 = document.getElementById('gameinner3');

    var gameData = {
        dice: ['images/1die.jpg','images/2die.jpg','images/3die.jpg','images/4die.jpg','images/5die.jpg','images/6die.jpg'],
        players: ['player 1','player 2'],
        score: [0,0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener('click', function(){
        para[0].innerHTML = "";
        para[1].innerHTML = "";

        //randomly setting game index
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);

        //add in dog visuals
        // display.innerHTML += '<img id="bar" src="images/bar.png"> <img id="bar" src="images/bar.png">';
        score.innerHTML += '<section id="rancho"> <h3>Rancho</h3> <img id="dogs" src="images/rancho.png"><h4></h4></section>';
        score.innerHTML += '<section id="bella"> <h3>Bella</h3> <img id="dogs" src="images/bella.png"><h4></h4></section>';
        document.querySelectorAll('h4')[0].innerHTML = `${gameData.score[0]}`;
        document.querySelectorAll('h4')[1].innerHTML = `${gameData.score[1]}`;
        // document.getElementById('bar').style.padding = "0 0 50px 0";

        //add event listener for new button
        gameControl.innerHTML = '<h2>The Game Has Started</h2>';
        gameControl.innerHTML = '<button id="quit">Wanna Quit?</button>';

        document.getElementById('quit').addEventListener('click',function(){
            location.reload();
        });

        setUpTurn();
    });

    function setUpTurn(){
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        document.getElementById('roll').addEventListener('click',function(){
            throwDice();
        })
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}"> <img src="${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //if two 1s are rolled...
        if(gameData.rollSum == 2){
            game.innerHTML += '<p>Oh snap! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
        }

        //if either die is a 1...
        else if(gameData.roll1 == 1 || gameData.roll2 == 1){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of you rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }

        //if neither die is a 1...
        else{
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = `<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>`;
            document.getElementById('rollagain').addEventListener('click',function(){
                setUpTurn();
            });
            document.getElementById('pass').addEventListener('click',function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
        }
        checkWinningCondition();
    }

    function checkWinningCondition(){
        if(gameData.score[gameData.index] > gameData.gameEnd){
            // score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;

            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game?";
        }
        else{
            showCurrentScore();
        }
    }

    function showCurrentScore(){
        // score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]} ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} ${gameData.score[1]}</strong></p>`;
        document.querySelectorAll('h4')[0].innerHTML = `${gameData.score[0]}`;
        document.querySelectorAll('h4')[1].innerHTML = `${gameData.score[1]}`;
    }
}());