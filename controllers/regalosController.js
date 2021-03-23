const nodemailer = require('nodemailer')
const Paquete= require("../models/Paquete");
const Regalo = require('../models/Regalo');
const regalosController ={
    
enviarRegalo: async (req, res) => {

    console.log(req.body)
    const {email,carrito,paquetesId}=req.body;
    const {cuenta,nombre,apellido}=req.user;

    const nuevoRegalo=new Regalo({
        nombreEnviador:cuenta,
        cuentaDestinatario:(email.emailDestinatario==="") ? cuenta : email.emailDestinatario ,
        paquetesId
    })

    nuevoRegalo.save()
    .then(nuevoRegalo => {
        console.log("todo bien1")
        var transport = nodemailer.createTransport({
            port: 465,
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })  
        var mailOptions = {
            from: `GIFTBOX de ${cuenta}`,
            to: nuevoRegalo.cuentaDestinatario,
            subject: (email.asunto==="")?"GIFTBOX": email.asunto,
            html:  
            `<div style="text-align:center; padding:20px; min-heigth: 250px; background-color:#fff">
            <h1 style="color:#FFB5FF">Anda a abrirlo ahora !</h1>
            ${email.deMensaje!==undefined ? `<h1 style="color:#FFB5FF">Recibiste un regalo de parte de ${email.deMensaje} </h1>` : `<h1 style="color:#FFB5FF">Recibiste un regalo de parte de ${nombre+apellido}</h1>` }
            ${email.paraMensaje!==undefined ? `<h2>para: ${email.paraMensaje} </h2>`: "" }
            ${email.mensaje!==undefined ? `<h2> ${email.mensaje} </h2>`: ""}
            ${carrito.map(paquete=>`<h1>${paquete.nombre} x ${paquete.cantidad}</h1>`)}
            <h1>CODIGO: ${nuevoRegalo._id}</h1>
            <link href="https://giftbox-app.herokuapp.com/"><button style="padding:20px; text-decoration:none" >https://giftbox-app.herokuapp.com/regalo</button></link>
            <h3 style="color:#FFB5FF">Si el link no te funciona, copia y pega este enlace en tu navegador https://giftbox-app.herokuapp.com/regalo </h3>
            <h5 style="color:#FFB5FF">GIFTBOX</h5>
            </div>`}
            transport.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log("22222222222222222222")
                console.log(error)
                res.status(500).send(error.message)
            }else {
                console.log("Email enviado.")
                res.status(200).json({respuesta:req.body})
            }})   

    })
        
    .catch(error => { 
        console.log("TODO MAAAAAAAAAAAAAAAAAAAAAAL")
        return res.json({ success: false, error: "Error al cargar el regalo" }) })

    },
    todosLosRegalos: (req,res)=>{
        Regalo.find()
        .then(data=>{return res.json({success:true, response:data})})
        .catch(error=>{return res.json({success:false, response:"Error al obtener los regalos"})})
    },
    unRegalo: async(req,res)=>{
        
        Regalo.findOne(req.params).populate("paquetesId.paqueteId")
        .then(data=>{return res.json({success:true, response:data})})
        .catch(error=>{return res.json({success:false, response:"Error al obtener el regalo"})})
        const response = await Regalo.findOneAndUpdate({ _id: req.params._id },{$set: {'usado': true}},{new: true })
    },


}
module.exports= regalosController;