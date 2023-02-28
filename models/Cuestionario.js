const {model,Schema}=require('mongoose');

const cuestionario=Schema({
    textoInicio:{
        type:String,
        required:false
    },
    mainText:{
        type:String,
        required:false
    },
    etiqueta:{
        type:String,
        required:false
    },
    form:{
        type:Boolean,
        required:false
    }
})

const Cuestionario=model('cuestionario',cuestionario)
module.exports={Cuestionario};