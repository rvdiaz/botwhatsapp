const express=require('express');
const { textResponse } = require('../helpers/responsesBridges/textResponse');
const {Respuesta}=require('../models/Respuesta');
const { PrimerForm } = require('./formController');

const getAnswerById=async(id)=>{
    const answer=await Respuesta.findById(id);
    return answer;
}

const createResponse=async(req,res=express.response)=>{
    const data=req.body.entry[0].changes[0].value.messages[0].from;
    const client=await SearchClient(data);
    if(client){
    const type=data.type;
    switch (type) {
        case 'text':
            textResponse(req.body.entry[0].changes[0]);
            break;
        case 'button':
            
            break;
    
        default:
            break;
    }
} else 
    FirstForm(req);
}

module.exports={
    getAnswerById,
    createResponse
}

