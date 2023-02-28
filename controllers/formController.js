const express=require('express');
const { textAnswer } = require('../helpers/answersSenders/textAnswer');
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
const FirstForm=async(req)=>{
    const form=await Cuestionario.findOne({etiqueta:'language'});
    SendForm(form,req);
}

const SendForm=async(form,req)=>{
    switch (form.type) {
        case 'text':
            return await textAnswer(form,req);
            break;
    
        default:
            break;
    }
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
const RegisterName=async(language)=>{
    const {_id,textoInicio,mainText}=await Cuestionario.findOne({etiqueta:'name'});
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
const GetFormQuestionsById=async(id,language)=>{
    const cuestionario=await Cuestionario.findById(id);
    const questions=await SearchQuestionsByForm(id,language);
    const aux=makeQuestions(questions,language,cuestionario.etiqueta);
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
const GetForm=async(id)=>{
    const form=await Cuestionario.findById(id);
    return form;
}

module.exports={
    CreateForm,
    SearchForm,
    FirstForm,
    InicioForm,
    GetFormQuestionsById,
    RegisterName,
    GetForm
}