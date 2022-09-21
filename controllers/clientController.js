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
        language:""
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
        _id:client._id,
        tel:tel,
        lastForm:idForm
      }
    const updatedElement= await Cliente.findByIdAndUpdate(client._id,body,{new:true});
}

const getLastForm=async(tel)=>{
  let {lastForm}=await Cliente.findOne({tel});
  return lastForm;
}

const UpdatedLanguage=async(tel,langu)=>{
    let client=await Cliente.findOne({tel});
    const body={
        _id:client._id,
        tel:tel,
        lastForm:client.lastForm,
        language:langu
      }
    const updatedElement= await Cliente.findByIdAndUpdate(client._id,body,{new:true});
}
module.exports={
    SearchClient,
    SaveClient,
    UpdatedLastForm,
    getLastForm,
    UpdatedLanguage
}