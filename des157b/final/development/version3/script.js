// Back4App
Parse.initialize("aCSvAxSmvzPT231gRq4kZVCP4ktz3MFCMeAg66g4","2LLLjoQbxAhiYTa28MRmMMEE4oWWCvUHY9VnqO6b"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/';

(function(){
    'use strict';
    const elink = document.querySelector('#elink');
    const link = document.querySelector('#links');
    const brand = document.querySelector('#brand');

    const slider = document.querySelector('.slider.round');
    const toggle = document.querySelector('#toggle');
    const tlabel = document.querySelector('#tlabel');
    const listContainer = document.querySelector(".grid");
    const griditems = document.querySelectorAll(".grid-item");

    const story = document.querySelector('#story');
    const submit = document.querySelector('#submit');
    const next = document.querySelector('#next');
    const send = document.querySelector('#send');
    const clear1 = document.querySelector('#firstform #clear');
    const clear2 = document.querySelector('#secondform #clear');
    const explore = document.querySelector('#explore');
    const display = document.querySelector('#mappage article');
    let x = document.querySelector('#mappage #x');

    let circles = [];

    const landingpage = document.querySelector('#landingpage');
    const nav = document.querySelector('#navigation');
    const main = document.querySelector('main');
    const mappage = document.querySelector('#mappage');
    const listpage = document.querySelector('#listpage');
    const submitpage = document.querySelector('#submitpage');
    const firstform = document.querySelector('#firstform');
    const secondform = document.querySelector('#secondform');
    const thankyou = document.querySelector('#thankyou');
    const resourcespage = document.querySelector('#resourcespage');

    let note = {
        'title': null,
        'name': null,
        'location': null,
        'age': null,
        'position': null,
        'response': null,
        'latitude': null,
        'longitude': null
    };

    // Move into main website
    story.addEventListener('click', function(){
        landingpage.className = 'hidden';
        mappage.className = 'showing';
        nav.className = 'showing';
        main.className = 'showing';
        elink.style.fontWeight = '600';
        // displayList();
    });

    // Move back to landing page
    brand.addEventListener('click', function(){
        landingpage.className = 'showing';
        mappage.className = 'hidden';
        listpage.className = 'hidden';
        main.className = 'hidden';
        resourcespage.className = 'hidden';
        thankyou.className = 'hidden';
        submitpage.className = 'hidden';
        firstform.className = 'hidden';
        secondform.className = 'hidden';
        elink.style.fontWeight = '400';
        link.style.fontWeight = '400';
        nav.className = 'hidden';
    })

    // Move to Submit Page
    submit.addEventListener('click', function(){
        mappage.className = 'hidden';
        thankyou.className = 'hidden';
        resourcespage.className = 'hidden';
        submitpage.className = 'showing';
        firstform.className = 'showing';
        secondform.className = 'hidden';
        main.className = 'hidden';
        elink.style.fontWeight = '400';
        link.style.fontWeight = '400';
    });

    // Move to Next Part of the Form
    next.addEventListener('click', function(event){
        event.preventDefault();
        firstform.className = 'hidden';
        secondform.className = 'showing';

        note['name'] = document.querySelector('#anonname').value;
        note['location'] = document.querySelector('#location').value;
        note['latitude'] = document.querySelector('#latitude').value;
        note['longitude'] = document.querySelector('#longitude').value;
        note['age'] = document.querySelector('#age').value;
        note['position'] = document.querySelector('#position').value;

        let form1 = document.querySelectorAll("#firstform input[type=text]");
        for (let eachField of form1) {
            eachField.value = "";
        }
    });

    // Sending in a response
    send.addEventListener('click', function(){
        submitpage.className = 'hidden';
        thankyou.className = 'showing';
        resourcespage.className = 'hidden';

        note['title'] = document.querySelector('#title').value;
        note['response'] = document.querySelector('#response').value;

        let form2 = document.querySelectorAll("#secondform input[type=text]");
        for (let eachField of form2) {
            eachField.value = "";
        }
        sendData();

        for (let category in note) {
            delete note[category];
        }
    });

    // Clear All Buttons
    clear1.addEventListener('click', function(){
        let form1 = document.querySelectorAll("#firstform input[type=text]");
        for (let eachField of form1) {
            eachField.value = "";
        }
    });

    clear2.addEventListener('click', function(){
        let form2 = document.querySelector("#secondform #response");
        form2.value = "";
    });

    // Send data to back4App
    function sendData(){
        const Notes = new Parse.Object("Notes");
        
        Notes.set("title", note['title']);
        Notes.set("name", note['name']);
        Notes.set("location", note['location']);
        Notes.set("age", note['age']);
        Notes.set("position", note['position']);
        Notes.set("response", note['response']);
        Notes.set("latitude", parseFloat(note['latitude']));
        Notes.set("longitude", parseFloat(note['longitude']));
        try {
            let result = Notes.save()
        } catch(error) {
            alert('Failed to save response');
        }
    }

    // Switch the explore page using nav bar
    explore.addEventListener('click', function(){
        thankyou.className = 'hidden';
        resourcespage.className = 'hidden';
        mappage.className = 'showing';
        listpage.className = 'hidden';
        main.className = 'showing';
        elink.style.fontWeight = '600';
    });

    // Handling toggle changes in view
    slider.addEventListener('click', function(){
        if(document.getElementById("checkbox").checked == false){
            mappage.className = 'hidden';
            listpage.className = 'showing';
            toggle.style.top = '1%';
            tlabel.textContent = 'List';
            displayList();
        }else if(document.getElementById("checkbox").checked == true){
            mappage.className = 'showing';
            listpage.className = 'hidden';
            toggle.style.top = '2%';
            tlabel.textContent = 'Map';
        } 
    });

    // display list on the page
    function displayList(){
        let elem = document.querySelector('.grid');
        let msnry = new Masonry( elem, {
        itemSelector: '.grid-item',
        columnWidth: 1,
        gutter: 50
        });

        getResponses();
        listContainer.innerHTML = "";
    }

    async function getResponses(){
        const Notes = Parse.Object.extend('Notes');
        const query = new Parse.Query(Notes);
        try{
            const results = await query.ascending('createdAt').find();

            results.forEach(function(eachNote){
                const id = eachNote.id;
                const title = eachNote.get('title');
                const name = eachNote.get('name');
                const location = eachNote.get('location');
                const age = eachNote.get('age');
                const position = eachNote.get('position');
                const response = eachNote.get('response');

                const theListItem = document.createElement('section');
                theListItem.setAttribute("id", `r-${id}`);
                theListItem.setAttribute("class", "grid-item");
                theListItem.innerHTML =  `
                    <div id="ltitle"><p>${title.toUpperCase()}</p></div>
                    <div id="lname"><img src="images/person.svg"><p>${title}</p></div>
                    <div id="llocation"><img src="images/pin.svg"><p>${location}</p></div>
                    <div id="lage"><img src="images/age.png" width=20><p>${age}</p></div>
                    <div id="lposition"><img src="images/work.svg"><p>${position}</p></div>
                    <div id="lresponse"><p>${response}</p></div>`;
                listContainer.append(theListItem);
            });
        }catch(error){
            console.error('Error while fetching Notes',error);
        }
    }

    // Nav Bar Clicks
    elink.addEventListener('click', function(){
        main.className = 'showing';
        elink.style.fontWeight = '600';
        link.style.fontWeight = '400';
        mappage.className = 'showing';
        resourcespage.className = 'hidden';
        document.getElementById("checkbox").checked = false;
        tlabel.textContent = 'Map';
        listpage.className = 'hidden';
        if(submitpage.className == 'showing' || thankyou.className == 'showing'){
            submitpage.className = 'hidden';
            thankyou.className = 'hidden';
        }
    });

    link.addEventListener('click', function(){
        resourcespage.className = 'showing';
        main.className = 'hidden';
        submitpage.className = 'hidden';
        firstform.className = 'hidden';
        secondform.className = 'hidden';
        thankyou.className = 'hidden';
        mappage.className = 'hidden';
        listpage.className = 'hidden';
        link.style.fontWeight = '600';
        elink.style.fontWeight = '400';
    });

    // Map section of explore page
    var map = L.map('map2').setView([38.5744896, -121.7560576], 5);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidXJ2aWciLCJhIjoiY2t5djVmaThqMDM0MDJ4cWt6azVsbGxlYiJ9.ufsVhVdvxu3bYqGsBAvocw'
    }).addTo(map);

    makePoints();

    // adding points to the map
    async function makePoints(){
        let count = 0;
        const Notes = Parse.Object.extend('Notes');
        const query = new Parse.Query(Notes);
        const results = await query.ascending('createdAt').find();
        results.forEach(function(eachNote){
            count += 1;
            circles.push([`circle${count}`, eachNote.get('latitude'), eachNote.get('longitude'), eachNote.id])
        });

        let circle;
        let points = [];
        for (var i = 0; i < circles.length; i++) {
            circle = new L.circle([circles[i][1], circles[i][2]],{
                id: circles[i][3],
                color: '#FF0000',
                fillColor: '#FF0000',
                fillOpacity: 0.5,
                radius: 1100
            }).addTo(map);

            points.push(circle);
        }

        for(let i = 0;i<points.length;i++){
            points[i].on('click', function(e) {
                L.DomEvent.stopPropagation(e);
                display.className = 'showing';
                display.innerHTML = "";
                display.style.overflowY = 'auto';
                query.get(points[i].options.id)
                    .then((point) => {
                    // The data was retrieved successfully.
                    display.innerHTML = `
                        <img id="x" src="images/x.svg">
                        <div id="mtitle"><p>${point.get('title').toUpperCase()}</p></div>
                        <div id="mname"><img src="images/person.svg"><p>${point.get('name')}</p></div>
                        <div id="mlocation"><img src="images/pin.svg"><p>${point.get('location')}</p></div>
                        <div id="mage"><img src="images/age.png" width=20><p>${point.get('age')}</p></div>
                        <div id="mposition"><img src="images/work.svg"><p>${point.get('position')}</p></div>
                        <div id="mresponse"><p>${point.get('response')}</p></div>
                        `;
                    x = document.querySelector('#mappage #x');
                    x.addEventListener('click', function(){
                        display.className = 'hidden';
                    });
                    }, (error) => {
                    // The response was not retrived successfully
                    console.log('Cannot access the data');
                });
            });
        }
    }

    setInterval(function () {
        map.invalidateSize();
    }, 100);

    // Click x to remove map display pop up
    x.addEventListener('click', function(){
        display.className = 'hidden';
    });
})();