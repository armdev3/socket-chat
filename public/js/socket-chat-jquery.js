//Recibimos los parametros
 let  parametros = new URLSearchParams(window.location.search);

let nombre = parametros.get('nombre');
let sala = parametros.get('sala');


 //Referencias de JQuery
 let divUsuarios = $('#divUsuarios');
 let formEnviar = $('#formEnviar');
 let txtMensaje = $('#txtMensaje');
 let divChatbox = $('#divChatbox');



//funciones para renderizar usuarios
function renderizarUsuarios(personas){
   

    let html =  ` <li><a href="javascript:void(0)" class="active"> Chat de <span> ${sala}</span></a></li>`;

    personas.forEach(persona => {
        html += `
            <li>
                <a href="javascript:void(0)" data-id="${persona.id}">
                    <img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> 
                    <span>${persona.nombre} <small class="text-success">online</small></span>
                </a>
            </li>
        `;
    });


    //renderizamos el html
    divUsuarios.html(html); 


    


}//fin funcion 


//eventos
divUsuarios.on('click', 'a', function(){
    let id = $(this).data('id');

    if(id){
         console.log(id);

    }

})




function renderizarMensajes(mensaje, yo){

    let html='';
    let  fecha = new Date(mensaje.fecha);
    let hora = `${fecha.getHours()} : ${fecha.getMinutes()}`;
    
    let adminClass = 'info';
    if(mensaje.nombre ==='Administrador'){
      adminClass = 'danger';

    }

 

    


 if(!yo){
 
  html +=`<li class="reverse">
     <div class="chat-content">
        <h5>${mensaje.nombre}</h5>
        <div class="box bg-light-inverse">${mensaje.mensaje}</div>
        </div>
        <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
     <div class="chat-time">${hora}</div>
    </li>`;
    
       
           

    }else{
      
   html += ` <li class="animated fadeIn">
                
                 <div class="chat-img">${mensaje.nombre !== 'Administrador' ?'<img src="assets/images/users/1.jpg" alt="user" />':''} </div>
                 <div class="chat-content">
                 <h5>${mensaje.nombre}</h5>
                 <div class="box bg-light-danger">${mensaje.mensaje}</div>
                </div>
                <div class="chat-time">${hora}</div>
                </li>
                `;

      
  
        

    }



     divChatbox.append(html);

}


function scrollBottom() {

    // selectors
    let newMessage = divChatbox.children('li:last-child');

    // heights
    let clientHeight = divChatbox.prop('clientHeight');
    let scrollTop = divChatbox.prop('scrollTop');
    let scrollHeight = divChatbox.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}






formEnviar.on('submit', function (e){
    e.preventDefault();


    //si no hay mensaje que no se ejecute
    if(txtMensaje.val().trim().length === 0){
        return;
    }


    // Enviar información
socket.emit('crearMensaje', {
    nombre,
    mensaje: txtMensaje.val().trim()
}, function(mensaje) {
   txtMensaje.val('').focus()
   renderizarMensajes(mensaje, true);
   scrollBottom();
});
   
})







