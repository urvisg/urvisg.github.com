(function(){
    'use strict';

    let togcount = 0;
    const slider = document.querySelector('.slider.round');

    const story = document.querySelector('#story');
    const submit = document.querySelector('#submit');
    const next = document.querySelector('#next');
    const send = document.querySelector('#send');
    const explore = document.querySelector('#explore');

    const landingpage = document.querySelector('#landingpage');
    const nav = document.querySelector('#navigation');
    const mappage = document.querySelector('#mappage');
    const submitpage = document.querySelector('#submitpage');
    const firstform = document.querySelector('#firstform');
    const secondform = document.querySelector('#secondform');
    const thankyou = document.querySelector('#thankyou');

    story.addEventListener('click', function(){
        landingpage.className = 'hidden';
        mappage.className = 'showing';
        nav.className = 'showing';
    });

    submit.addEventListener('click', function(){
        mappage.className = 'hidden';
        submitpage.className = 'showing';
        firstform.className = 'showing';
        secondform.className = 'hidden';
    });

    next.addEventListener('click', function(){
        firstform.className = 'hidden';
        secondform.className = 'showing';
    });

    send.addEventListener('click', function(){
        submitpage.className = 'hidden';
        thankyou.className = 'showing';
    });

    explore.addEventListener('click', function(){
        thankyou.className = 'hidden';
        mappage.className = 'showing';
    });

    slider.addEventListener('click', function(){
        if(togcount == 0){
            togcount = 1;
            mappage.className = 'hidden';
        }
        
    })
})();