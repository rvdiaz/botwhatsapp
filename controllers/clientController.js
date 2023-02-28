const express=require('express');
const {Cliente}=require('../models/Cliente');

const SearchClient=async(tel)=>{
    let client=await Cliente.findOne({tel});
    return client;
}

const SaveClient=async(tel)=>{
      const body={
        tel:tel,
        lastForm:"",
        language:"",
        email:"",
        name:""
      }
      let client=new Cliente(body);
      try {
        await client.save();
        return "cliente registrado";
      } catch (error) {
        console.log(error); 
    }
}
const UpdatedLastForm=async(tel,idForm)=>{
    let client=await Cliente.findOne({tel});
    const body={
        lastForm:idForm,
      }
    const updatedElement= await Cliente.findByIdAndUpdate(client._id,body,{new:false});
}

const getLastForm=async(tel)=>{
  let {lastForm}=await Cliente.findOne({tel});
  return lastForm;
}

const UpdatedLanguage=async(tel,langu)=>{
    let client=await Cliente.findOne({tel});
    const body={
        language:langu
      }
    const updatedElement= await Cliente.findByIdAndUpdate(client._id,body,{new:false});
}

const UpdatedByEtiqueta=async(tel,etiqueta,sms)=>{
  let client=await Cliente.findOne({tel});
  const body={
      [etiqueta]:sms
    }
  const updatedElement= await Cliente.findByIdAndUpdate(client._id,body,{new:false});
}
module.exports={
    SearchClient,
    SaveClient,
    UpdatedLastForm,
    getLastForm,
    UpdatedLanguage,
    UpdatedByEtiqueta
}