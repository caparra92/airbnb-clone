class Localization {

    constructor(callback) {
        if (navigator.geolocation) {
            //obter ubicação
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;

                callback();
            });
        } else {
            alert("Seu navegador não suporta geolocation")
        }

    }
}