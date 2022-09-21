const mongoose=require('mongoose');

const dbConnection=async ()=>{
    try {
        mongoose.connect(process.env.url_basedatos, {useFindAndModify: false,useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
        console.log("conexion con BD lista");
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    dbConnection
}

