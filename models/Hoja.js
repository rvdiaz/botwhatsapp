const {Schema,model}=require('mongoose');

const hoja = Schema({
    text:{
        type:String,
        required:false
    },
    texto:{
        type:String,
        required:false
    },
    link:{
        type:String,
        required:false
    },
    media:{
        type:String,
        required:false
    },
    idAnswer:{
        type:String,
        required:false
    }
})

const Hoja=model('hoja',hoja);
module.exports={Hoja};