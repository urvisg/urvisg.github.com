(function(){
    'use strict';
    console.log('reading js');

    const play = document.getElementById('play');
    const right = document.getElementById('right');
    const cards = document.getElementById('cards');
    const bar = document.getElementById('bar');
    const score = document.getElementById('score');
    const timer = document.getElementById('timer');
    let matches = ['Rancho','Rancho','Bella','Bella','Bruno','Bruno','Daisy','Daisy','Mango','Mango','Coco','Coco'];

    //click to start
    play.addEventListener('click',function(){
        play.innerHTML = "Want to Quit?";
        play.style.backgroundColor = "#E5E5E5";
        cards.innerHTML = "";

        setUpCards();
        setUpScore();
    });

    //set up card system
    function setUpCards(){
        //make divs for each card
        for(let i = 0;i < 12;i++){
            cards.innerHTML += `<div id='card'><p id='front'>?</p> <p id='back'>${matches[i]}</p></div>`;
        }

        right.style.display = 'flex';
        right.style.marginTop = '100px';
        cards.style.display = 'flex';
        cards.style.flexWrap = 'wrap';
        cards.style.padding = '30px 70px 30px 90px';

        let card = document.querySelectorAll('div');
        for(let i=0;i<card.length;i++){
            console.log(i);
            card[i].style.width = '142px';
            card[i].style.height = '170px';
            card[i].style.margin = '15px';
            card[i].style.position = 'relative';
        }

        let inner = document.querySelectorAll('p');
        for(let i=0;i<inner.length;i++){
            inner[i].style.width = '100%';
            inner[i].style.width = '100%';
            inner[i].style.height = '100%';
            inner[i].style.height = '100%';
            inner[i].style.position = 'absolute';
            inner[i].style.position = 'absolute';
            inner[i].style.backgroundColor = '#FFF48C';
            inner[i].style.borderRadius = '10px';
        }
    }

    //set up score visual
    function setUpScore(){
        right.style.position = 'relative';
        bar.style.position = 'absolute';
    }
}());