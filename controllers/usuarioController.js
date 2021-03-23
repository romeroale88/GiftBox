const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')

const usuarioController = {
    eliminarUsuario: async(req, res) =>{
        await Usuario.findOneAndDelete(req.params)
        .then(()=>{return res.json({success: true, response:'Usuario Borrado'})})
        .catch(error =>{return res.json({success:false, response: 'Error al eliminar usuario'})})
    },
    unUsuario: async (req,res) =>{
        await Usuario.find(req.params) 
        .then(unUsuario => res.json({success:true, response:unUsuario})) 
        .catch(errors => res.json({succes:false, errors}))
    },
    login: async (req,res)=>{
        var errors=[]
        const {cuenta,password}=req.body;
        const usuarioExistente = await Usuario.findOne({cuenta});
        if(!usuarioExistente){errors.push("Cuenta o contraseña incorrecta")}
        else if (usuarioExistente){
            const passwordMatches= bcryptjs.compareSync(password,usuarioExistente.password);
            if(!passwordMatches){errors.push("Cuenta o contraseña incorrecta");}
            var token=jsonWebToken.sign({...usuarioExistente},process.env.JWT_SECRET_KEY,{});
        }
        return res.json({
            success: errors.length===0? true:false,
            errors: errors,
            response: errors.length===0 && {token,id: usuarioExistente._id, nombre:usuarioExistente.nombre,
                apellido:usuarioExistente.apellido,imagen:usuarioExistente.imagen,rol:usuarioExistente.rol
                ,googleUser:usuarioExistente.googleUser}
            })
    },
    editarUsuarioPass: async(req,res) =>{
        var errors=[]

        const {password, passwordVerificado}=req.body
        const id= req.params._id
        var passwordHasheado = bcryptjs.hashSync(password, 10)

        var usuarioExistente = await Usuario.findOne({_id:id});
            if (usuarioExistente){
            var passwordMatches= bcryptjs.compareSync(passwordVerificado,usuarioExistente.password);
            if(!passwordMatches){errors.push("Contraseña incorrecta, intente nuevamente");}
            else{
                usuarioExistente = await Usuario.findOneAndUpdate({_id:id},
                    {'$set':{password:passwordHasheado}},
                    {new:true})
            }
            //var token=jsonWebToken.sign({...usuarioExistente},process.env.JWT_SECRET_KEY,{});
        }else{
            errors.push("Usuario no existente")
        }
        return res.json({
            success: errors.length===0? true:false,
            errors: errors,
            response: errors.length===0 && {id: usuarioExistente._id, nombre:usuarioExistente.nombre,
                apellido:usuarioExistente.apellido,imagen:usuarioExistente.imagen,rol:usuarioExistente.rol
                ,googleUser:usuarioExistente.googleUser}
        }) 
    },


    cambiarPassword: async(req,res) =>{
        var errors=[]


        const {password, cuenta}=req.body

        const passwordHasheado = bcryptjs.hashSync(password, 10)
        const usuarioExistente = await Usuario.findOneAndUpdate({cuenta:cuenta},
            {'$set':{password:passwordHasheado}},
            {new:true})

        if(!usuarioExistente){errors.push("Cuenta o contraseña incorrecta")}
        else if (usuarioExistente){
            const passwordMatches= bcryptjs.compareSync(password,usuarioExistente.password);
        if(!passwordMatches){errors.push("Cuenta o contraseña incorrecta")}
        return res.json({
            success: errors.length===0? true:false,
            errors: errors,
            response: errors.length===0 && {password:usuarioExistente.password}
        })
    }},

    editarUsuarioImg: async(req,res) =>{
        var errors=[]

        const {imgFile}= req.files
        const id= req.params._id
        const imgTipo= imgFile.name.split(".").slice(-1).join(" ")
        const imagenName= imgFile.name.split(".").slice(0,-1)
        
        var imgName = `${imagenName[0]}.${imgTipo}`

        const usuarioExistente = await Usuario.findOneAndUpdate({_id:id},
            {'$set':{imagen:imgName}},
            {new:true}
        )

        return res.json({
            success: errors.length===0? true:false,
            errors: errors,
            response: errors.length===0 && {imagen:usuarioExistente.imagen}
        })
    },
    agregarUsuario: async (req,res)=>{
        var errors=[];

        
        const {cuenta,password,nombre,apellido,rol,googleUser,productosFaveados,productosComprados,googlePic}=req.body;
        const usuarioExiste = await Usuario.findOne({cuenta})
        if(usuarioExiste){errors.push("El usuario ya existe. Eliga otro por favor!")
        }else{
            const hashedPassword =  bcryptjs.hashSync(password, 10)
            var nuevoUsuario= new Usuario({cuenta,password:hashedPassword,nombre,apellido,rol,googleUser,productosFaveados,productosComprados})

            if(googleUser==="false"){
                const {imgFile}= req.files;
                
                const imgTipo= imgFile.name.split(".").slice(-1).join(" ");

                var imgName= `${nuevoUsuario._id}.${imgTipo}`
                var imgPath= `${__dirname}/../frontend/public/usuarioImg/${nuevoUsuario._id}.${imgTipo}`
                
                await imgFile.mv(imgPath,error=>{
                    if(error){
                        errors.push(error)}
                        else{
                            
                        }})
                nuevoUsuario.imagen = imgName;
            }
            else{
                
                nuevoUsuario.imagen = req.body.imgFile
            }
            }
            if(errors.length===0){
                const nuevoUsuarioGuardado = await nuevoUsuario.save()
                var token= jsonWebToken.sign({...nuevoUsuarioGuardado},process.env.JWT_SECRET_KEY,{})
            }        
            return res.json({
                success: errors.length===0 ? true : false,
                errors: errors,
                response: errors.length===0 && {token,id: nuevoUsuario._id, nombre,apellido,imagen:nuevoUsuario.imagen,rol,googleUser,rol}
        })

    },  
    todosLosUsuarios : (req, res)=>{
        Usuario.find()
        .then(usuarios =>{
            return res.json({success: true, response:usuarios})
        })
        .catch(error =>{
            return res.json({success:false, response:error})
        })
    },

    logFromLS: (req, res) => {
        res.json({success: true,
          response: {
            token: req.body.token,
            nombre: req.user.nombre,
            imagen: req.user.imagen,
            googleUser: req.user.googleUser,
            id: req.user.id,
            rol: req.user.rol
          },
        });
      },
}
module.exports= usuarioController;