(function(){
    'use strict';

    var map = L.map('map2').setView([37.550201, -121.980827], 5);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidXJ2aWciLCJhIjoiY2t5djVmaThqMDM0MDJ4cWt6azVsbGxlYiJ9.ufsVhVdvxu3bYqGsBAvocw'
    }).addTo(map);

    var marker1 = L.marker([37.565347, -122.01648350597601]).addTo(map);
    marker1.bindPopup("<b>American High School</b><br>I had so much fun driving here every morning.");

    var marker2 = L.marker([37.562126500000005, -122.05231410882354]).addTo(map);
    marker2.bindPopup("<b>Forest Park Elementary School</b><br>Best school years of my life! Now my dog likes to play at this park.");

    var marker3 = L.marker([37.5562645, -122.01636138794925]).addTo(map);
    marker3.bindPopup("<b>Thornton Junior High School</b><br>I hated this school but I made so many good friends :)");

    // var marker3 = L.marker([38.5744896, -121.7560576]).addTo(map);

    let circle = new L.circle([38.5744896, -121.7560576],{
        color: '#FF0000',
        fillColor: '#FF0000',
        fillOpacity: 0.5,
        radius: 1000
    }).addTo(map);
})();