(function(){
    'use strict';
    const myVideo = document.querySelector('video');
    const screen = document.querySelector('section');
    const divs = document.querySelectorAll('div');
    const loading = document.querySelector('.fa-spinner');

    const intervals = {
        start: [0,3,6,8,12],
        stop: [3,6,9,12,17],
        line: ['#text1', '#text2', '#text3', '#text4', '#text5']
    }

    const timing = setInterval(checkTime, 1000);

    function checkTime(){
        for(let i=0;i < divs.length;i++){
            if(intervals.start[i] < myVideo.currentTime && myVideo.currentTime < intervals.stop[i]){
                divs[i].className = "showing";
            }else{
                divs[i].className = "hidden";
            }
        }
    }

    myVideo.addEventListener('playing', function(){
        loading.style.display = 'none';
    });

    screen.addEventListener('mouseover', function(){
        document.querySelector('video').poster = "images/blackout.png";
        for(let i=0;i < divs.length;i++){
            divs[i].style.background = "black";
            divs[i].style.mixBlendMode = "multiply";
        }
    });

    screen.addEventListener('mouseout', function(){
        document.querySelector('video').poster = "images/oceanposter.png";
        for(let i=0;i < divs.length;i++){
            divs[i].style.background = "";
            divs[i].style.mixBlendMode = "";
        }
    });
})();