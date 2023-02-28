const { Client,MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const {SearchClient,SaveClient,UpdatedLastForm,UpdatedLanguage,getLastForm,UpdatedByEtiqueta}=require('./controllers/clientController');
const {createBot,updatedBotInitStatus,updatedBotAuthStatus}=require('./controllers/botController');
const {PrimerForm,InicioForm,GetFormQuestionsById,RegisterName,GetForm}=require('./controllers/formController');
const {SearchQuestionsByForm}=require('./controllers/questionController');
const {isValidNumber,cleanNumber}= require('./controllers/handle');
const {getAnswerById}=require('./controllers/answerController');
const {getLeafById,getLeafArrayByAnswer}=require('./controllers/leafController');
const {sendEmail}=require('./email/transporter');

//para usar las variables de entorno
require('dotenv').config();
const cors= require('cors');

//para importar express
const express= require('express');

//Para llamar a la base de datos
const {dbConnection}=require('./db/config');
let port=process.env.PORT || 3000;

//Crear el servidor de express
const app=express();

//cors
app.use(cors());

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body desde el frontend
app.use(express.json());  

app.use('/305bot', require('./routes/usertext'));

app.use('/',(req,res)=>{
    res.send("hello world");
});


if (process.env.DATABASE === 'mongo') {
    //base de datos
   // dbConnection();
}

//Escuchar peticiones
app.listen(port,()=>{
    console.log(`servidor corriendo en puerto ${port}`);
})

//El process.env.port es una variable de entorno que creo en el archivo .env y que se llama port y asume el puerto 4000

app.get("/305bot", (req, res) => {
    /**
     * UPDATE YOUR VERIFY TOKEN
     *This will be the Verify Token value when you set up webhook
    **/
    const verify_token = process.env.VERIFY_TOKEN;
  
    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
  
    // Check if a token and mode were sent
    if (mode && token) {
      // Check the mode and token sent are correct
      if (mode === "subscribe" && token === verify_token) {
        // Respond with 200 OK and challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  });