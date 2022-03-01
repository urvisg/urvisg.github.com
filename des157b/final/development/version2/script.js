const elink = document.querySelector('#elink');
const link = document.querySelector('#links');

const slider = document.querySelector('.slider.round');
const tlabel = document.querySelector('#tlabel');
const listContainer = document.querySelector(".grid");

const story = document.querySelector('#story');
const submit = document.querySelector('#submit');
const next = document.querySelector('#next');
const send = document.querySelector('#send');
const explore = document.querySelector('#explore');
const display = document.querySelector('#mappage article');

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

// Back4App
Parse.initialize("aCSvAxSmvzPT231gRq4kZVCP4ktz3MFCMeAg66g4","2LLLjoQbxAhiYTa28MRmMMEE4oWWCvUHY9VnqO6b"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/';

let note = {
    'name': null,
    'location': null,
    'age': null,
    'position': null,
    'response': null,
    'latitude': null,
    'longitude': null
};

story.addEventListener('click', function(){
    landingpage.className = 'hidden';
    mappage.className = 'showing';
    nav.className = 'showing';
    main.className = 'showing';
    elink.style.fontWeight = '600';
});

submit.addEventListener('click', function(){
    mappage.className = 'hidden';
    thankyou.className = 'hidden';
    submitpage.className = 'showing';
    firstform.className = 'showing';
    secondform.className = 'hidden';
    main.className = 'hidden';
    elink.style.fontWeight = '400';
});

next.addEventListener('click', function(event){
    event.preventDefault();
    firstform.className = 'hidden';
    secondform.className = 'showing';

    note['name'] = document.querySelector('#anonname').value;
    note['location'] = document.querySelector('#location').value;
    note['age'] = document.querySelector('#age').value;
    note['position'] = document.querySelector('#position').value;

    getLocation();

    let form1 = document.querySelectorAll("input[type=text]");
    for (let eachField of form1) {
        eachField.value = "";
    }
});

send.addEventListener('click', function(){
    submitpage.className = 'hidden';
    thankyou.className = 'showing';

    note['response'] = document.querySelector('#response').value;

    let form1 = document.querySelectorAll("input[type=text]");
    for (let eachField of form1) {
        eachField.value = "";
    }
    sendData();

    for (let category in note) {
        delete note[category];
    }
});

// Get user's location in coordinates
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, options);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
  
function showPosition(position) {
    note['latitude'] = position.coords.latitude;
    note['longitude'] = position.coords.longitude;
}

// Send data to back4App
function sendData(){
    const Notes = new Parse.Object("Notes");
    
    Notes.set("name", note['name']);
    Notes.set("location", note['location']);
    Notes.set("age", note['age']);
    Notes.set("position", note['position']);
    Notes.set("response", note['response']);
    Notes.set("latitude", note['latitude']);
    Notes.set("longitude", note['longitude']);
    try {
        let result = Notes.save()
        alert('New object created with objectId: ' + result.id);
    } catch(error) {
        alert('Failed to create new object, with error code: ' + error.message);
    }
}

explore.addEventListener('click', function(){
    thankyou.className = 'hidden';
    mappage.className = 'showing';
    listpage.className = 'hidden';
    main.className = 'showing';
    elink.style.fontWeight = '600';
});

slider.addEventListener('click', function(){
    if(document.getElementById("checkbox").checked == false){
        mappage.className = 'hidden';
        listpage.className = 'showing';
        tlabel.textContent = 'List';
        displayList();
    }else if(document.getElementById("checkbox").checked == true){
        mappage.className = 'showing';
        listpage.className = 'hidden';
        tlabel.textContent = 'Map';
    } 
});

function displayList(){
    let elem = document.querySelector('.grid');
    let msnry = new Masonry( elem, {
      itemSelector: '.grid-item',
      gutter: 50,
    });

    // imagesLoaded( elem ).on( 'progress', function() {
    //   msnry.layout();
    // });
    getResponses();
}

async function getResponses(){
    const Notes = Parse.Object.extend('Notes');
    const query = new Parse.Query(Notes);
    try{
        const results = await query.ascending('createdAt').find();

        results.forEach(function(eachNote){
            const id = eachNote.id;
            const name = eachNote.get('name');
            const location = eachNote.get('location');
            const age = eachNote.get('age');
            const position = eachNote.get('position');
            const response = eachNote.get('response');

            const theListItem = document.createElement('section');
            theListItem.setAttribute("id", `r-${id}`);
            theListItem.setAttribute("class", "grid-item");
            theListItem.innerHTML =  `
                <div id="name"><p>from <span>${name.toUpperCase()}</span></p></div>
                <div id="location"><img src="images/pin.svg"><p>${location}</p></div>
                <div id="age"><img src="images/age.svg"><p>${age}</p></div>
                <div id="position"><img src="images/work.svg"><p>${position}</p></div>
                <div id="response"><p>${response}</p></div>`;
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
    mappage.className = 'hidden';
    listpage.className = 'hidden';
    link.style.fontWeight = '600';
    elink.style.fontWeight = '400';
});

// Map section of explore page
var map = L.map('map2').setView([57.774929, -123.419418], 5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
tileSize: 412,
zoomOffset: -1,
accessToken: 'pk.eyJ1IjoidXJ2aWciLCJhIjoiY2t5djVmaThqMDM0MDJ4cWt6azVsbGxlYiJ9.ufsVhVdvxu3bYqGsBAvocw'
}).addTo(map);

makePoints();

let temp = [];

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
    for (var i = 0; i < circles.length; i++) {
        circle = new L.circle([circles[i][1], circles[i][2]],{
            id: circles[i][3],
            color: '#83B1FF',
            fillColor: '#83B1FF',
            fillOpacity: 0.5,
            radius: 10000
        }).addTo(map);

        temp.push(circle);

        circle.on('click', function(e) {
            L.DomEvent.stopPropagation(e);
            display.innerHTML = "";
            query.get(circle.options.id)
                .then((point) => {
                // The object was retrieved successfully.
                display.innerHTML = `
                    <div id="mname"><p>from <span>${point.get('name').toUpperCase()}</span></p></div>
                    <div id="mlocation"><img src="images/pin.svg"><p>${point.get('location')}</p></div>
                    <div id="mage"><img src="images/age.svg"><p>${point.get('age')}</p></div>
                    <div id="mposition"><img src="images/work.svg"><p>${point.get('position')}</p></div>
                    <div id="mresponse"><p>${point.get('response')}</p></div>
                    `;
                }, (error) => {
                // The object was not retrieved successfully.
                console.log('Click not working');
            });
        });
    }
}

setInterval(function () {
    map.invalidateSize();
}, 100);