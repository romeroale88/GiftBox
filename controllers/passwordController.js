const nodemailer = require('nodemailer')
const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')


  const passwordController = {

  resetearPassword: async (req, res) => {
    var errors = []
    const {cuenta} = req.body
    console.log(req.body)
    const emailValido = await Usuario.findOne({cuenta: cuenta})
    console.log(emailValido)
  
    if (!emailValido) {
        errors.push('El mail no coincide con nuestros registros')
        console.log("Llego!")
    }else{
        var transport = nodemailer.createTransport({
            port: 465,
            host: 'smtp.gmail.com',
            auth: {
                user: "grupoamindhub@gmail.com",
                pass: "grupoA1234"
            },
            tls: {
                rejectUnauthorized: false
            }
          })
          
        var email = emailValido.cuenta
        
        
        var mailOptions = {
            from: 'Gift BOX <grupoamindhub@gmail.com>',
            to: email,
            subject: 'Sistema de recuperar contraseña',
            html:  `<div style="text-align:center; padding:20px; min-heigth: 250px; background-color:white">
            <h1 style="color:#FF2A2A"> ¡Que despistado/a sos!!</h1>
            <h1 style="color:#FF2A2A">¡No importa! ¡Nosotros te ayudaremos! ¡A continuación haga clic debajo para cambiar su contraseña! </h1>
            <link href="https://giftbox-app.herokuapp.com/api/user/resetear-password/${email}">   
            <button style="padding:20px; background-color:#FF2A2A"><a  href="https://giftbox-app.herokuapp.com/cambiar-password">¡Recupera tu contraseña!</a></button></link>
            <h3 style="color:#FF2A2A">¡¡Si el botón no funciona, copie y pegue el siguiente enlace en su navegador!! https://giftbox-app.herokuapp.com/cambiar-password </h3>
            <h5 style="color:#FF2A2A">Si usted no solicitó un cambio de contraseña, por favor, ignore este correo electrónico :)</h5>
        </div>`
 
            
        
        }
        transport.sendMail(mailOptions, (error, info) =>{
            if(error){
                res.status(500).send(error.message)
               
            }else {
                console.log("Email enviado.")
                res.status(200).json({respuesta:req.body})
            }
        })
        
    }

   /*  return res.json({
        success: errors.length===0? true:false,
        errors: errors
        
    }) */
  }
}

module.exports = passwordController;

