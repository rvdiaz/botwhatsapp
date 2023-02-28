const express=require('express');
const {Bot}=require('../models/Bot');

const createBot=async(qr)=>{
    let bot=await Bot.find();
    if(!bot[0]){
        const body={
        qr:qr,
        initialStatus:false,
        authStatus:false
        }
        let bot=new Bot(body);
        try {
            await bot.save();
        } catch (error) {
            console.log(error);
        }
    }
    else{
        const newQr={
            _id:bot[0]._id,
            qr:qr,
            initialStatus:bot[0].initialStatus,
            authStatus:bot[0].authStatus
        }
        const updatedElement= await Bot.findByIdAndUpdate(bot[0]._id,newQr,{new:true});
    }

}

const updatedBotInitStatus=async()=>{
    const bot=await Bot.find();
    const newStatus={
        _id:bot[0]._id,
        qr:bot[0].qr,
        initialStatus:true,
        authStatus:bot[0].authStatus
    }
    const updatedElement= await Bot.findByIdAndUpdate(bot[0]._id,newStatus,{new:true});
}

const updatedBotAuthStatus=async(auth)=>{
    const bot=await Bot.find();
    const newStatus={
        authStatus:auth
    }
    const updatedElement= await Bot.findByIdAndUpdate(bot[0]._id,newStatus,{new:false});
}
module.exports={
   createBot,
   updatedBotInitStatus,
   updatedBotAuthStatus
}