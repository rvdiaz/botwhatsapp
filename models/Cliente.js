const {Schema,model}=require('mongoose');

const cliente = Schema({
    tel:{
        type:String,
        required:true
    },
    lastForm:{
        type:String,
        required:false
    },
    language:{
        type:String,
        required:false
    }
})

const Cliente=model('cliente',cliente);
module.exports={Cliente};