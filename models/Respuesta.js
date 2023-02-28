const {Schema,model}=require('mongoose');

const respuesta = Schema({
    type:{
        type:String,
        required:true
    },
    idForm:{
        type:String,
        required:false
    },
    idAction:{
        type:String,
        required:false
    },
    idRef:{
        type:String,
        required:false
    }
})

const Respuesta=model('respuesta',respuesta);
module.exports={Respuesta};