const {Schema,model}=require('mongoose');

const pregunta = Schema({
    title:{
        type:String,
        required:true
    },
    titulo:{
        type:String,
        required:true
    },
    idRespuesta:{
        type:String,
        required:false
    },
    cuestionario:{
        type:String,
        required:false
    },
    quitar_numeracion:{
        type:Boolean,
        required:false
    },
    tipoRespuesta:{
        type:String,
        required:false
    }
})
const Pregunta=model('pregunta',pregunta);

module.exports={Pregunta};