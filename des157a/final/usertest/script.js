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


    //click to start
    play.addEventListener('click',function(){
        play.innerHTML = "Want to Quit?";
        play.style.backgroundColor = "#E5E5E5";
        cards.innerHTML = "";

        //setting up and shuffling the cards
        shuffleArray(matches);
        splitArray(matches);
        for(let i=0;i<3;i++){
            cards.innerHTML += "<div class='row'></div>"
        }
        setUpCards();

        displayBar();

        for(let i=0;i<card.length;i++){
            flipCard(i);
        }

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
                        rows[i].innerHTML += `<div class='card'> <img class='back' src='images/${matches1[j]}'> <p class='front'>?</p></div>`;
                    }else{
                        rows[i].innerHTML += `<div class='card'> <p class='back'>${matches1[j]}</p> <p class='front'>?</p></div>`;
                    }
                }
                else if(i==1){
                    if(matches2[j].includes('.png')){
                        rows[i].innerHTML += `<div class='card'> <img class='back' src='images/${matches2[j]}'> <p class='front'>?</p></div>`;
                    }else{
                        rows[i].innerHTML += `<div class='card'> <p class='back'>${matches2[j]}</p> <p class='front'>?</p></div>`;
                    }
                }
                else{
                    if(matches3[j].includes('.png')){
                        rows[i].innerHTML += `<div class='card'> <img class='back' src='images/${matches3[j]}'> <p class='front'>?</p></div>`;
                    }else{
                        rows[i].innerHTML += `<div class='card'> <p class='back'>${matches3[j]}</p> <p class='front'>?</p></div>`;
                    }
                }
            }
        }

        rows[0].style.display = 'flex';
        rows[0].style.justifyContent = 'center';
        rows[1].style.display = 'flex';
        rows[1].style.justifyContent = 'center';
        rows[2].style.display = 'flex';
        rows[2].style.justifyContent = 'center';

        for(let i=0;i<card.length;i++){
            card[i].style.width = '142px';
            card[i].style.height = '170px';
            card[i].style.margin = '15px';
            card[i].style.position = 'relative';
            card[i].style.backgroundColor = '#FFF48C';
            card[i].style.borderRadius = '10px';
        }

        for(let i=0;i<front.length;i++){
            front[i].style.margin = '0';
            back[i].style.margin = '0';
            front[i].style.position = 'absolute';
            back[i].style.position = 'absolute';
            back[i].style.visibility = 'hidden';
        }
    }

    function flipCard(i){
        //when card is clicked
        card[i].addEventListener('click',function(){
            //if less than 2 cards are flipped, then flip open
            if(flipped < 2){
                card[i].style.animation = 'flip 500ms forwards';
                card[i].style.animationIterationCount = '1';
                flipped += 1;
                flippedCards.push(i);
                let change = setTimeout(function(){
                    front[i].style.visibility = 'hidden';
                    back[i].style.visibility = 'visible';
                    back[i].style.transform = 'scale(-1, 1)';
                },250);
            }
            //if 2 cards are flipped and no match, flip them back else keep flipped
            if(flipped == 2){
                flipped = 0;
                check = checkCards(flippedCards);
                clicks += 1;
                console.log(clicks);
                if(check == false){
                    let delay = setTimeout(function(){
                        for(let c = 0;c < flippedCards.length;c++){
                            if(c > 1){
                                break;
                            }
                            let index = flippedCards.length - 1;
                            card[flippedCards[index - c]].style.animation = 'flipBack 500ms forwards';
                            card[flippedCards[index - c]].style.animationIterationCount = '1';
                            let change = setTimeout(function(){
                                front[flippedCards[index - c]].style.visibility = 'visible';
                                back[flippedCards[index - c]].style.visibility = 'hidden';
                            },250);

                        }
                    },1200);
                }
            }
        });
    }

    //check if the two cards flipped are a match
    function checkCards(flippedCards){
        console.log(flippedCards);
        let flip1 = back[flippedCards[flippedCards.length - 1]];
        let flip2 = back[flippedCards[flippedCards.length - 2]];
        let card1,card2;
        if(flip1.tagName == 'IMG' && flip2.tagName == 'P'){
            card1 = flip1.getAttribute('src').slice(7);
            card1 = card1.slice(0,-4);
            card2 = flip2.textContent.toLowerCase();
            if(card1 == card2){
                matchnum++;
                console.log("matchnum: "+matchnum);
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
                console.log("matchnum: "+matchnum);
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
        right.style.margin = '0';
        bar.style.margin = '30px 100px 30px 100px';
        bar.style.backgroundColor = '#E5E5E5';
        bar.style.borderRadius = '10px';

        let game = setInterval(function(){
            score.innerHTML = `<p><b>Failed Matches: ${clicks}</b></p>`;
            time --;
            console.log("time: "+time);

            //display time or shift to end screen if times is up
            if(time == -1){
                console.log("time: "+time);
                clearInterval(game);
                endGame();
            }else if(matchnum == 6){
                console.log("matchnum: "+matchnum);
                clearInterval(game);
                endGame();
            }else if(time < 10){
                timer.innerHTML = `<p>00:0${time}</p>`;
            }else{
                timer.innerHTML = `<p>00:${time}</p>`;
            }

            score.style.textAlign = 'left';
            score.innerHTML = `<p><b>Failed Matches: ${clicks}</b></p>`;
            score.querySelector('p').style.marginLeft = '15px';
            score.querySelector('p').style.padding = '10px';
            score.querySelector('p').style.color = 'white';
            score.querySelector('p').style.backgroundColor = '#828282';
            score.querySelector('p').style.borderRadius = '5px';

            timer.style.fontWeight = '700';
            timer.style.color = 'red';
            timer.style.marginRight = '15px';
            timer.querySelector('p').style.padding = '10px';
            timer.querySelector('p').style.backgroundColor = 'black';
            timer.querySelector('p').style.borderRadius = '5px';
        },1000);
    }

    //displa end screen if time is up with custom message and reward based on performance
    function endGame(){
        let delay = setTimeout(function(){
            right.innerHTML = "";
            play.innerHTML = "Play Again";
            play.style.backgroundColor = "#FFE600";
            play.addEventListener('click',function(){
                location.reload();
            })

            if(matchnum != 6){
                //no matches and times up
                right.innerHTML = `<p>You did not get all the matches! :( <br>Number of failed matches: <b>${clicks}</b></p>`;
            }else{
                //found all matches
                right.innerHTML = `<p>Good job! You got all the matches! :) <br>Number of failed matches: <b>${clicks}</b></p>`;
            }

            //display different reward photo based on number of failed matches
            if(6 <= clicks && clicks<= 10){
                console.log('clicks: '+clicks);
                right.innerHTML += "<img src='images/tier1.png' alt='rancho sleeping'>";
            }else if(11 <= clicks && clicks <= 15){
                console.log('clicks: '+clicks);
                right.innerHTML += "<img src='images/tier2.png' alt='sitting rancho'>";
            }else{
                console.log('clicks: '+clicks);
                right.innerHTML += "<img src='images/tier3.png' alt='fall rancho'>";
            }

            right.querySelector('img').style.borderRadius = '10px';
            right.querySelector('p').style.fontSize = '36px';
            right.querySelector('p').style.marginBottom = '180px';
            right.style.padding = '50px 50px 50px 50px';
        },1000);
    }
}());