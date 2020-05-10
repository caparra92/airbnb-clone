/* function initMap() {

    const ubicacion = new Localization(() => {

        let lat = ubicacion.latitude;
        let lng = ubicacion.longitude;

        //var map = document.getElementById('map');
        let mymap = L.map('mapid').setView([lat, lng], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FwYXJyYTkyIiwiYSI6ImNrOXcxMmozOTAyMW8zZnFzcGNmMm8wOWUifQ.W9lU97CRGtGpCtdCdTw3mw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiY2FwYXJyYTkyIiwiYSI6ImNrOXcxMmozOTAyMW8zZnFzcGNmMm8wOWUifQ.W9lU97CRGtGpCtdCdTw3mw'
        }).addTo(mymap);

    });
} */

const endpoint = 'https://v2-api.sheety.co/38eb1325f118315e89d0f40a97e6657c/airbnbClone/db';
const cities = [];

fetch(endpoint)
    .then(response => response.json())
    .then(data => cities.push(...data.db))
    .catch(err => alert(err));

function findMatches(wordToSearch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToSearch, 'gi');
        return place.city.match(regex);
    })
}

let btnBusca = document.getElementById('btn_busca');

btnBusca.addEventListener('click', function (e) {

    let place = document.getElementById('place').value;
    let checkIn = document.getElementById('check-in').value;
    let checkOut = document.getElementById('check-out').value;
    let dateIn = new Date(checkIn).getTime();
    let dateOut = new Date(checkOut).getTime();
    let seconds = dateOut - dateIn;
    let days = seconds / (1000*60*60*24);
    let container = document.getElementById('cardContainer');

    if (place === '') {
        alert('Tenta escrever algum lugar pra procurar');
    } else {

        window.location = 'index.html#mapContainer';
        //mapa
        //
        //console.log(place);
        const matchedArray = findMatches(place, cities);
        container.innerHTML = '';

        var mymap = L.map('mapid').setView([matchedArray[0].latitude, matchedArray[0].longitude], 12);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FwYXJyYTkyIiwiYSI6ImNrOXcxMmozOTAyMW8zZnFzcGNmMm8wOWUifQ.W9lU97CRGtGpCtdCdTw3mw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 17,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiY2FwYXJyYTkyIiwiYSI6ImNrOXcxMmozOTAyMW8zZnFzcGNmMm8wOWUifQ.W9lU97CRGtGpCtdCdTw3mw'
        }).addTo(mymap);

        for (let item of matchedArray) {

            console.log(item.latitude,item.longitude);
            var marker = L.marker([item.latitude, item.longitude]).addTo(mymap);
            container.innerHTML += `<div class="col-md-3">
                <div class="card">
                    <img src="${item.photo}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${item.propertyType}</h5>
                        <p class="card-text">${item.name}</p>
                        <a href="#" class="btn btn-primary">Escolher</a>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">R$${item.price}</small>
                        <strong class="float-right">R$${item.price * days}</strong>
                    </div>
                </div>
                </div>`
        }
    }

});
