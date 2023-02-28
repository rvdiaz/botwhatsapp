const { default: axios } = require("axios")

const textAnswer=async(form,req)=>{
    const phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
    const from = req.body.entry[0].changes[0].value.messages[0].from; 
    axios({
        method: "POST", // Required, HTTP method, a string, e.g. POST, GET
        url:
          process.env.URL +
          phone_number_id +
          "/messages?access_token=" +
          process.env.WHATSAPP_TOKEN,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: { body: form.text },
        },
        headers: { "Content-Type": "application/json" },
      });
}

module.exports={
    textAnswer
}