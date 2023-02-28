/* const listenMessage=()=>{
    bot.on('message',(msg)=>{
        const {from, to, body}=msg;

        /* para comprobar si el numero es valido */
       /*  if(!isValidNumber(from)){
            return;
        } */

         /* Este bug lo reporto Lucas Aldeco Brescia para evitar que se publiquen estados */
       /*  if (from === 'status@broadcast') {
            return;
        }  
        message = body.toLowerCase();
        const number = cleanNumber(from);      
        let language;
        SearchClient(number)
        .then(response=>{
            if(response){
                language=response.language;
                if(message==="es"||message==="us"){
                    switch (message) {
                        case "us":{
                            if(response.name){                         
                                InicioForm("us")
                                .then(res=>{
                                bot.sendMessage(number,res.titulo+"\n"+res.preguntas);
                                UpdatedLastForm(number,res.lastForm);
                            });
                        }else{
                        RegisterName("us")
                        .then(res=>{
                            bot.sendMessage(number,res.titulo+"\n"+res.preguntas);
                            UpdatedLastForm(number,res.lastForm);
                        });
                    }}
                            break;
                            case "es":{
                                if(response.name){
                                InicioForm("es")
                                .then(res=>{
                                bot.sendMessage(number,res.titulo+"\n"+res.preguntas);
                                UpdatedLastForm(number,res.lastForm);
                            });
                            }else{
                                RegisterName('es')
                                .then(res=>{
                                    bot.sendMessage(number,res.titulo+"\n"+res.preguntas);
                                    UpdatedLastForm(number,res.lastForm);
                                });
                            }
                        }
                            break;
                    }
                    UpdatedLanguage(number,message);     
                }
                else{
                    if(message=="inicio" || message=="start"){
                        InicioForm(language)
                        .then(res=>{
                       bot.sendMessage(number,res.titulo+"\n"+res.preguntas); 
                        /* MessageMedia.fromUrl("https://i.giphy.com/media/5J5gN0WUk0VToHaK2p/giphy-downsized.gif")
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
                                    const idAnswer=res[numRespuesta-1]?.idRespuesta;
                                        if(idAnswer){
                                            switch (res[numRespuesta-1]?.tipoRespuesta) {
                                                case "formulario":
                                                    GetFormQuestionsById(idAnswer,language)
                                                    .then(nextForm=>{
                                                    bot.sendMessage(number,nextForm.titulo+"\n"+nextForm.preguntas);
                                                    UpdatedLastForm(number,nextForm.lastForm);
                                                })
                                                break;
                                                case "hoja":
                                                    getLeafById(idAnswer)
                                                    .then(leaf=>{
                                                        if(leaf.media){
                                                            MessageMedia.fromUrl(leaf.media)
                                                            .then((r)=>{
                                                            bot.sendMessage(number,r);
                                                        })                                                     
                                                        }
                                                        setTimeout(() => {
                                                        if(leaf.text){
                                                            if(language=="es")
                                                                bot.sendMessage(number,leaf.texto);
                                                            else
                                                                bot.sendMessage(number,leaf.text);
                                                        }
                                                        if(leaf.link){
                                                            bot.sendMessage(number,leaf.link);
                                                        }
                                                        if(leaf.sendEmail){
                                                            sendEmail({
                                                                from: 'rvaldez@305plasticsurgery.com',
                                                                to: leaf.emailDestination,
                                                                subject: leaf.emailSubject,
                                                                text: leaf.emailText
                                                            })
                                                        }
                                                        if(language=="es")
                                                            bot.sendMessage(number,'Escriba "Inicio" si desea ir al Menu Principal');
                                                        else        
                                                            bot.sendMessage(number,'Write "Start" if you want to go to MainMenu');
                                                        }, 1000);                                    
                                                })
                                                break;
                                                default:
                                                    break;
                                            }                                      
                                        }
                                    }
                                })
                            })
                        }
                    else{
                        getLastForm(number) 
                        .then(idRef=>{
                            GetForm(idRef)
                            .then(resForm=>{   
                                if(resForm.form){
                                    console.log(resForm);
                                    UpdatedByEtiqueta(number,resForm.etiqueta,message);
                                    SearchQuestionsByForm(idRef)
                                    .then(res=>{
                                        console.log(res);
                                        if(res){
                                            const idAnswer=res[0]?.idRespuesta;
                                            if(idAnswer){
                                                switch (res[0]?.tipoRespuesta) {
                                                    case "formulario":
                                                        GetFormQuestionsById(idAnswer,language)
                                                        .then(nextForm=>{
                                                            
                                                        bot.sendMessage(number,nextForm.titulo+"\n"+nextForm.preguntas);
                                                        UpdatedLastForm(number,nextForm.lastForm);
                                                    })
                                                    break;
                                                    case "hoja":
                                                        getLeafById(idAnswer)
                                                        .then(leaf=>{
                                                            if(leaf.media){
                                                                MessageMedia.fromUrl(leaf.media)
                                                                .then((r)=>{
                                                                bot.sendMessage(number,r);
                                                            })
                                                            }
                                                            if(leaf.text){
                                                                if(language=="es")
                                                                    bot.sendMessage(number,leaf.texto);
                                                                else
                                                                    bot.sendMessage(number,leaf.text);
                                                            }
                                                            if(leaf.link){
                                                                bot.sendMessage(number,leaf.link);
                                                            }
                                                            if(leaf.sendEmail){
                                                                sendEmail({
                                                                    from: 'rvaldez@305plasticsurgery.com',
                                                                    to: leaf.emailDestination,
                                                                    subject: leaf.emailSubject,
                                                                    text: leaf.emailText
                                                                })
                                                            }
                                                            if(language=="es")
                                                                bot.sendMessage(number,'Escriba "Inicio" si desea ir al Menu Principal');
                                                            else
                                                            bot.sendMessage(number,'Write "Start" if you want to go to MainMenu');
                                                    })
                                                    break;
                                                    default:
                                                        break;
                                                }                                      
                                            }
                                        }
                                    })
                                }
                            })
                        });    
                    }
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
} */