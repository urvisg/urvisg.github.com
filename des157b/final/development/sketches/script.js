(function(){
    'use strict';

    const img1 = document.querySelectorAll('img')[0];
    const img2 = document.querySelectorAll('img')[1];
    const section = document.querySelector('section');
    const article = document.querySelector('article');

    img1.addEventListener('click', function(){
        section.innerHTML = '<img id="overlay" src="images/thumbnails.png" width=1000>';
        section.style.top = '50%';
        section.style.left = '50%';
        article.style.filter = 'blur(10px)';
        let overlay = document.querySelector('#overlay');

        overlay.addEventListener('click', function(){
            overlay.style.display = 'none';
            article.style.filter = 'none';
        });
    });

    img2.addEventListener('click', function(){
        section.innerHTML = '<img id="overlay" src="images/sketches.png" width=1000>';
        section.style.top = '50%';
        section.style.left = '50%';
        article.style.filter = 'blur(10px)';
        let overlay = document.querySelector('#overlay');

        overlay.addEventListener('click', function(){
            overlay.style.display = 'none';
            article.style.filter = 'none';
        });
    });
})();