const CompraCabeceraModel = require("../models/CompraCabeceraModel")

exports.getAll = async (req, res, next) => {
    let buscar = req.query.buscar
    let datos = { status: 404, datos: [] }
    const result = await CompraCabeceraModel.getAll(buscar)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.insert = async (req, res, next) => {
    const fecha = req.body.fecha
    const condicion = req.body.condicion
    const timbrado = req.body.timbrado
    const fiscal = req.body.fiscal
    const id_proveedor = req.body.id_proveedor
    let datos = { status: 404, datos: [] }
    const result = await CompraCabeceraModel.add(fecha, condicion, timbrado, fiscal, id_proveedor)
    if (result.affectedRows > 0) {
        const data = {
            id_compra_cabecera: result.insertId,
            fecha: fecha,
            condicion: condicion,
            timbrado: timbrado,
            fiscal: fiscal,
            id_proveedor: id_proveedor
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.update = async (req, res, next) => {
    const fecha = req.body.fecha
    const condicion = req.body.condicion
    const timbrado = req.body.timbrado
    const fiscal = req.body.fiscal
    const id_proveedor = req.body.id_proveedor
    const id_compra_cabecera = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await CompraCabeceraModel.update(fecha, condicion, timbrado, fiscal, id_proveedor, id_compra_cabecera)
    if (result.affectedRows > 0) {
        const data = {
            id_compra_cabecera: id_compra_cabecera,
            fecha: fecha,
            condicion: condicion,
            timbrado: timbrado,
            fiscal: fiscal,
            id_proveedor: id_proveedor
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.delete = async (req, res, next) => {
    const id_compra_cabecera = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await CompraCabeceraModel.delete(id_compra_cabecera)
    if (result.affectedRows > 0) {
        const data = {
            id_compra_cabecera: id_compra_cabecera,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.consult = async (req, res, next) => {
    const id_proveedor = parseInt(req.query.id_proveedor)
    const desde_fecha = req.query.desde_fecha
    const hasta_fecha = req.query.hasta_fecha
    let desde_proveedor = 0
    let hasta_proveedor = 9999999
    if (id_proveedor !== 0) {
        desde_proveedor = id_proveedor
        hasta_proveedor = id_proveedor
    }
    let datos = { status: 404, datos: [] }
    const result = await CompraCabeceraModel.consult(desde_fecha, hasta_fecha, desde_proveedor, hasta_proveedor)
    datos = {status: 200, datos: result}
    res.send(datos);
}

exports.salesMonth = async (req, res, next) => {
    const anio = req.query.anio
    let datos = { status: 404, datos: [] }
    const result = await CompraCabeceraModel.salesMonth(anio)
    datos = {status: 200, datos: result}
    res.send(datos);
}
