(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const h3s = document.querySelectorAll('h3');
    const tapes = document.querySelector('#tapes');
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            banner.innerHTML = '<img src="images/doodles.png" width=1100 height=250>';
            button.className = 'switch';
            tapes.innerHTML = '<img src="images/tape2.png"><img src="images/tape2.png"><img src="images/tape2.png"><img src="images/tape2.png">';
            for (const section of sections) {
                section.className = 'switch';
            }
            for(const h3 of h3s){
                h3.className = 'switch';
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            banner.innerHTML = '<img src="images/bubbles.png" width=1100 height=250>';
            button.removeAttribute('class');
            tapes.innerHTML = '<img src="images/tape.png"><img src="images/tape.png"><img src="images/tape.png"><img src="images/tape.png">';
            for (const section of sections) {
                section.removeAttribute('class');
            }
            for(const h3 of h3s){
                h3.removeAttribute('class');
            }
            mode = 'dark'
        }
    })
})()