const { Client,MessageMedia,LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const {SearchClient,SaveClient,UpdatedLastForm,UpdatedLanguage,getLastForm}=require('./controllers/clientController');
const {createBot,updatedBotInitStatus,updatedBotAuthStatus}=require('./controllers/botController');
const {PrimerForm,InicioForm,getFormQuestionsById}=require('./controllers/formController');
const {SearchQuestionsByForm}=require('./controllers/questionController');
const {isValidNumber,cleanNumber}= require('./controllers/handle');
const {getAnswerById}=require('./controllers/answerController');
const {getLeafById,getLeafArrayByAnswer}=require('./controllers/leafController');

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

app.use('/api/preguntas', require('./routes/questions'));
app.use('/api/cuestionario', require('./routes/cuestionario'));
app.use('/',(req,res)=>{
    res.send("hello world");
});

let bot = new Client({
    puppeteer: {
        args: ['--no-sandbox', "--disable-setuid-sandbox"]
      }
});

const listenMessage=()=>{
    bot.on('message',(msg)=>{
        const {from, to, body}=msg;

        /* para comprobar si el numero es valido */
        if(!isValidNumber(from)){
            return
        }

         /* Este bug lo reporto Lucas Aldeco Brescia para evitar que se publiquen estados */
        if (from === 'status@broadcast') {
            return
        } 

        message = body.toLowerCase();
        console.log('BODY',message);
        const number = cleanNumber(from);      
        let language;
        SearchClient(number)
        .then(response=>{
            if(response){
                language=response.language;
                if(message==="es"||message==="us"){
                    switch (message) {
                        case "us":{
                                InicioForm("us")
                                .then(res=>{
                                bot.sendMessage(number,res.titulo+"\n"+res.preguntas);
                                UpdatedLastForm(number,res.lastForm);
                            });}
                            break;
                            case "es":{
                                InicioForm("es")
                                .then(res=>{
                                bot.sendMessage(number,res.titulo+"\n"+res.preguntas);
                                UpdatedLastForm(number,res.lastForm);
                            });}
                            break;
                    }
                    UpdatedLanguage(number,message);     
                }
                else{
                    if(message=="inicio" || message=="start"){
                        InicioForm(language)
                        .then(res=>{
                       /*  bot.sendMessage(number,res.titulo+"\n"+res.preguntas); */
                        MessageMedia.fromUrl("https://i.giphy.com/media/5J5gN0WUk0VToHaK2p/giphy-downsized.gif")
                        .then((r)=>{
                            bot.sendMessage(number,r);
                        })
                        UpdatedLastForm(number,res.lastForm);
                        })}
                    else
                    if(!isNaN(message)){
                        const numRespuesta=parseInt(message);
                        getLastForm(number)
                        .then(idRef=>{
                            SearchQuestionsByForm(idRef)
                            .then(res=>{
                                if(res){
                                    getAnswerById(res[numRespuesta-1]?.idRespuesta)
                                    .then(answer=>{
                                        if(answer){
                                            switch (answer.type) {
                                                case "formulario":
                                                    getFormQuestionsById(answer.idRef,language)
                                                    .then(nextForm=>{
                                                    bot.sendMessage(number,nextForm.titulo+"\n"+nextForm.preguntas);
                                                    UpdatedLastForm(number,nextForm.lastForm);
                                                })
                                                break;
                                                case "hoja":
                                                    getLeafById(answer.idRef)
                                                    .then(leaf=>{
                                                        if(leaf.media){
                                                            MessageMedia.fromUrl(leaf.media)
                                                            .then((r)=>{
                                                            bot.sendMessage(number,r);
                                                        })
                                                    }
                                                        if(language=="es")
                                                            bot.sendMessage(number,leaf.link+"\n"+leaf.texto);
                                                        else
                                                            bot.sendMessage(number,leaf.link+"\n"+leaf.text);
                                                })
                                                break;
                                                case "lista_hojas":
                                                    getLeafArrayByAnswer(answer._id)
                                                    .then(leafs=>{
                                                        leafs.map((leaf)=>{
                                                            if(leaf.media){
                                                                setTimeout(() => {
                                                                    MessageMedia.fromUrl(leaf.media)
                                                                    .then((r)=>{
                                                                    bot.sendMessage(number,r)
                                                                    .then(()=>{
                                                                        if(language=="es")
                                                                            bot.sendMessage(number,leaf.link+"\n"+leaf.texto);
                                                                        else
                                                                            bot.sendMessage(number,leaf.link+"\n"+leaf.text);
                                                                    })
                                                                }, "200")
                                                            })
                                                            }else
                                                            if(language=="es")
                                                                bot.sendMessage(number,leaf.link+"\n"+leaf.texto);
                                                            else
                                                                bot.sendMessage(number,leaf.link+"\n"+leaf.text);
                                                            
                                                        })  
                                                })
                                                break;
                                                default:
                                                    break;
                                            }                                      
                                        }
                                    })
                                }
                            })
                        })
                    }else{
                        const arrayDate=message.split('/');
                        if(arrayDate.lenght==2 || arrayDate.lenght==3)
                            bot.sendMessage(number,"Error con el formato de fecha");
                        else{
                            try {
                                let date = new Date(parseInt(arrayDate[2]), parseInt(arrayDate[1]), parseInt(arrayDate[0])-1, parseInt(arrayDate[3].split(':')[0]), parseInt(arrayDate[3].split(':')[1]), 0);
                                console.log(date.getHours());  
                                console.log(date.getDay()); 
                            }
                             catch (error) {
                                console.log("error");
                            }
                    } }
            }
            }
            else{
                PrimerForm()
                .then(response=>{
                    bot.sendMessage(number,response.titulo+"\n"+response.preguntas);
                    UpdatedLastForm(number,response.lastForm);
                });
                SaveClient(number);   
            }
        })
        }
   )
}

bot.on('qr', qr =>{
    createBot(qr);
    console.log("QR activado");
    qrcode.generate(qr, {small:true});
});

bot.on('ready', () => {
    console.log("ready bot");
    listenMessage();
    updatedBotInitStatus(true); 
    // socketEvents.sendStatus(client)
});

bot.on('auth_failure', () => {
    console.log("se desconecto");
});

bot.on('authenticated', () => {
    console.log('AUTHENTICATED'); 
    updatedBotAuthStatus();
});
bot.on('disconnected',()=>{
    console.log("se piro");
});
bot.initialize();
/**
 * Verificamos si tienes un gesto de db
 */

if (process.env.DATABASE === 'mongo') {
    //base de datos
    dbConnection();
}

//Escuchar peticiones
app.listen(port,()=>{
    console.log(`servidor corriendo en puerto ${port}`);
})

//El process.env.port es una variable de entorno que creo en el archivo .env y que se llama port y asume el puerto 4000