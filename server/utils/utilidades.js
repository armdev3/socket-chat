

const crearMensaje = (nombre, mensaje)=>{
    return{
        nombre,
        mensaje,
        fecha: new Date().getTime()//obtenemos la fecha y la hora
    }

}

module.exports = {crearMensaje}