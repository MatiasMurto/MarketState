const pool = require('../databases/db')

module.exports = class VentaDetalleModel {
    
    constructor(id, item){
        this.id = id
        this.item = item
    }

    // Get Todas las VentaDetalles
    static getVentaCabecera = async (id_venta_cabecera) => {
        const sql = `SELECT vd.id, cantidad, vd.precio, vd.id_producto, p.nombre nombre_producto
                            FROM ventas_detalles vd
                            LEFT JOIN productos p ON vd.id_producto = p.id
                            WHERE vd.id_venta_cabecera = ?
                            ORDER BY vd.id ASC`
        return await pool.query(sql, [id_venta_cabecera])
    };

    // Agregar
    static add = async (id_venta_cabecera, id_producto, cantidad, costo, precio) => {
        const sql = `INSERT INTO ventas_detalles(id_venta_cabecera, id_producto, cantidad, costo, precio) VALUES(?,?,?,?,?)`
        return await pool.query(sql, [id_venta_cabecera, id_producto, cantidad, costo, precio])
    };

    // Modificar
    static update = async (id_venta_cabecera, id_producto, cantidad, costo, precio, id_venta_detalle) => {
        const sql = `UPDATE ventas_detalles SET id_venta_cabecera=?, id_producto=?, cantidad=?, costo=?, precio=? WHERE id=?`
        return await pool.query(sql, [id_venta_cabecera, id_producto, cantidad, costo, precio, id_venta_detalle])
    };

    // Eliminar
    static delete = async (id_venta_detalle) => {
        const sql = `DELETE FROM ventas_detalles WHERE id=?`
        return await pool.query(sql, [id_venta_detalle])
    };

}