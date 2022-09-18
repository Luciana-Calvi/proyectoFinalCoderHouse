class Contactos {
    constructor (nombre, telefono, email, mensaje) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.mensaje = mensaje;
    }
}

let contactos = JSON.parse(localStorage.getItem("contacto"));
if (contactos == null) {
    contactos = [];
}
console.log(contactos);

function datosCorrectos() {
    let nombre = document.getElementById('nombre').value;
    let telefono = document.getElementById('telefono').value;
    let email = document.getElementById('email').value;
    let mensaje = document.getElementById('mensaje').value;
    
    let enviar = true;
    let mensajeError = "";

    if((nombre.length == 0) || (nombre.length > 8)) {
        mensajeError = "Su nombre debe contene mas de una letra y no debe exceder las 8 letras";
        enviar = false;
    }
    if (telefono == "") {
        mensajeError = "Su numero de telefono debe contener 9 digitos";
        enviar = false;
    } else {
        telefono = parseInt(telefono);
    }
    if ((telefono <= 0) && (telefono >= 15)) {
        mensajeError = "Su numero de telefono debe contener 9 digitos";
        enviar = false;
    }
    if (email == ""){
        mensajeError = "Debe escribir su email";
        enviar = false;
    }
    if ((mensaje.length == 0) || (mensaje.length >= 30)){
        mensajeError = "No debe exceder las 30 letras";
        enviar = false;
    }
    if (enviar == false) {
        sweetAlert(mensajeError, 1);
    } else {
        console.log(contactos);
        contactos.push(new Contactos(nombre, telefono, email, mensaje));
        console.log(contactos);
        let enJSON = JSON.stringify(contactos);
        localStorage.setItem("contacto", enJSON);
        console.log(contactos),
        sweetAlert("Muchas gracias, pronto nos pondremos en contacto con usted", 2);
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

