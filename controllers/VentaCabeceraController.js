const VentaCabeceraModel = require("../models/VentaCabeceraModel")

exports.getAll = async (req, res, next) => {
    let buscar = req.query.buscar
    let datos = { status: 404, datos: [] }
    const result = await VentaCabeceraModel.getAll(buscar)
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
    const id_cliente = req.body.id_cliente
    let datos = { status: 404, datos: [] }
    const result = await VentaCabeceraModel.add(fecha, condicion, timbrado, fiscal, id_cliente)
    if (result.affectedRows > 0) {
        const data = {
            id_venta_cabecera: result.insertId,
            fecha: fecha,
            condicion: condicion,
            timbrado: timbrado,
            fiscal: fiscal,
            id_cliente: id_cliente
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
    const id_cliente = req.body.id_cliente
    const id_venta_cabecera = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await VentaCabeceraModel.update(fecha, condicion, timbrado, fiscal, id_cliente, id_venta_cabecera)
    if (result.affectedRows > 0) {
        const data = {
            id_venta_cabecera: id_venta_cabecera,
            fecha: fecha,
            condicion: condicion,
            timbrado: timbrado,
            fiscal: fiscal,
            id_cliente: id_cliente
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.delete = async (req, res, next) => {
    const id_venta_cabecera = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await VentaCabeceraModel.delete(id_venta_cabecera)
    if (result.affectedRows > 0) {
        const data = {
            id_venta_cabecera: id_venta_cabecera,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.consult = async (req, res, next) => {
    const id_cliente = parseInt(req.query.id_cliente)
    const desde_fecha = req.query.desde_fecha
    const hasta_fecha = req.query.hasta_fecha
    let desde_cliente = 0
    let hasta_cliente = 9999999
    if (id_cliente !== 0) {
        desde_cliente = id_cliente
        hasta_cliente = id_cliente
    }
    let datos = { status: 404, datos: [] }
    const result = await VentaCabeceraModel.consult(desde_fecha, hasta_fecha, desde_cliente, hasta_cliente)
    datos = {status: 200, datos: result}
    res.send(datos);
}

exports.salesMonth = async (req, res, next) => {
    const anio = req.query.anio
    let datos = { status: 404, datos: [] }
    const result = await VentaCabeceraModel.salesMonth(anio)
    datos = {status: 200, datos: result}
    res.send(datos);
}
