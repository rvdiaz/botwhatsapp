const {Hoja}=require("../models/Hoja");

const getLeafById=async(id)=>{
    const leaf=await Hoja.findById(id);
    return leaf;
}
const getLeafArrayByAnswer=async(idAnswer)=>{
    const leaf=await Hoja.find({idAnswer:idAnswer.toString()});
    return leaf;
}
module.exports={
    getLeafById,
    getLeafArrayByAnswer
}