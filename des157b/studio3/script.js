(function(){
    'use strict';

    let textWrapper = document.querySelector('.text .letters');
    let letters = document.querySelector(".letters");

    let body = document.querySelector("body");
    let mainpg = document.querySelector("#mainpg");
    let img = document.querySelectorAll("img");
    let overlay = document.querySelector("#overlay");
    let htext = document.querySelector("#htext");

    // animations controls
    function animateLetters(){
        anime.timeline({ loop: false })
            .add({
                targets: '.text .letter',
                scale: [0, 1],
                duration: 1500,
                elasticity: 600,
                delay: (el, i) => 45 * (i + 1)
            }).add({
                targets: '.text',
                duration: 2000,
                easing: "easeOutExpo",
                delay: 1000
            });
    }

    const start = setTimeout(function(){
        letters.textContent = "urvi ganorkar";
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        animateLetters();
    }, 1000);


    const time = setTimeout(function(){
        textWrapper.innerHTML = '<span>i make a lot of things</span>';
        textWrapper.style.fontWeight = '500';
        textWrapper.style.fontSize = '30px';
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        animateLetters();
    },4000);

    const fade = setTimeout(function(){
        textWrapper.style.opacity = "0";
        body.querySelector("#animation").remove();
        body.style.backgroundColor = "#F6FAFF";
    }, 7500);

    // masonry settings
    let elem = document.querySelector('.grid');
    let msnry = new Masonry( elem, {
      itemSelector: '.grid-item',
      gutter: 30,
    });

    imagesLoaded( elem ).on( 'progress', function() {
      msnry.layout();
    });

    // interactions
    for(let i=0;i < img.length;i++){
        // hover interactions
        img[i].addEventListener('mouseover', function(){
            htext.className = "showing";
            if(img[i].alt == "henna"){
            htext.innerHTML = '<p>Henna Designs</p>';
            htext.style.top = "95px";
            htext.style.left = "55px";
            }else if(img[i].alt == "nail art"){
                htext.innerHTML = '<p>Nail Art</p>';
                htext.style.top = "150px";
                htext.style.left = "420px";
            }else if(img[i].alt == "shapes"){
                htext.innerHTML = '<p>Shading</p>';
                htext.style.top = "150px";
                htext.style.left = "730px";
            }else if(img[i].alt == "pop art"){
                htext.innerHTML = '<p>Pop Art</p>';
                htext.style.top = "465px";
                htext.style.left = "85px";
            }else if(img[i].alt == "painting"){
                htext.innerHTML = '<p>Painting</p>';
                htext.style.top = "465px";
                htext.style.left = "730px";
            }else if(img[i].alt == "clay art"){
                htext.innerHTML = '<p>Polymer Clay Art</p>';
                htext.style.top = "475px";
                htext.style.left = "360px";
            }
        });

        img[i].addEventListener('mouseout', function(){
            htext.className = "hidden";
        });

        img[i].addEventListener('click', function(){
            // clicking interactions
            if(img[i].alt == "henna"){
                overlay.innerHTML = "<img src='images/f1.jpg' alt='henna'>";
                mainpg.style.filter = "blur(10px)";
            }else if(img[i].alt == "nail art"){
                overlay.innerHTML = "<img src='images/f3.jpg' alt='nail art'>";
                mainpg.style.filter = "blur(10px)";
            }else if(img[i].alt == "shapes"){
                overlay.innerHTML = "<img src='images/f5.jpg' alt='shapes'>";
                mainpg.style.filter = "blur(10px)";
            }else if(img[i].alt == "pop art"){
                overlay.innerHTML = "<img src='images/f2.jpg' alt='pop art'>";
                mainpg.style.filter = "blur(10px)";
            }else if(img[i].alt == "painting"){
                overlay.innerHTML = "<img src='images/f6.jpg' alt='painting'>";
                mainpg.style.filter = "blur(10px)";
            }else if(img[i].alt == "clay art"){
                overlay.innerHTML = "<img src='images/f4.jpg' alt='clay art'>";
                mainpg.style.filter = "blur(10px)";
            }
            overlay.className = "showing";

            overlay.addEventListener('click', function(){
                overlay.className = "hidden";
                mainpg.style.filter = "none";
            });
        });
    }
})();

