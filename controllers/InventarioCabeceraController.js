const InventarioCabeceraModel = require("../models/InventarioCabeceraModel")

exports.getAll = async (req, res, next) => {
    let buscar = req.query.buscar
    let datos = { status: 404, datos: [] }
    const result = await InventarioCabeceraModel.getAll(buscar)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.insert = async (req, res, next) => {
    const fecha = req.body.fecha
    const observaciones = req.body.observaciones
    let datos = { status: 404, datos: [] }
    const result = await InventarioCabeceraModel.add(fecha, observaciones)
    if (result.affectedRows > 0) {
        const data = {
            id_inventario_cabecera: result.insertId,
            fecha: fecha,
            observaciones: observaciones
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.update = async (req, res, next) => {
    const fecha = req.body.fecha
    const observaciones = req.body.observaciones
    const id_inventario_cabecera = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await InventarioCabeceraModel.update(fecha, observaciones, id_inventario_cabecera)
    if (result.affectedRows > 0) {
        const data = {
            id_inventario_cabecera: id_inventario_cabecera,
            fecha: fecha,
            observaciones: observaciones
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.delete = async (req, res, next) => {
    const id_inventario_cabecera = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await InventarioCabeceraModel.delete(id_inventario_cabecera)
    if (result.affectedRows > 0) {
        const data = {
            id_inventario_cabecera: id_inventario_cabecera,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.consult = async (req, res, next) => {
    const desde_fecha = req.query.desde_fecha
    const hasta_fecha = req.query.hasta_fecha
    let datos = { status: 404, datos: [] }
    const result = await InventarioCabeceraModel.consult(desde_fecha, hasta_fecha)
    datos = {status: 200, datos: result}
    res.send(datos);
}

exports.salesMonth = async (req, res, next) => {
    const anio = req.query.anio
    let datos = { status: 404, datos: [] }
    const result = await InventarioCabeceraModel.salesMonth(anio)
    datos = {status: 200, datos: result}
    res.send(datos);
}
