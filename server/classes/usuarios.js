
class Usuarios {

    constructor(){
        this.personas =[];
    }

    //Metodos
    agregarPersona(id, nombre, sala){
        
        //creamos nuestro objeto con los datos que recibimos directamente
        let persona = {
            id,
            nombre,
            sala

        }

        //Agregamos a la  persona al array de personas
        this.personas.push(persona);

        //devolvemos el array de personas
        return this.personas;
    }



    // obtener persona 
    getPersona(id){
        //extraemos el primer elemento que coincida con el id
        let persona = this.personas.filter( persona => persona.id === id)[0]; 
        return persona;
    }

    //Obtener personas
    getPersonas(){
        return this.personas;
    }

    //obtener Salas
    getPersonasPorSala(sala){
        let personaEnsala = this.personas.filter(persona =>persona.sala === sala);
        return personaEnsala;
    }


    borrarPersona(id){

        // no perder la referencia 
        let personaBorrada = this.getPersona(id)
       this.personas =  this.personas.filter(persona => persona.id != id);

      
       return personaBorrada;

    }


    
}


module.exports = {
    Usuarios
}