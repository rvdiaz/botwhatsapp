const express=require('express');
const { makeQuestions,languageQuestions } = require('../helpers/questions');
const {Cuestionario}=require('../models/Cuestionario');
const {SearchQuestionsByForm}=require('./questionController');

const CreateForm=async(req,res=express.response)=>{
    const form=new Cuestionario(req.body);
    try {
        await form.save();
        return res.json({
            'ok':true,
            'sms':'cuestionario creado'
        })
    } catch (error) {
        console.log(error);
    }
}

const SearchForm=async(req,res=express.response)=>{
    const id=req.params.id;
    const form=await Cuestionario.findById(id);
    return res.json({
        'ok':false,
        'form':form
    })
}
const PrimerForm=async(language)=>{
    const {_id,textoInicio}=await Cuestionario.findOne({etiqueta:'welcome'});
    const questions=await SearchQuestionsByForm(_id,language);
    const aux=languageQuestions(questions);
    return {
        titulo:textoInicio,
        preguntas:aux,
        lastForm:_id
    };
}

const InicioForm=async(language)=>{
    const {_id,textoInicio,mainText}=await Cuestionario.findOne({etiqueta:'inicio'});
    const questions=await SearchQuestionsByForm(_id,language);
    const aux=makeQuestions(questions,language);
    let titulo;
    if(language=="es")
    titulo=textoInicio;
    else
    titulo=mainText;
    return {
        titulo:titulo,
        preguntas:aux,
        lastForm:_id
    };
}
const getFormQuestionsById=async(id,language)=>{
    const cuestionario=await Cuestionario.findById(id);
    const questions=await SearchQuestionsByForm(id,language);
    const aux=makeQuestions(questions,language);
    let titulo="";
    if(cuestionario.textoInicio && cuestionario.mainText){
        if(language=="es")
            titulo=cuestionario.textoInicio;
        else
            titulo=cuestionario.mainText;
    }
    return {
        titulo:titulo,
        preguntas:aux,
        lastForm:id
    };

}

module.exports={
    CreateForm,
    SearchForm,
    PrimerForm,
    InicioForm,
    getFormQuestionsById
}