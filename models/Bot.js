const {Schema,model}=require('mongoose');

const bot = Schema({
    qr:{
        type:String,
        required:false
    },
    initialStatus:{
        type:Boolean,
        required:false
    },
    authStatus:{
        type:Boolean,
        required:false
    }
})
const Bot=model('bot',bot);

module.exports={Bot};

