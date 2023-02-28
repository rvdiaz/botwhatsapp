const express=require('express');
const {Pregunta}=require('../models/Pregunta');

const GetAnswerByQuestion=async(id)=>{
    const question=await Pregunta.findById(id);
}

const createQuestions=async(req, res=express.response)=>{
    try {
        const preg=new Pregunta(req.body);
        await preg.save();
        return res.json({
            'ok':true,
            'sms':'pregunta creada'
        })
    } catch (error) {
        console.log(error);
    }
}

const SearchQuestionsByForm=async(id)=>{
    const questions=await Pregunta.find({cuestionario:id.toString()});
    return questions;
}
module.exports={
    createQuestions,
    SearchQuestionsByForm
}