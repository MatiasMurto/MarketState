const pool = require('../databases/db')

module.exports = class InventarioDetalleModel {
    
    constructor(id, item){
        this.id = id
        this.item = item
    }

    // Get Todas las InventarioDetalles
    static getVentaCabecera = async (id_inventario_cabecera) => {
        const sql = `SELECT id.id, cantidad, id.costo, id.precio, id.id_producto, p.nombre nombre_producto
                            FROM inventarios_detalles id
                            LEFT JOIN productos p ON id.id_producto = p.id
                            WHERE id.id_inventario_cabecera = ?
                            ORDER BY id.id ASC`
        return await pool.query(sql, [id_inventario_cabecera])
    };

    // Agregar
    static add = async (id_inventario_cabecera, id_producto, cantidad, costo, precio) => {
        const sql = `INSERT INTO inventarios_detalles(id_inventario_cabecera, id_producto, cantidad, costo, precio) VALUES(?,?,?,?,?)`
        return await pool.query(sql, [id_inventario_cabecera, id_producto, cantidad, costo, precio])
    };

    // Modificar
    static update = async (id_inventario_cabecera, id_producto, cantidad, costo, precio, id_venta_detalle) => {
        const sql = `UPDATE inventarios_detalles SET id_inventario_cabecera=?, id_producto=?, cantidad=?, costo=?, precio=? WHERE id=?`
        return await pool.query(sql, [id_inventario_cabecera, id_producto, cantidad, costo, precio, id_venta_detalle])
    };

    // Eliminar
    static delete = async (id_venta_detalle) => {
        const sql = `DELETE FROM inventarios_detalles WHERE id=?`
        return await pool.query(sql, [id_venta_detalle])
    };

}