const { response, request } = require('express');

const Usuario = require('../models/usuario');

const getUsuarios = (req = request, res = response) => {
    res.json({
        msg: 'get Api - Controlador Usuario'
    })
}

const postUsuario = async(req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, correo, password, rol });

    await usuarioGuardadoDB.save();

    res.json({
        msg: 'get Api - Usuario (POST)',
        usuarioGuardadoDB
    })
}

const putUsuario = (req = request, res = response) => {

    const { id } = req.params;
    res.json({
        msg: 'PUT editar user',
        id
    })
}

const deleteUsuario = (req = request, res = response) => {
    res.json({
        msg: 'get Api - Controlador Usuario (DELETE)'
    })
}


module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}