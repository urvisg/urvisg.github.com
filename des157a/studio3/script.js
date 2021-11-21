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
    let arrows = document.getElementById('arrows');

    const bark = new Audio('media/bark.mp4');
    // let instructions = document.getElementById('instructions');

    var gameData = {
        dice: ['images/1die.png','images/2die.png','images/3die.png','images/4die.png','images/5die.png','images/6die.png'],
        players: ['Rancho','Bella'],
        score: [0,0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener('click', function(){
        para[0].innerHTML = "";
        para[0].style.margin = '0';
        para[1].innerHTML = "";
        para[1].style.margin = '0';

        actionArea.style.padding = '0';

        //randomly setting game index
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);
        gameData.player = gameData.index;
        console.log("Player: "+gameData.player);


        //add in dog visuals
        // display.innerHTML += '<img id="bar" src="images/bar.png"> <img id="bar" src="images/bar.png">';
        score.innerHTML += '<section id="rancho"> <h3>Rancho</h3> <img id="dogs" src="images/rancho.png"><h4></h4><div id="actions1"></div></section>';
        score.innerHTML += '<section id="dice"></section>';
        score.innerHTML += '<section id="bella"> <h3>Bella</h3> <img id="dogs" src="images/bella.png"><h4></h4><div id="actions2"></div></section>';
        document.querySelectorAll('h4')[0].innerHTML = `${gameData.score[0]}`;
        document.querySelectorAll('h4')[1].innerHTML = `${gameData.score[1]}`;
        // document.getElementById('bar').style.padding = "0 0 50px 0";
        console.log("index "+gameData.index);

        //add event listener for new button
        // gameControl.innerHTML = '<h2>The Game Has Started</h2>';
        gameControl.innerHTML = "";
        document.getElementById('qbuttons').innerHTML = '<button id="quit">Wanna Quit?</button>';
        document.getElementById('qbuttons').querySelector('button').style.backgroundColor = 'grey';
        document.getElementById('qbuttons').querySelector('button').style.color = 'black';

        document.getElementById('qbuttons').querySelector('button').addEventListener('mouseover',function(){
            document.getElementById('qbuttons').querySelector('button').style.backgroundColor = 'lightgrey';
        });

        document.getElementById('qbuttons').querySelector('button').addEventListener('mouseout',function(){
            document.getElementById('qbuttons').querySelector('button').style.backgroundColor = 'grey';
        });

        document.getElementById('quit').addEventListener('click',function(){
            location.reload();
        });

        setUpTurn();
    });

    function setUpTurn(){
        // game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        // actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        console.log(gameData.index);
        if(gameData.index == 0){
            console.log("in");
            document.getElementById("actions1").innerHTML = '<button id="roll">Roll the Dice</button>';
            document.getElementById("arrows").innerHTML = '<img src="images/arrowright.png" alt="arrow">';
            document.getElementById("arrows").style.left = "50px";
        }
        else if(gameData.index == 1){
            console.log("in");
            document.getElementById("actions2").innerHTML = '<button id="roll">Roll the Dice</button>';
            document.getElementById("arrows").innerHTML = '<img src="images/arrowleft.png" alt="arrow">';
            document.getElementById("arrows").style.left = "1170px";
        }
        document.getElementById('roll').addEventListener('click',function(){
            throwDice();
        })
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        // game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        document.getElementById('dice').innerHTML = `<img src="${gameData.dice[gameData.roll1-1]}"> <img src="${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //if two 1s are rolled...
        if(gameData.rollSum == 2){
            document.getElementById('dice').innerHTML += '<p>Oh snap! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            if(gameData.index == 1){
                document.getElementById("actions1").innerHTML = "";
            }
            else if(gameData.index == 0){
                document.getElementById("actions2").innerHTML = "";
            }
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
        }

        //if either die is a 1...
        else if(gameData.roll1 == 1 || gameData.roll2 == 1){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            if(gameData.index == 1){
                document.getElementById("actions1").innerHTML = "";
            }
            else if(gameData.index == 0){
                document.getElementById("actions2").innerHTML = "";
            }
            document.getElementById('dice').innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }

        //if neither die is a 1...
        else{
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            // actionArea.innerHTML = `<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>`;
            if(gameData.index == 0){
                document.getElementById("actions1").innerHTML = `<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>`;
            }
            else if(gameData.index == 1){
                document.getElementById("actions2").innerHTML = `<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>`;
            }
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
            if(gameData.index == gameData.player){
                score.innerHTML = `<p>You helped ${gameData.players[gameData.player]} win the race!</p>`;
                console.log(gameData.score[gameData.index]);
                if(gameData.player == 0){
                    score.innerHTML += '<img src="images/rancho.png" alt="rancho">';
                }else{
                    score.innerHTML += '<img src="images/bella.png" alt="bella">';
                }
                bark.play();
            }else{
                score.innerHTML = `<p>Oh no! You and ${gameData.players[gameData.player]} lost the race!</p>`;
                console.log(gameData.score[gameData.index]);
                if(gameData.player == 0){
                    score.innerHTML += '<img src="images/rancho.png" alt="rancho">';
                }else{
                    score.innerHTML += '<img src="images/bella.png" alt="bella">';
                }
            }
            
            document.getElementById('arrows').innerHTML = "";
            //score.innerHTML = `<p>${gameData.players[gameData.index]} wins the game!</p>`;
            score.querySelector('p').style.fontSize = "36px";
            score.style.display = 'block';
            // if(gameData.index == 0){
            //     score.innerHTML += '<img src="images/rancho.png" alt="rancho">';
            // }else{
            //     score.innerHTML += '<img src="images/bella.png" alt="rancho">';
            // }

            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game?";
            document.getElementById('quit').style.backgroundColor = "red";
            document.getElementById('quit').style.color = "white";
            document.getElementById('quit').style.marginBottom = '150px';
            document.getElementById('quit').addEventListener('mouseover',function(){
                document.getElementById('quit').style.backgroundColor = "#800000";
            })
            document.getElementById('quit').addEventListener('mouseout',function(){
                document.getElementById('quit').style.backgroundColor = "red";
            })
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