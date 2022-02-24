(function(){
    'use strict';

    const submit = document.querySelector('#submit');
    const next = document.querySelector('#next');
    const explore = document.querySelector('#explore');

    const nav = document.querySelector('#navigation');
    const mappage = document.querySelector('#mappage');
    const submitpage = document.querySelector('#submitpage');
    const firstform = document.querySelector('#firstform');
    const secondform = document.querySelector('#secondform');
    const thankyou = document.querySelector('#thankyou');

    submit.addEventListener('click', function(){
        mappage.className = 'hidden';
        submitpage.className = 'showing';
    });

    next.addEventListener('click', function(){
        firstform.className = 'hidden';
        secondform.className = 'showing';
    });

    explore.addEventListener('click', function(){
        thankyou.className = 'hidden';
        mappage.className = 'showing';
    })
})();