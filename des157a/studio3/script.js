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

    //Audio files
    const bark = new Audio('media/bark.mp4');
    const treats = new Audio('media/treatshake.mp3');
    const growl = new Audio('media/growl.mp3');


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
        gameData.player = gameData.index;


        //add in dog and score visuals
        score.innerHTML += '<section id="rancho"> <h3>Rancho</h3> <img id="dogs" src="images/rancho.png"><h4></h4><div id="actions1"></div></section>';
        score.innerHTML += '<section id="dice"></section>';
        score.innerHTML += '<section id="bella"> <h3>Bella</h3> <img id="dogs" src="images/bella.png"><h4></h4><div id="actions2"></div></section>';
        document.querySelectorAll('h4')[0].innerHTML = `${gameData.score[0]}`;
        document.querySelectorAll('h4')[1].innerHTML = `${gameData.score[1]}`;

        //add event listener for new button
        gameControl.innerHTML = "";
        document.getElementById('qbuttons').innerHTML = '<button id="quit">Wanna Quit?</button>';
        document.getElementById('qbuttons').querySelector('button').style.backgroundColor = 'grey';
        document.getElementById('qbuttons').querySelector('button').style.color = 'black';
        document.getElementById('qbuttons').style.bottom = '40px';

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
        //add arrows to signify player turn
        if(gameData.index == 0){
            document.getElementById('actions1').innerHTML = '<button id="roll">Roll the Dice</button>';
            document.getElementById('arrows').innerHTML = '<img src="images/arrowright.png" alt="arrow">';
            document.getElementById('arrows').style.left = "70px";
        }
        else if(gameData.index == 1){
            document.getElementById('actions2').innerHTML = '<button id="roll">Roll the Dice</button>';
            document.getElementById('arrows').innerHTML = '<img src="images/arrowleft.png" alt="arrow">';
            document.getElementById('arrows').style.left = "1170px";
        }
        document.getElementById('roll').addEventListener('click',function(){
            throwDice();
        })
    }

    function throwDice(){

        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        document.getElementById('dice').innerHTML = `<img src="${gameData.dice[gameData.roll1-1]}"> <img src="${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //if two 1s are rolled...
        if(gameData.rollSum == 2){
            document.getElementById('dice').innerHTML += '<p>Oh snap! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            if(gameData.index == 1){
                document.getElementById('actions1').innerHTML = "";
            }
            else if(gameData.index == 0){
                document.getElementById('actions2').innerHTML = "";
            }
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
        }

        //if either die is a 1...
        else if(gameData.roll1 == 1 || gameData.roll2 == 1){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            if(gameData.index == 1){
                document.getElementById('actions1').innerHTML = "";
            }
            else if(gameData.index == 0){
                document.getElementById('actions2').innerHTML = "";
            }
            document.getElementById('dice').innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }

        //if neither die is a 1...
        else{
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            if(gameData.index == 0){
                document.getElementById('actions1').innerHTML = `<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>`;
            }
            else if(gameData.index == 1){
                document.getElementById('actions2').innerHTML = `<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>`;
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
            //check if turn matches player and play audio accordingly to signify outcome
            if(gameData.index == gameData.player){
                score.innerHTML = `<p>You helped ${gameData.players[gameData.player]} win the race!</p>`;
                if(gameData.player == 0){
                    score.innerHTML += '<img src="images/rancho.png" alt="rancho">';
                }else{
                    score.innerHTML += '<img src="images/bella.png" alt="bella">';
                }
                bark.play();
            }else{
                score.innerHTML = `<p>Oh no! You and ${gameData.players[gameData.player]} lost the race!</p>`;
                if(gameData.player == 0){
                    score.innerHTML += '<img src="images/rancho.png" alt="rancho">';
                }else{
                    score.innerHTML += '<img src="images/bella.png" alt="bella">';
                }
                growl.play();
            }
            
            document.getElementById('arrows').innerHTML = "";
            score.querySelector('p').style.fontSize = "36px";
            score.style.display = 'block';

            actionArea.innerHTML = '';

            //Start a new game button invoke and styling
            document.getElementById('quit').innerHTML = 'Start a New Game?';
            document.getElementById('quit').style.backgroundColor = 'red';
            document.getElementById('quit').style.color = 'white';
            document.getElementById('quit').style.bottom = '0';
            document.getElementById('quit').style.marginBottom = '90px';
            document.getElementById('quit').addEventListener('mouseover',function(){
                document.getElementById('quit').style.backgroundColor = '#800000';
            })
            document.getElementById('quit').addEventListener('mouseout',function(){
                document.getElementById('quit').style.backgroundColor = 'red';
            })
        }
        else{
            //audio of treat shaking noise used as dice roll
            treats.play();

            showCurrentScore();
        }
    }

    function showCurrentScore(){
        document.querySelectorAll('h4')[0].innerHTML = `${gameData.score[0]}`;
        document.querySelectorAll('h4')[1].innerHTML = `${gameData.score[1]}`;
    }
}());