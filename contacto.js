

function datosCorrectos() {
    let nombre = document.getElementById('nombre').value;
    let telefono = document.getElementById('telefono').value;
    let asunto = document.getElementById('asunto').value;
    let mensaje = document.getElementById('mensaje').value;

    let enviar = true;
    let mensajeError = "";

    console.log("longitud", nombre.length);
    if((nombre.length == 0) || (nombre.length > 8)) {
        mensajeError = "Su nombre debe contene mas de una letra y no debe exceder las 8 letras";
        enviar = false;
    }
    
    if (telefono == "") {
        mensajeError = "Su numero de telefono debe contener 9 digitos";
        enviar = false;
    }else {
        telefono = parseInt(telefono);
        
        if ((telefono <= 0) && (telefono >= 15)) {
            mensajeError = "Su numero de telefono debe contener 9 digitos";
            enviar = false;
        }
    }
    if((asunto.length == 0) || (asunto.length >= 10)){
        mensajeError = "El asunto no debe contener mas de 10 letras";
        enviar = false;
    }
    if( (mensaje.length == 0) || (mensaje.length >= 30)){
        mensajeError = "No debe exceder las 30 letras";
        enviar = false;
    }
    
    if (enviar == true) {
        sweetAlert("Muchas gracias, pronto nos pondremos en contacto con usted", 2);
    } else {
        sweetAlert(mensajeError, 1);
    }
}

function sweetAlert(titulo, tipo){
    switch (tipo) {
        case 1:
            Swal.fire({
                icon: 'error',
                title: titulo               
              })        
            break;
        case 2:
            Swal.fire({
                icon: 'success',
                title: titulo,               
              }) 
    }

}