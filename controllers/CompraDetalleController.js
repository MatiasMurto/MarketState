const CompraDetalleModel = require("../models/CompraDetalleModel")

exports.getCompraCabecera = async (req, res, next) => {
    let id_compra_cabecera = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await CompraDetalleModel.getVentaCabecera(id_compra_cabecera)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.insert = async (req, res, next) => {
    const id_compra_cabecera = req.body.id_compra_cabecera
    const id_producto = req.body.id_producto
    const cantidad = req.body.cantidad
    const precio = req.body.precio
    let datos = { status: 404, datos: [] }
    const result = await CompraDetalleModel.add(id_compra_cabecera, id_producto, cantidad, precio)
    if (result.affectedRows > 0) {
        const data = {
            id_compra_detalle: result.insertId,
            id_compra_cabecera: id_compra_cabecera,
            id_producto: id_producto,
            cantidad: cantidad,
            precio: precio
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.update = async (req, res, next) => {
    const id_compra_cabecera = req.body.id_compra_cabecera
    const id_producto = req.body.id_producto
    const cantidad = req.body.cantidad
    const precio = req.body.precio
    const id_compra_detalle = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await CompraDetalleModel.update(id_compra_cabecera, id_producto, cantidad, precio, id_compra_detalle)
    if (result.affectedRows > 0) {
        const data = {
            id_compra_detalle: id_compra_detalle,
            id_compra_cabecera: id_compra_cabecera,
            id_producto: id_producto,
            cantidad: cantidad,
            precio: precio
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.delete = async (req, res, next) => {
    const id_compra_detalle = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await CompraDetalleModel.delete(id_compra_detalle)
    if (result.affectedRows > 0) {
        const data = {
            id_compra_detalle: id_compra_detalle,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}
