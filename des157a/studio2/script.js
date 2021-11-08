(function(){
    'use strict';
    console.log('reading js')

    document.addEventListener('mousemove',reportPos);
    const theImg = document.querySelector('.closet img');
    let prevXLoc = 0;
    let prevYLoc = 0;

    function reportPos(event){
        const windowSize = window.innerWidth;
        const percent2px = windowSize / 5;
        const xPos = event.clientX;
        const changePhoto = Math.floor(xPos / percent2px);
        let text = document.querySelector('p');

        const windowHeight = window.innerHeight;
        const heightDegree = windowHeight / 3;
        const yPos = event.clientY;
        const changeRotation = Math.floor(yPos / heightDegree);

        // Changing the images based on x coordinates
        if(changePhoto !== prevXLoc){
            theImg.src = `images/img${changePhoto + 1}.png`;
            prevXLoc = changePhoto;
        }

        // Text alongside image changes as photo changes
        if(changePhoto + 1 == 1){
            text.innerHTML = "<b>Day:</b> Monday <br> <b>Date:</b> October 10, 2019 <br> <b>Note:</b> I didn't like this shirt at first but it ended up becoming one of my favorite shirts. I would wear a thermal shirt underneath so that I could wear it in that transition weather between summer and fall.";
        }
        else if(changePhoto + 1 == 2){
            text.innerHTML = "<b>Day:</b> Tuesday <br> <b>Date:</b> November 1, 2019 <br> <b>Note:</b> This shirt is so comfy. Fun fact, I bought it from Forver 21 but the stitches came out so I waited a year to get it fixed in India for really cheap instead of getting it fixed here. Great long term investment.";
        }
        else if(changePhoto + 1 == 3){
            text.innerHTML = "<b>Day:</b> Wednesday <br> <b>Date:</b> October 30, 2019 <br> <b>Note:</b> I have no idea why I took a class that starts at 9 pm but I did. Never felt like dressing up nice. It was too cold and I was too tired for that.";
        }
        else if(changePhoto + 1 == 4){
            text.innerHTML = "<b>Day:</b> Thursday <br> <b>Date:</b> December 6, 2019 <br> <b>Note:</b> I like dressing up nice for tests. I swear it helps me feel more prepared and do better. You will never see me wear sweatpants out of the house";
        }
        else if(changePhoto + 1 == 5){
            text.innerHTML = "<b>Day:</b> Friday <br> <b>Date:</b> January 6, 2020 <br> <b>Note:</b> I bought this jacket and earrings during winter break. I decided to wear them on my first day of classes. I remember that I had ECS 32A that day and I was feeling nervous.";
        }

        // Changing the angle of the image based on the y coordinates
        if(yPos < heightDegree){
            theImg.style.transform = 'rotate(-3deg)';
        }
        else if(yPos < heightDegree * 2){
            theImg.style.transform = 'rotate(0deg)';
        }
        else if(yPos > heightDegree * 2){
            theImg.style.transform = 'rotate(3deg)';
        }
    }
}());