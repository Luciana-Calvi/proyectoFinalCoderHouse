function validarTarjeta(){
    // aca se tiene que validar que el número de tarjeta sea sólo números
    let tarjeta = document.getElementById('numTarjeta').value;
    let mes = document.getElementById('mes').value;
    let año = document.getElementById('año').value;
    let ccv = document.getElementById('ccv').value;
    let identidad = document.getElementById('identidad').value;

    if((tarjeta.length != 16) || (tarjeta == "")){
        mostrarMensaje("Ingrese un numero de 16 digitos por favor",1);
    }else if((mes.length > 2) || (mes.length < 2)){
        mostrarMensaje("Ingrese solo dos digitos para el mes por favor",1);
    }else if((año.length > 2) || (año.length < 2)){
        mostrarMensaje("Ingrese solo dos digitos para el año por favor",1);
    }else if((ccv.length > 3) || (ccv.length < 3)){
        mostrarMensaje("Ingrese solo tres digitos para el ccv por favor",1);
    }else if((identidad =="")){
        mostrarMensaje("Ingrese nombre y apellido por favor",1);
    }else{
        mostrarMensaje("Su reserva fue realizada con exito",2);
    }
}

function mostrarMensaje(mensaje, tipo) {
    switch (tipo) {
        case 1:
            Swal.fire({
                icon: 'error',
                title: mensaje,               
              })        
            break;
        case 2:
            Swal.fire({
                icon: 'success',
                title: mensaje,             
                confirmButtonText: 'ACEPTO '
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href ="file:///C:/Users/matia/Desktop/proyectoFinalCoderHouse/index.html"
                }
            })
        default:
            break;
    }
}

function pagar() {
    validarTarjeta();
}
function cancelarPago(){
    mostrarMensaje("Su reserva fue cancelada", 2);
}