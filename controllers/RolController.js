const RolModel = require("../models/RolModel")

exports.getAll = async (req, res, next) => {
    let buscar = req.query.buscar
    let datos = { status: 404, datos: [] }
    const result = await RolModel.getAll(buscar)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.insert = async (req, res, next) => {
    const nombre = req.body.nombre
    let datos = { status: 404, datos: [] }
    const result = await RolModel.add(nombre)
    if (result.affectedRows > 0) {
        const data = {
            id_rol: result.insertId,
            nombre: nombre
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.update = async (req, res, next) => {
    const nombre = req.body.nombre
    const id_rol = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await RolModel.update(nombre, id_rol)
    if (result.affectedRows > 0) {
        const data = {
            id_rol: id_rol,
            nombre: nombre,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.delete = async (req, res, next) => {
    const id_rol = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await RolModel.delete(id_rol)
    if (result.affectedRows > 0) {
        const data = {
            id_rol: id_rol,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}
