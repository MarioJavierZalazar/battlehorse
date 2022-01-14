//Variables
let formulario = document.getElementById('formContacto');
let nombre = formulario.nombre;
let email = formulario.email;
let motivo = formulario.motivo;
let mensaje = formulario.mensaje;

// Se valida que el campo nombre no este vaicio
const validarNombre = (e) => {
    if(nombre.value == '' || nombre.value == null){
        document.getElementById('mensajeErrorNombre').style.display = 'block';
        e.preventDefault();
    } else {
        document.getElementById('mensajeErrorNombre').style.display = 'none';
    }
}
// Se valida que el campo email no este vaicio
const validarEmail = (e) => {
    if(email.value == '' || email.value == null){
        document.getElementById('mensajeErrorEmail').style.display = 'block';
        e.preventDefault();
    } else {
        document.getElementById('mensajeErrorEmail').style.display = 'none';
    }
}

// Se valida que el campo motivo, tenga un valor seleccionado
const validarMotivo = (e) => {
    if(motivo.value == "null"){
        document.getElementById('mensajeErrorMotivo').style.display = 'block';
        e.preventDefault();
    } else {
        document.getElementById('mensajeErrorMotivo').style.display = 'none';
    }
}

// Se valida que el campo Mensaje no este vaicio
const validarMensaje = (e) => {
    if(mensaje.value == "" || mensaje.value == null){
        document.getElementById('mensajeErrorTexto').style.display = 'block';
        e.preventDefault();
    } else {
        document.getElementById('mensajeErrorTexto').style.display = 'none';
    }
}

//Funciones
const validarDatos = (e) => {
    validarNombre(e);
    validarEmail(e);
    validarMotivo(e);
    validarMensaje(e);
}

// Evento
formulario.addEventListener('submit', validarDatos)