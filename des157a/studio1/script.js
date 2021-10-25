(function() {
    'use strict';
    console.log('reading js');

    let myForm = document.querySelector('#myform');
    let madLib = document.querySelector('#madlib');


    myForm.addEventListener('submit', function(event) {
        console.log("start");
        event.preventDefault();
        let movieName = document.querySelector('#moviename').value;
        let food = document.querySelector('#food').value;
        let noise = document.querySelector('#noise').value;
        let verb = document.querySelector('#verb').value;
        let emotion1 = document.querySelector('#emotion1').value;
        let bodypart = document.querySelector('#bodypart').value;
        let emotion2 = document.querySelector('#emotion2').value;

        let myText;

        if (movieName && food && noise && verb && emotion1 && bodypart && emotion2) {
            document.querySelector(".admission").addEventListener('click', function(event){
                event.preventDefault();
                document.getElementById('overlay').className = 'showing';

                let movieprem;
                movieprem = document.querySelector('.movietitle');
                movieprem.innerHTML = `<span>${movieName}</span>`;

                let para;
                para = document.querySelector('p');
                para.innerHTML = `Sam and Jackie decided  to go see <span>${movieName}</span> in theaters on Friday night. When they got there, the theatre was empty except for the staff. After buying tickets, they bought popcorn and <span>${food}</span> from the concession stand. The movie theater was empty and completely dark. They chose seats in the center for the best view.<br>They sat in silence until suddenly they heard a <span>${noise}</span>! The screen turned on to display an abandoned house in a dark street. The lights in the theater began to flicker and speed up to reveal people staring at them through the screen. They <span>${verb}</span> in unison towards the screen. The exit sign turned red and burst into flames. A head popped in through the screen and their arms reached for the open air. Sam looked at Jackie in <span>${emotion1}</span> and shrieked. The popcorn went flying as they ran for the door. A <span>${bodypart}</span> reached up from behind them to touch their shoulders and they turned around. A pair of green eyes stared back at them.<br>Gasp! Sam woke up screaming and frantically turned around to see a room full of movie watchers. Jackie stared back with a <span>${emotion2}</span> filled face as credits played on the screen. “YOU FELL ASLEEP DURING THE MOVIE AGAIN!”.<br>THE END!`
            });
        
            document.querySelector(".playagain").addEventListener('click', function(event){
                event.preventDefault();
                document.getElementById('overlay').className = 'hidden';
                let formData = document.querySelectorAll("input[type=text]");
                for (let eachField of formData) {
                    console.log("in");
                    eachField.value = "";
                }
            });

            document.addEventListener('keydown', function(event){
                if(event.key == 'Escape'){
                    document.getElementById('overlay').className = "hidden";
                }
            });
        } else {
            myText = "*Please fill out all text fields*";
        }
        madLib.textContent = myText;
    });
}());