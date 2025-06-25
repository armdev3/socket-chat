
const {Usuarios} = require('../classes/usuarios');
const { io } = require('../server');
const usuarios = new Usuarios();
const {crearMensaje}= require('../utils/utilidades');

io.on('connection', (client) => {

    
   client.on('entrarChat', (data, callback) => {
   if(!data.nombre || !data.sala){
       if (typeof callback === 'function') {
           return callback({
               error:true,
               mensaje:'el nombre y la sala son necesarios'
           });
       }


       return; // O puedes manejar el error de otra forma
     
   }

     
   client.join(data.sala);

   let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

   //definimos nuestro evento y llamamos a  la funcion getPersonas que obtiene todas la personas
   client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));//emite a todas las personas del chat


   if (typeof callback === 'function') {
       callback(usuarios.getPersonasPorSala(data.sala));
   }


   client.on('crearMensaje', (data)=>{

    let persona = usuarios.getPersona(client.id);

    let mensaje = crearMensaje(persona.nombre, data.mensaje);
     client.broadcast.to(persona.sala).emit('crearMensaje',mensaje);

   });


   //Escuchar mensajes privados
   client.on('mensajePrivado', data=>{
    let persona = usuarios.getPersona(client.id);
    client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje( persona.nombre, data.mensaje));//enviar mensajePrivado con  client.broadcast.to().emit(), data.para es un para añadir un parametro se puede llamar como queramo ese parametro

   })

    


  //Desconexion
   client.on('disconnect',()=>{
    let personaBorrada = usuarios.borrarPersona(client.id);

    //llamamos al evento del servidor crear mensaje donde le pasamos las propiedades de usuario y administrador
    client.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('Administrador',` ${personaBorrada.nombre} salio`));

    client.broadcast.to(personaBorrada.sala).emit('listaPersona',usuarios.getPersonasPorSala(personaBorrada.sala));


   })


   
});




  

});