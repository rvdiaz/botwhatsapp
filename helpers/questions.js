const e = require("express");

const makeQuestions=(questions,language)=>{
    let aux="";
    let cont;
    if(questions)
    questions.map((item,index)=>{
        cont=index+1;
        if(!item.quitar_numeracion)
        {
        if(language=='es')
        aux=aux+cont+". "+item.titulo+" \n";
        else
        aux=aux+cont+". "+item.title+" \n";
        }
        else
        if(language=='es')
        aux=aux+""+item.titulo+" \n";  
        else
        aux=aux+""+item.title+" \n"; 
    })
    return aux;
}

const languageQuestions=(questions)=>{
    let aux="";
    questions.map((item)=>{
        aux=aux+item.titulo+"\n";
    })
    return aux;
}
module.exports={
    makeQuestions,
    languageQuestions
}