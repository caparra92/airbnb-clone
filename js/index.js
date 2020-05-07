(function initMap() {

    const ubicacion = new Localization(() => {

        let lat = ubicacion.latitude;
        let lng = ubicacion.longitude;

        //var map = document.getElementById('map');
        var mymap = L.map('mapid').setView([lat,lng], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FwYXJyYTkyIiwiYSI6ImNrOXcxMmozOTAyMW8zZnFzcGNmMm8wOWUifQ.W9lU97CRGtGpCtdCdTw3mw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiY2FwYXJyYTkyIiwiYSI6ImNrOXcxMmozOTAyMW8zZnFzcGNmMm8wOWUifQ.W9lU97CRGtGpCtdCdTw3mw'
        }).addTo(mymap);

    });
})();

fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72')
    .then(response => {
        response.json().then(data => {
            let container = document.querySelector('#cardContainer');
            container.innerHTML = '';
            for(let item of data) {
                container.innerHTML += `<div class="col-md-3">
                <div class="card" style="width: 18rem;">
                    <img src="${item.photo}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${item.property_type}</h5>
                        <p class="card-text">${item.name}</p>
                        <a href="#" class="btn btn-primary">Escolher</a>
                    </div>
                </div>
            </div>`
            }
        });
    })
    .catch(err => {
        console.log('Error', err);
    });

