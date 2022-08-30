function obtenerClima() {
    let contenido = '';

    fetch('http://api.weatherapi.com/v1/forecast.json?key=8378b63c1c234aa29a212755222908&q=Bahia Blanca&days=5&aqi=no&alerts=no')
    .then(response => response.json()
    ).then(
        json => {
            let clima = json.forecast.forecastday;
            clima.forEach(element => {
                contenido = contenido + '<tr>';
                contenido = contenido + '<td>' + element.date + '</td>';
                contenido = contenido + '<td>' + element.day.mintemp_c + '</td>';
                contenido = contenido + '<td>' + element.day.maxtemp_c + '</td>';
                contenido = contenido + '</tr>';
            });
            console.log(contenido);
        
            document.querySelector('#tablaClima').innerHTML = contenido;
        }
    );
}

obtenerClima();