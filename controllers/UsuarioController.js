const UsuarioModel = require("../models/UsuarioModel")
const jwt = require("jsonwebtoken");
const fs = require("fs")

exports.login = async (req, res, next) => {
    const usuario = req.body.usuario
    const clave = req.body.clave
    let datos = { status: 404, data: [] };
    const result = await UsuarioModel.login(usuario, clave)
    if (result.length > 0) {
        const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (300), id: result[0].id, tipo: 'usuario' }, "clave_secreta");
        datos = { status: 200, datos: result[0], token: token };
    }
    res.json(datos)
}

exports.getAll = async (req, res, next) => {
    let buscar = req.query.buscar
    let datos = { status: 404, datos: [] }
    const result = await UsuarioModel.getAll(buscar)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.insert = async (req, res, next) => {
    const nombre = req.body.nombre
    const usuario = req.body.usuario
    const clave = req.body.clave
    const id_rol = req.body.id_rol
    const foto = req.body.foto
    const modificado = req.body.modificado
    let datos = { status: 404, datos: [] }
    const result = await UsuarioModel.add(nombre, usuario, clave, id_rol)
    if (result.affectedRows > 0) {
        const data = {
            id_usuario: result.insertId,
            nombre: nombre,
            usuario: usuario,
            clave: clave,
            id_rol: id_rol
        }
        let archivo = __dirname.replace("controllers", "public/img/usuarios/0.jpg");
        let ruta = __dirname.replace("controllers", "public/img/usuarios/");
        ruta = ruta + result.insertId + ".jpg";
        if (modificado) {
            const base64Data = foto.replace(/^data:image\/jpeg;base64,/, "");
            fs.writeFile(ruta, base64Data, "base64", function (err) {
                console.log("SUBIR ERROR--->" + err);
            });
        } else {
            fs.copyFile(archivo, ruta, (err) => {
                console.log("COPIAR ERROR--->" + err);
            });
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.update = async (req, res, next) => {
    const nombre = req.body.nombre
    const usuario = req.body.usuario
    const clave = req.body.clave
    const id_rol = req.body.id_rol
    const id_usuario = req.params.id
    const foto = req.body.foto
    const modificado = req.body.modificado
    let datos = { status: 404, datos: [] }
    const result = await UsuarioModel.update(nombre, usuario, clave, id_rol, id_usuario)
    if (result.affectedRows > 0) {
        const data = {
            id_usuario: id_usuario,
            nombre: nombre,
            usuario: usuario,
            clave: clave,
            id_rol: id_rol,
        }
        let ruta = __dirname.replace("controllers", "public/img/usuarios/");
        ruta = ruta + id_usuario + ".jpg";
        if (modificado) {
            const base64Data = foto.replace(/^data:image\/jpeg;base64,/, "");
            fs.writeFile(ruta, base64Data, "base64", function (err) {
                console.log("SUBIR ERROR--->" + err);
            });
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.delete = async (req, res, next) => {
    const id_usuario = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await UsuarioModel.delete(id_usuario)
    if (result.affectedRows > 0) {
        const data = {
            id_usuario: id_usuario,
        }
        let ruta = __dirname.replace("controllers", "public/img/usuarios/");
        ruta = ruta + id_usuario + ".jpg";
        fs.unlink(ruta, function (err) {
            console.log("ELIMINAR ERROR--->" + err);
        });
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.changePassword = async (req, res, next) => {
    const clave = req.body.clave
    const id_usuario = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await UsuarioModel.changePassword(clave, id_usuario)
    if (result.affectedRows > 0) {
        const data = {
            id_usuario: id_usuario,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}