class deptos{
    constructor(numero,precio,capacidad){
        this.numero =numero;
        this.precio = precio;
        this.capacidad = capacidad
    }
}

class reservaTemporalDepto{
    constructor(numero, fechaDesde, fechaHasta, total){
        this.numero = numero;
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
        this.total = total;
    }
}

// Almacena la información de los departamentos
let departamentos = [];
recuperarJsonDeptos();

// Almacena la información de la reserva temporal del departamento (hasta que se abona)
let reservaTmpDepto = [];
recuperarReservaTmpDepto();

let departameto1;
let departamento2;
let departamento3;

let reservas = JSON.parse(localStorage.getItem("reservas"));
if (reservas == null) {
    reservas = [];
}
document.getElementById('botonCalcularPrecio').disabled = true;

departameto1 = document.getElementById('uno').value;
departamento2 = document.getElementById('dos').value;
departamento3 = document.getElementById('tres').value;

async function recuperarReservaTmpDepto() {
    let array = [];
    await fetch('./reservaTemporalDepto.json')
    .then((resp) => resp.json())
    .then((reserva) => {
        for (const [key, value] of Object.entries(reserva)) {
            array.push(new reservaTemporalDepto(parseInt(value.numero), parseInt(value.fechaDesde), parseInt(value.fechaHasta), parseInt(value.total)));
        }
        reservaTemporalDepto = array;
    });
}

async function recuperarJsonDeptos() {
    let array = [];
    await fetch('./departamento.json')
    .then((resp) => resp.json())
    .then((depto) => {
        for (const [key, value] of Object.entries(depto)) {
            array.push(new deptos(parseInt(value.numero), parseInt(value.precio), parseInt(value.capacidad)));
        }
        departamentos = array;
    });
}

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
        mostrarMensaje("EL TOTAL ES DE: $" + total, "¿Desea reservar?", "", 2);
    } else {
        let descuento = total * 0.15;
        total = total - descuento;
        mostrarMensaje("TIENE UN DESCUENTO DEL 15% SOBRE EL TOTAL","Total con el descuento es de: $" + total, "", 2);      
    }
    return total; // Se almacenará en la reserva temporal (hasta que abone)
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
    //document.getElementById("costo").innerHTML = "";
    //document.getElementById("mensaje").innerHTML = "";

   // $('#miModal').modal('show'); // VISUALIZAR MODAL
    
   // document.getElementById("mensaje").innerHTML = '';
    let fechaDesde = obtenerFechaDesde();
    var fechaDesdeFormateada = new Date(fechaDesde);

    let fechaHasta = obtenerFechaHasta();
    var fechaHastaFormateada = new Date(fechaHasta);

    let fechaHoy = obtenerFechaActual();
    var fechaHoyFormateada = new Date(fechaHoy);

    if (fechaDesdeFormateada < fechaHoyFormateada) {
       mensaje = mostrarMensaje("", "La fecha Desde no puede ser menor a la fecha de Hoy ","",1 );
    } else if(fechaHastaFormateada < fechaHoyFormateada) {
        mensaje = mostrarMensaje("", "La fecha Hasta no puede ser menor a la fecha de Hoy ","" , 1 );       
    } else if (fechaHastaFormateada < fechaDesdeFormateada) {
       mensaje = mostrarMensaje("", "La fecha Hasta no puede ser menor a la fecha de Desde ","", 1 );
    } else if((fechaDesdeFormateada == 'Invalid Date') || (fechaHastaFormateada == 'Invalid Date')){
        mensaje = mostrarMensaje("", "Debe elegir una fecha por favor ","", 1 );
    } else {
        let dias = obtenerDiferenciaDeFechas(fechaDesdeFormateada, fechaHastaFormateada);  
        let depto = document.getElementById("departamento").value;
        if ((depto >= 1) && (depto <= 3)) {
            let total = costoPorDpto(depto, dias);
            total = costoYDescuentoPorDiaYDpto(dias, total);
            intentoDeReserva(depto, total);
        }
    }   
}

function mostrarMensaje(titulo, mensaje, url, tipo) {
    switch (tipo) {
        case 1:
            Swal.fire({
                icon: 'error',
                title: mensaje,               
              })        
            break;
        case 2:
            Swal.fire({
                title: titulo,
                text: mensaje,
                imageUrl:url,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ACEPTO '
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href ="./pago.html";
                }
              })
        default:
            break;
    }
}

/*  <<--OPERACION TERNARIA-->> */
function selecionarDepartamento(){
    
   let departamento = document.getElementById('departamento').value;
   departamento != 0 ? document.getElementById('botonCalcularPrecio').disabled = false : document.getElementById('botonCalcularPrecio').disabled = true;
   
    let botonCalcularPrecio = document.querySelector('#botonCalcularPrecio');
    botonCalcularPrecio.addEventListener('mouseover', () => {
        botonCalcularPrecio.classList.toggle('btn-danger');
    });

    let botonResetear = document.querySelector('#botonResetear');
    botonResetear.addEventListener('mouseover', () => {
        botonResetear.classList.toggle('btn-success');
    });
}
function intentoDeReserva(depto, total) {
    // un cliente solicita una reserva
    let fD = document.getElementById("fechaDesde").value;
    let fH = document.getElementById("fechaHasta").value;;
    // se almacena en matriz
    // reservas.push([{dpto: depto, fechaDesde: fD, fechaHasta: fH}]);
    
    let almacenarRegistro = true;
    if (reservas != null) {
        let reservasFiltradas = reservas.filter((reserva) => {
            if (reserva[0].depto == depto) {
                return true
            } else {
                return false;
            }
        });
        reservasFiltradas.forEach(element => {
            almacenarRegistro = controlarDisponibilidad(element, fD, fH, almacenarRegistro);
        });
    }
   
    if (almacenarRegistro) {
        // Se hace el push en el array de reservas ya que se validaron fecha desde y hasta de la intensión de reserva 
        // en el localstorage nuevo, agregar: depto, fD, fH
        // reservas.push([{depto: depto, fechaDesde: fD, fechaHasta: fH}]);
        reservaTmpDepto.push([{depto: depto, fechaDesde: fD, fechaHasta: fH, total: total}]);
    }
    
    let enJSON = JSON.stringify(reservaTmpDepto[0]);
    localStorage.setItem("reservaTemporal", enJSON);
    // Resultado final
    console.log("El array queda:");
    console.table(reservas);
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
        mensaje = mostrarMensaje("", "No se puede reservar, elija otra fecha","", 1 );
        
        almacenarRegistro = false;
        //return false; // en elfuturo tiene que retornar falso
    } else {
        // Validamos la fecha desde (intensión de reserva)
        fechaValidarX = new Date(fH);
        fechaValidarX = fechaValidarX.getTime();

        if ((fechaValidarX > fechaInicioX) && (fechaValidarX <= fechaFinX)) {
            mensaje = mostrarMensaje("", "No se puede reservar, elija otra fecha","", 1 );
            
            //return false; // en elfuturo tiene que retornar falso
            almacenarRegistro = false;        
        } else {
            console.log("Si se puede reservar");
            //return true;
        }
    }
    return almacenarRegistro;
}
