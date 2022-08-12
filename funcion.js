class deptos{
    constructor(numero,precio,capacidad){
        this.numero =numero;
        this.precio = precio;
        this.capacidad = capacidad
    }
}

let departamentos = []
    departamentos.push(new deptos( 1,  1000,  6)),
    departamentos.push(new deptos(2, 2000, 8)),
    departamentos.push(new deptos(3, 3000, 4));
    
let reservas = [];

document.getElementById('botonCalcularPrecio').disabled = true;

//SE UTILIZARÁ , MAS ADELANTE!!!
/*class deptos{
    constructor(baño, habitaciones, detalle = "Tiene patio interno", churrasquera, cochera,wiFi, direcTV){
        this.baño = baño;
        this.habitaciones = habitaciones;
        this.detalle = detalle = "Tiene patio interno";
        this.churrasquera = churrasquera;
        this.cochera = cochera;
        this.wiFi = wiFi;
        this.direcTV = direcTV;
    }
}*/

function obtenerFechaActual() {
    let hoy = new Date();
    hoy = hoy.toISOString().slice(0,10);
    hoy = hoy.split('-');
    return hoy[1] + '/' + hoy[2] + '/' + hoy[0]; 
}

function obtenerFechaDesde() {
    let fechaDesde = document.getElementById("fechaDesde").value;
    fechaDesde = fechaDesde.split('-');
    return fechaDesde[1] + '/' + fechaDesde[2] + '/' + fechaDesde[0];
}

function obtenerFechaHasta() {
    let fechaHasta = document.getElementById("fechaHasta").value;
    fechaHasta = fechaHasta.split('-');
    return fechaHasta[1] + '/' + fechaHasta[2] + '/' + fechaHasta[0];
}

function obtenerDiferenciaDeFechas(desde, hasta) {
    var diferencia = Math.abs(hasta - desde);
    return diferencia/(1000 * 3600 * 24);
}

function costoYDescuentoPorDiaYDpto(dias, total) {
    if (dias < 15) {
        document.getElementById("costo").innerHTML = "EL TOTAL ES DE: $" + total + " POR DIA";
    } else {
        document.getElementById("costo").innerHTML = "TIENE UN DESCUENTO DEL 15% SOBRE EL TOTAL";
        let descuento = total * 0.15;
        let totalDescuento = total - descuento;
        document.getElementById("costo").innerHTML = "Total con el descuento es de: $" + totalDescuento;
    }
}

function costoPorDpto(numero, dias) {
    let resultado;
    for (const depto of departamentos) {
        if (depto.numero == numero) {
            resultado = depto.precio;
        }      
    }     
    return dias * resultado;
}

function calcularPrecio() {
    
    document.getElementById("costo").innerHTML = "";
    document.getElementById("mensaje").innerHTML = "";

    $('#miModal').modal('show'); // VISUALIZAR MODAL
    
    document.getElementById("mensaje").innerHTML = '';
    let fechaDesde = obtenerFechaDesde();
    var fechaDesdeFormateada = new Date(fechaDesde);
    
    let fechaHasta = obtenerFechaHasta();
    var fechaHastaFormateada = new Date(fechaHasta);

    let fechaHoy = obtenerFechaActual();
    var fechaHoyFormateada = new Date(fechaHoy);

    if (fechaDesdeFormateada < fechaHoyFormateada) {
        document.getElementById("mensaje").innerHTML = "La fecha Desde no puede ser menor a la fecha de Hoy "+"\n"+"ELIJA OTRA FECHA POR FAVOR";
    } else if(fechaHastaFormateada < fechaHoyFormateada) {
        document.getElementById("mensaje").innerHTML = "La fecha Hasta no puede ser menor a la fecha de Hoy "+"\n"+"ELIJA OTRA FECHA POR FAVOR";
    } else if (fechaHastaFormateada < fechaDesdeFormateada) {
        document.getElementById("mensaje").innerHTML = "La fecha Hasta no puede ser menor a la fecha de Desde "+"\n"+"ELIJA OTRA FECHA POR FAVOR";
    } else {
        let dias = obtenerDiferenciaDeFechas(fechaDesdeFormateada, fechaHastaFormateada);  
        let depto = document.getElementById("departamento").value;
        console.log("departamento: " + depto);
        if ((depto >= 1) && (depto <= 3)) {
            let total = costoPorDpto(depto, dias);
            costoYDescuentoPorDiaYDpto(dias, total);
            intentoDeReserva(depto);
        }
    }   
}


function selecionarDepartamento(){
    let departamento = document.getElementById('departamento').value;
    if(departamento != 0){
        document.getElementById('botonCalcularPrecio').disabled = false;
    }else{
        document.getElementById('botonCalcularPrecio').disabled = true;
    }
}


let botonCalcularPrecio = document.querySelector('#botonCalcularPrecio');
    botonCalcularPrecio.addEventListener('mouseover', () => {
    botonCalcularPrecio.classList.toggle('btn-danger');
});

let botonResetear = document.querySelector('#botonResetear');
    botonResetear.addEventListener('mouseover', () => {
        botonResetear.classList.toggle('btn-success');
    });

let costo = document.querySelector('#costo');


function intentoDeReserva(depto) {
    // un cliente solicita una reserva
    let fD = document.getElementById("fechaDesde").value;
    let fH = document.getElementById("fechaHasta").value;;
    // se almacena en matriz
    // reservas.push([{dpto: depto, fechaDesde: fD, fechaHasta: fH}]);
    console.log("Cantidad de reservas actuales:");
    console.log(reservas.length);
    console.log(reservas[0]);

    let reservasFiltradas = reservas.filter((reserva) => {
        if (reserva[0].depto == depto) {
            return true
        } else {
            return false;
        }
    });
    console.log("filtrados:");
    console.log(reservasFiltradas); // nueva matriz
    
    let almacenarRegistro = true;
    reservasFiltradas.forEach(element => {
        almacenarRegistro = controlarDisponibilidad(element, fD, fH, almacenarRegistro);
    });
    if (almacenarRegistro) {
        // Se hace el push en el array de reservas ya que se validaron fecha desde y hasta de la intensión de reserva 
        reservas.push([{depto: depto, fechaDesde: fD, fechaHasta: fH}]);
        document.getElementById("mensaje").innerHTML = "SE HA ALMACENADO LA RESERVA";
    }
    let enJSON = JSON.stringify(reservas);
    localStorage.setItem("reservas",enJSON);
    // Resultado final
    console.log("El array queda:");
    console.log(reservas);
}

function controlarDisponibilidad(element, fD, fH, almacenarRegistro) {
    
    // Validamos la fecha desde (intensión de reserva)
    let fechaInicioX = new Date(element[0].fechaDesde);
    fechaInicioX = fechaInicioX.getTime();

    let fechaFinX = new Date(element[0].fechaHasta);
    fechaFinX = fechaFinX.getTime();

    let fechaValidarX = new Date(fD);
    fechaValidarX = fechaValidarX.getTime();

    if ((fechaValidarX >= fechaInicioX) && (fechaValidarX < fechaFinX)) {
        document.getElementById("mensaje").innerHTML = "No se puede reservar, elija otra fecha";
        almacenarRegistro = false;
        //return false; // en elfuturo tiene que retornar falso
    } else {
        console.log("Si se puede reservar hasta acá");
        //return true;
        console.log("Se va a validar el HASTA ahora:");
        // Validamos la fecha desde (intensión de reserva)
        fechaValidarX = new Date(fH);
        fechaValidarX = fechaValidarX.getTime();

        if ((fechaValidarX > fechaInicioX) && (fechaValidarX <= fechaFinX)) {
            document.getElementById("mensaje").innerHTML = "No se puede reservar, elija otra fecha";
            //return false; // en elfuturo tiene que retornar falso
            almacenarRegistro = false;        
        } else {
            console.log("Si se puede reservar");
            //return true;
        }
    }
    return almacenarRegistro;
}
/*
function fechaIncluida(fechaDesde, fechaHasta, fechaValidar) {

    return false;
}*/