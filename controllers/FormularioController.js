const FormularioModel = require("../models/FormularioModel")

exports.getPermisos = async (req, res, next) => {
    const id_rol = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await FormularioModel.getPermisos(id_rol)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.getAll = async (req, res, next) => {
    let buscar = req.query.buscar
    let datos = { status: 404, datos: [] }
    const result = await FormularioModel.getAll(buscar)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.insert = async (req, res, next) => {
    const nombre = req.body.nombre
    const url = req.body.url
    const id_submenu = req.body.id_submenu
    let datos = { status: 404, datos: [] }
    const result = await FormularioModel.add(nombre, url, id_submenu)
    if (result.affectedRows > 0) {
        const data = {
            id_formulario: result.insertId,
            nombre: nombre,
            url: url,
            id_submenu: id_submenu
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.update = async (req, res, next) => {
    const nombre = req.body.nombre
    const url = req.body.url
    const id_submenu = req.body.id_submenu
    const id_formulario = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await FormularioModel.update(nombre, url, id_submenu, id_formulario)
    if (result.affectedRows > 0) {
        const data = {
            nombre: nombre,
            url: url,
            id_submenu: id_submenu
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.delete = async (req, res, next) => {
    const id_formulario = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await FormularioModel.delete(id_formulario)
    if (result.affectedRows > 0) {
        const data = {
            id_formulario: id_formulario,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}
