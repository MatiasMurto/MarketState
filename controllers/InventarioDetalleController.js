const InventarioDetalleModel = require("../models/InventarioDetalleModel")

exports.getInventarioCabecera = async (req, res, next) => {
    let id_inventario_cabecera = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await InventarioDetalleModel.getVentaCabecera(id_inventario_cabecera)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.insert = async (req, res, next) => {
    const id_inventario_cabecera = req.body.id_inventario_cabecera
    const id_producto = req.body.id_producto
    const cantidad = req.body.cantidad
    const costo = req.body.costo
    const precio = req.body.precio
    let datos = { status: 404, datos: [] }
    const result = await InventarioDetalleModel.add(id_inventario_cabecera, id_producto, cantidad, costo, precio)
    if (result.affectedRows > 0) {
        const data = {
            id_inventario_detalle: result.insertId,
            id_inventario_cabecera: id_inventario_cabecera,
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
    const id_inventario_cabecera = req.body.id_inventario_cabecera
    const id_producto = req.body.id_producto
    const cantidad = req.body.cantidad
    const costo = req.body.costo
    const precio = req.body.precio
    const id_inventario_detalle = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await InventarioDetalleModel.update(id_inventario_cabecera, id_producto, cantidad, costo, precio, id_inventario_detalle)
    if (result.affectedRows > 0) {
        const data = {
            id_inventario_detalle: id_inventario_detalle,
            id_inventario_cabecera: id_inventario_cabecera,
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
    const id_inventario_detalle = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await InventarioDetalleModel.delete(id_inventario_detalle)
    if (result.affectedRows > 0) {
        const data = {
            id_inventario_detalle: id_inventario_detalle,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}
