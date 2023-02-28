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
    sendEmail:{
        type:Boolean,
        required:false
    },
    emailDestination:{
        type:String,
        required:false
    },
    emailSubject:{
        type:String,
        required:false
    },
    emailText:{
        type:String,
        required:false
    },
    answerRef:{
        type:String,
        required:false
    }
})

const Hoja=model('hoja',hoja);
module.exports={Hoja};