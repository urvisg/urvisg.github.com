(function() {
    'use strict';

    const buttons = document.querySelectorAll('button');
    const reel = document.querySelector('#reel');
    let myData, data;
    
    
    async function getData(){
        myData = await fetch("data/data.json");
        data = await myData.json();
    }

    for(let i=0;i < buttons.length;i++){
        buttons[i].addEventListener('click', function(event){
            event.preventDefault();
            reel.style.animation = 'none';
            reel.offsetWidth;
            reel.style.animation = 'moveY 4.95s linear infinite';
            const time = setTimeout(animationStop, (158 * data[buttons[i].id]));
        });
    }

    function animationStop(){
        reel.style.animationPlayState = 'paused';
    }

    getData();
})();