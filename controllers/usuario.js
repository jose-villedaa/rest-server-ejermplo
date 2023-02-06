const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

//Mostrar Usuario
const getUsuarios = async(req = request, res = response) => {
    
    //condiciones del get
    const query = {estado:true};

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ])
    
    res.json({
        msg: 'get Api - Controlador Usuario',
        listaUsuarios
    })
}

// Agregar Usuario
const postUsuario = async(req = request, res = response) => {
    //Desestructuracion
    const { nombre, correo, password, rol } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, correo, password, rol });

    //Encriptar Password
    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);


    await usuarioGuardadoDB.save();

    res.json({
        msg: 'get Api - Usuario (POST)',
        usuarioGuardadoDB
    })
}   

//Editar Usuario
const putUsuario = async(req = request, res = response) => {

    const { id } = req.params;
    const{ _id, img, rol, estado, google, ...resto } = req.body;
    const password = req.body;

    if(resto.password){
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(resto.password, salt);
    }
    
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto)


    res.json({
        msg: 'PUT editar user',
        id,
        usuarioEditado
    })
}

const deleteUsuario = async(req = request, res = response) => {
    //Req params para traer datos de las rutas
    const { id } = req.params;
    
    const usuarioEliminado = await Usuario.findByIdAndDelete(id)

    //Eliminar cambiando a estado falso
    //const usuarioEliminado = await Usuario.findByIdAndUpdate(id, {estado:false})


    res.json({
        msg: 'get Api - Controlador Usuario (DELETE)',
        usuarioEliminado

    })


}


module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}