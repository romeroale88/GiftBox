const mongoose = require("mongoose");
const regaloSchema= new mongoose.Schema({
    usado:{type:Boolean,default:false},
    nombreEnviador: String,
    cuentaDestinatario: String,
    paquetesId:[{
        paqueteId:{type: mongoose.Schema.ObjectId , ref: "paquete"},
        cantidad:Number
    }]
})

const Regalo= mongoose.model("regalo",regaloSchema);

module.exports= Regalo;