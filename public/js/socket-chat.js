let socket = io();

//detectamaos 
let params = new URLSearchParams(window.location.search);

//obtnemos los parametros del query string ?=
if(params.has('nombre')==='' && params.has('sala')===''){
      window.location='/public/index.html';
    throw new Error('El nombre y la sala son necesarios');

}

let usuario ={
    nombre: params.get('nombre'),
    sala: params.get('sala')
};




socket.on('connect', function() {
    console.log('Conectado al servidor');

    //emitimoss
    socket.emit('entrarChat',usuario, function(resp){
        console.log('Usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


//Escucha cambios de usuarios 
//cuando el usuario entra o sale del chat

socket.on('listaPersona', function(personas){
    console.log(personas);

});


//Enviar mensajes privados
socket.on('mensajePrivado', function(mensaje){

    console.log('mensaje Privado:',mensaje);

});