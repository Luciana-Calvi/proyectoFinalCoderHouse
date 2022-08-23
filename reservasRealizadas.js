let reserva = JSON.parse(localStorage.getItem("reservas"));

function llenarTabla(){
   let contenido = '';

    let dpto1 = JSON.parse(localStorage.getItem("reservas"));

    contenido = contenido + '<tr>';
    contenido = contenido + '<th><div class="size text-center">DEPARTAMENTO</div></th>';
    contenido = contenido + '<th><div class="size text-center">FECHA DESDE</div></th>';
    contenido = contenido + '<th><div class="size text-center">FECHA HASTA</div></th>';
    contenido = contenido + '</tr>';
    dpto1.forEach(element => {
        contenido = contenido + '<tr>';
        contenido = contenido + '<td>' + element[0].depto + '</td>';
        contenido = contenido + '<td>' + element[0].fechaDesde + '</td>';
        contenido = contenido + '<td>' + element[0].fechaHasta + '</td>';
        contenido = contenido + '</tr>';
    });
    console.log(contenido);

    
    document.querySelector('#tablaReservas').innerHTML = contenido;
    //let error = "error";
    //error ? tablaReservas.innerHTML = error : tablaReservas.innerHTML = contenido;
}
llenarTabla();