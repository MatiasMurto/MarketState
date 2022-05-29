const SubmenuModel = require("../models/SubmenuModel")

exports.getAll = async (req, res, next) => {
    let buscar = req.query.buscar
    let datos = { status: 404, datos: [] }
    const result = await SubmenuModel.getAll(buscar)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.insert = async (req, res, next) => {
    const nombre = req.body.nombre
    let datos = { status: 404, datos: [] }
    const result = await SubmenuModel.add(nombre)
    if (result.affectedRows > 0) {
        const data = {
            id_submenu: result.insertId,
            nombre: nombre
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.update = async (req, res, next) => {
    const nombre = req.body.nombre
    const id_submenu = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await SubmenuModel.update(nombre, id_submenu)
    if (result.affectedRows > 0) {
        const data = {
            id_submenu: id_submenu,
            nombre: nombre,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.delete = async (req, res, next) => {
    const id_submenu = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await SubmenuModel.delete(id_submenu)
    if (result.affectedRows > 0) {
        const data = {
            id_submenu: id_submenu,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}
