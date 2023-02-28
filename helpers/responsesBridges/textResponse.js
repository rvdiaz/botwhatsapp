const textResponse=(response)=>{
    const clientNumber=response.from;
    getLastForm(clientNumber);
    
} 

module.exports={
    textResponse
}