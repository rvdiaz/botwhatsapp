const express=require('express');

const validateUserText=(req,res=express.response,next)=>{
    if (
        req.body.entry &&
        req.body.entry[0].changes &&
        req.body.entry[0].changes[0] &&
        req.body.entry[0].changes[0].value.messages &&
        req.body.entry[0].changes[0].value.messages[0]
      )
      next();
}

module.exports={
    validateUserText
}