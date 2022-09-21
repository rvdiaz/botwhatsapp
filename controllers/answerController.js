const express=require('express');
const {Respuesta}=require('../models/Respuesta');

const getAnswerById=async(id)=>{
    const answer=await Respuesta.findById(id);
    return answer;
}
module.exports={
    getAnswerById
}