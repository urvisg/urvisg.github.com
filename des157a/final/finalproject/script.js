(function(){
    'use strict';
    console.log('reading js');

    const play = document.getElementById('play');
    const right = document.getElementById('right');
    const cards = document.getElementById('cards');
    let card = document.getElementsByClassName('card');
    let front = document.getElementsByClassName('front');
    let back = document.getElementsByClassName('back');

    //score bar
    const bar = document.getElementById('bar');
    const score = document.getElementById('score');
    const timer = document.getElementById('timer');
    const hints = document.getElementById('hints');
    let clicks = 0;
    let time = 60;

    //card match variables
    let matches = ['Rancho','rancho.png','Bella','bella.png','Bruno','bruno.png','Levi','levi.png','Arlo','arlo.png','Ash','ash.png']
    const rows = document.getElementsByClassName('row');
    let matches1 = [];
    let matches2 = [];
    let matches3 = [];
    let matchnum = 0;

    //flipped card variables
    let flipped = 0;
    let flippedCards = [];
    let check;

    //audio files
    const flip = new Audio('media/flip.mp4');
    const bark = new Audio('media/bark.mp4');
    const correct = new Audio('media/correct.mp3');
    const wrong = new Audio('media/wrong.mp3');


    //click to start
    play.addEventListener('click',function(){
        play.innerHTML = "Want to Quit?";
        play.style.backgroundColor = "#E5E5E5";
        cards.innerHTML = "";

        //setting up and shuffling the cards
        shuffleArray(matches);
        splitArray(matches);
        for(let i=0;i<3;i++){
            cards.innerHTML += "<div class='row'></div>";
        }
        setUpCards();

        //styling and displaying score/timer bar
        score.innerHTML = `<p><b>Failed Matches: ${clicks}</b></p>`;
        timer.innerHTML = "<p>1:00</p>";

        right.style.margin = "0";
        document.getElementById('control').style.display = "flex";
        //bar
        bar.style.margin = "30px 100px 30px 100px";
        bar.style.backgroundColor = "#E5E5E5";
        bar.style.borderRadius = "10px";
        //score
        score.style.textAlign = "left";
        score.querySelector('p').style.marginLeft = "15px";
        score.querySelector('p').style.padding = "10px";
        score.querySelector('p').style.color = "white";
        score.querySelector('p').style.backgroundColor = "#828282";
        score.querySelector('p').style.borderRadius = "5px";
        //timer
        timer.style.fontWeight = "700";
        timer.style.color = "red";
        timer.style.marginRight = "15px";
        timer.querySelector('p').style.padding = "10px";
        timer.querySelector('p').style.backgroundColor = "black";
        timer.querySelector('p').style.borderRadius = "5px";
        //hints
        hints.innerHTML = "<p>?</p>";
        hints.style.marginLeft = '15px';
        hints.querySelector('p').style.backgroundColor = "#FFE600";
        hints.querySelector('p').style.borderRadius = "5px";
        hints.style.color = "black";
        hints.querySelector('p').style.padding = "10px 20px 10px 20px";
        hints.querySelector('p').style.border = "solid black 2px";
        hints.addEventListener('mouseover',function(){
            hints.querySelector('p').style.backgroundColor = "#FFF48C";
            hints.style.cursor = "pointer";
        });
        hints.addEventListener('mouseout',function(){
            hints.querySelector('p').style.backgroundColor = "#FFE600";
            hints.style.cursor = "arrow";
        });
        //clicking hints
        hints.addEventListener('click',function(){
            useHint();
        });
        displayBar();

        //changing cursor when over a card
        for(let i=0;i<card.length;i++){
            card[i].addEventListener('mouseover',function(){
                card[i].style.cursor = "pointer";
            });
            flipCard(i);
        }


        //quit button styling
        play.addEventListener('mouseover',function(){
            play.style.backgroundColor = "#828282";
            play.style.color = "white";
        });

        play.addEventListener('mouseout',function(){
            play.style.backgroundColor = "#E5E5E5";
            play.style.color = "black";
        });

        //reload if want to quit game
        play.addEventListener('click',function(){
            location.reload();
        });
    });

    //shuffle array to randomize cards
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
    }

    //split array into 3 rows to display
    function splitArray(array){
        for(let i=0;i<matches.length;i++){
            if(i<4){
                matches1.push(array[i]);
            }else if(i<8){
                matches2.push(array[i]);
            }else{
                matches3.push(array[i]);
            }
        }
    }

    //set up card system
    function setUpCards(){
        //make divs for each card
        for(let i = 0;i<rows.length;i++){
            for(let j = 0;j < 4;j++){
                if(i==0){
                    if(matches1[j].includes('.png')){
                        rows[i].innerHTML += `<div class='card'> <img class='back' src='images/${matches1[j]}'> <img class='front' src='images/cardtop.png' alt='cardtop'></div>`;
                    }else{
                        rows[i].innerHTML += `<div class='card'> <p class='back'>${matches1[j]}</p> <img class='front' src='images/cardtop.png' alt='cardtop'></div>`;
                    }
                }
                else if(i==1){
                    if(matches2[j].includes('.png')){
                        rows[i].innerHTML += `<div class='card'> <img class='back' src='images/${matches2[j]}'> <img class='front' src='images/cardtop.png' alt='cardtop'></div>`;
                    }else{
                        rows[i].innerHTML += `<div class='card'> <p class='back'>${matches2[j]}</p> <img class='front' src='images/cardtop.png' alt='cardtop'></div>`;
                    }
                }
                else{
                    if(matches3[j].includes('.png')){
                        rows[i].innerHTML += `<div class='card'> <img class='back' src='images/${matches3[j]}'> <img class='front' src='images/cardtop.png' alt='cardtop'></div>`;
                    }else{
                        rows[i].innerHTML += `<div class='card'> <p class='back'>${matches3[j]}</p> <img class='front' src='images/cardtop.png' alt='cardtop'></div>`;
                    }
                }
            }
        }

        //styling rows for display
        rows[0].style.display = "flex";
        rows[0].style.justifyContent = "center";
        rows[1].style.display = "flex";
        rows[1].style.justifyContent = "center";
        rows[2].style.display = "flex";
        rows[2].style.justifyContent = "center";

        //styling cards
        for(let i=0;i<card.length;i++){
            card[i].style.width = "142px";
            card[i].style.height = "170px";
            card[i].style.margin = "15px";
            card[i].style.position = "relative";
            card[i].style.backgroundColor = "#FFF48C";
            card[i].style.borderRadius = "10px";
        }

        //styling front and back faces of the cards
        for(let i=0;i<front.length;i++){
            front[i].style.margin = "0";
            back[i].style.margin = "0";
            front[i].style.position = "absolute";
            back[i].style.position = "absolute";
            front[i].style.top = "50%";
            front[i].style.left = "50%";
            front[i].style.transform = "translate(-50%, -50%)";
            if(back[i].tagName == 'P'){
                back[i].style.textAlign = "center";
                back[i].style.top = "65px";
                back[i].style.left = "45px";
                back[i].style.transform = "translate(-50%, -50%)";
            }else{
                back[i].style.top = "40px";
                back[i].style.left = "20px";
                back[i].style.transform = "translate(-50%, -50%)";
            }
            back[i].style.visibility = "hidden";
        }
    }

    //function to flip cards
    function flipCard(i){
        //when card is clicked
        card[i].addEventListener('click',function(){
            //if less than 2 cards are flipped, then flip open
            if(flipped < 2){
                flip.play();
                card[i].style.animation = "flip 500ms forwards";
                card[i].style.animationIterationCount = "1";
                flipped += 1;
                flippedCards.push(i);
                let change = setTimeout(function(){
                    front[i].style.visibility = "hidden";
                    back[i].style.visibility = "visible";
                    back[i].style.transform = "scale(-1, 1)";
                },250);
            }
            //if 2 cards are flipped and no match, flip them back else keep flipped
            if(flipped == 2){
                flipped = 0;
                check = checkCards(flippedCards);
                clicks += 1;
                if(check == false){
                    let delay = setTimeout(function(){
                        wrong.play();
                        for(let c = 0;c < flippedCards.length;c++){
                            if(c > 1){
                                break;
                            }
                            let index = flippedCards.length - 1;
                            card[flippedCards[index - c]].style.animation = "flipBack 500ms forwards";
                            card[flippedCards[index - c]].style.animationIterationCount = "1";
                            let change = setTimeout(function(){
                                front[flippedCards[index - c]].style.visibility = "visible";
                                back[flippedCards[index - c]].style.visibility = "hidden";
                            },250);
                        }
                    },1200);
                }else{
                    let scorrect = setTimeout(function(){
                        correct.play();
                    },650);
                }
            }
        });
    }

    //check if the two cards flipped are a match
    function checkCards(flippedCards){
        let flip1 = back[flippedCards[flippedCards.length - 1]];
        let flip2 = back[flippedCards[flippedCards.length - 2]];
        let card1,card2;
        if(flip1.tagName == 'IMG' && flip2.tagName == 'P'){
            card1 = flip1.getAttribute('src').slice(7);
            card1 = card1.slice(0,-4);
            card2 = flip2.textContent.toLowerCase();
            if(card1 == card2){
                matchnum++;
                return true;
            }else{
                return false;
            }
        }else if(flip2.tagName == 'IMG' && flip1.tagName == 'P'){
            card1 = flip2.getAttribute('src').slice(7);
            card1 = card1.slice(0,-4);
            card2 = flip1.textContent.toLowerCase();
            if(card1 == card2){
                matchnum++;
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    //display the top bar with score and timer
    function displayBar(){
        right.style.margin = "0";
        bar.style.margin = "30px 100px 30px 100px";
        bar.style.backgroundColor = "#E5E5E5";
        bar.style.borderRadius = "10px";

        let game = setInterval(function(){
            score.innerHTML = `<p><b>Failed Matches: ${clicks}</b></p>`;
            time --;

            //display time or shift to end screen if times is up
            if(time == -1){
                clearInterval(game);
                endGame();
            }else if(matchnum == 6){
                clearInterval(game);
                endGame();
            }else if(time < 10){
                timer.innerHTML = `<p>0:0${time}</p>`;
            }else{
                timer.innerHTML = `<p>0:${time}</p>`;
            }

            score.innerHTML = `<p><b>Failed Matches: ${clicks}</b></p>`;
            score.style.textAlign = "left";
            score.querySelector('p').style.marginLeft = "15px";
            score.querySelector('p').style.padding = "10px";
            score.querySelector('p').style.color = "white";
            score.querySelector('p').style.backgroundColor = "#828282";
            score.querySelector('p').style.borderRadius = "5px";

            timer.style.fontWeight = "700";
            timer.style.color = "red";
            timer.style.marginRight = "15px";
            timer.querySelector('p').style.padding = "10px";
            timer.querySelector('p').style.backgroundColor = "black";
            timer.querySelector('p').style.borderRadius = "5px";
        },1000);
    }

    //display end screen if time is up with custom message and reward based on performance
    function endGame(){
        bark.play();
        left.style.width = "33%";
        let delay = setTimeout(function(){
            right.innerHTML = "";
            play.innerHTML = "Play Again";
            play.style.backgroundColor = "#FFE600";
            play.addEventListener('click',function(){
                location.reload();
            });

            //button hover states
            play.addEventListener('mouseover',function(){
                play.style.backgroundColor = "#FFF48C";
                play.style.color = "black";
            });
            play.addEventListener('mouseout',function(){
                play.style.backgroundColor = "#FFE60";
                play.style.color = "black";
            });

            //end screen text and image display based on if all matches found or not
            if(matchnum != 6){
                //no matches and times up
                right.innerHTML = `<p>You did not get all the matches! :( <br>Number of failed matches: <b>${clicks}</b></p>`;
                right.style.backgroundColor = "#FFF48C";
                right.querySelector('b').style.color = "red";
                right.innerHTML += "<img src='images/loser.jpg' alt='rancho sad' width=400 height=400>";
            }else{
                //found all matches
                right.innerHTML = `<p>Good job! You got all the matches! :) <br>Number of failed matches: <b>${clicks}</b></p>`;
                right.style.backgroundColor = "#9eac9c";
                right.innerHTML += "<img src='images/winner.jpg' alt='rancho happy'>";
            }
            
            right.querySelector('img').style.borderRadius = "10px";
            right.querySelector('p').style.fontSize = "36px";
            right.querySelector('p').style.marginBottom = "100px";
            right.style.padding = "50px 50px 50px 50px";
        },1000);
    }

    //provides hints when '?' button is clicked
    //hardcoded to only flip the 'Rancho' pair due to time constraints
    function useHint(){
        for(let i=0;i<card.length;i++){
            if(back[i].tagName == 'IMG'){
                if(back[i].getAttribute('src').slice(7).slice(0,-4) == 'rancho'){
                    card[i].style.animation = "flip 500ms forwards";
                    card[i].style.animationIterationCount = "1";
                    let change = setTimeout(function(){
                        front[i].style.visibility = "hidden";
                        back[i].style.visibility = "visible";
                        back[i].style.transform = "scale(-1, 1)";
                    },250);
                }
            }else{
                if(back[i].textContent.toLowerCase() == 'rancho'){
                    card[i].style.animation = "flip 500ms forwards";
                    card[i].style.animationIterationCount = "1";
                    let change = setTimeout(function(){
                        front[i].style.visibility = "hidden";
                        back[i].style.visibility = "visible";
                        back[i].style.transform = "scale(-1, 1)";
                    },250);
                }
            }
        }
        matchnum++;
    }
}());