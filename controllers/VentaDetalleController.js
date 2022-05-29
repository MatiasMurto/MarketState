const VentaDetalleModel = require("../models/VentaDetalleModel")

exports.getVentaCabecera = async (req, res, next) => {
    let id_venta_cabecera = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await VentaDetalleModel.getVentaCabecera(id_venta_cabecera)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.insert = async (req, res, next) => {
    const id_venta_cabecera = req.body.id_venta_cabecera
    const id_producto = req.body.id_producto
    const cantidad = req.body.cantidad
    const costo = req.body.costo
    const precio = req.body.precio
    console.log(req.body)
    let datos = { status: 404, datos: [] }
    const result = await VentaDetalleModel.add(id_venta_cabecera, id_producto, cantidad, costo, precio)
    if (result.affectedRows > 0) {
        const data = {
            id_venta_detalle: result.insertId,
            id_venta_cabecera: id_venta_cabecera,
            id_producto: id_producto,
            cantidad: cantidad,
            costo: costo,
            precio: precio
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.update = async (req, res, next) => {
    const id_venta_cabecera = req.body.id_venta_cabecera
    const id_producto = req.body.id_producto
    const cantidad = req.body.cantidad
    const costo = req.body.costo
    const precio = req.body.precio
    const id_venta_detalle = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await VentaDetalleModel.update(id_venta_cabecera, id_producto, cantidad, costo, precio, id_venta_detalle)
    if (result.affectedRows > 0) {
        const data = {
            id_venta_detalle: id_venta_detalle,
            id_venta_cabecera: id_venta_cabecera,
            id_producto: id_producto,
            cantidad: cantidad,
            costo: costo,
            precio: precio
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.delete = async (req, res, next) => {
    const id_venta_detalle = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await VentaDetalleModel.delete(id_venta_detalle)
    if (result.affectedRows > 0) {
        const data = {
            id_venta_detalle: id_venta_detalle,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}
