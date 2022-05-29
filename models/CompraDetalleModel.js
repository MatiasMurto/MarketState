const pool = require('../databases/db')

module.exports = class CompraDetalleModel {
    
    constructor(id, item){
        this.id = id
        this.item = item
    }

    // Get Todas las CompraDetalles
    static getVentaCabecera = async (id_compra_cabecera) => {
        const sql = `SELECT cd.id, cantidad, cd.precio, cd.id_producto, p.nombre nombre_producto
                            FROM compras_detalles cd
                            LEFT JOIN productos p ON cd.id_producto = p.id
                            WHERE cd.id_compra_cabecera = ?
                            ORDER BY cd.id ASC`
        return await pool.query(sql, [id_compra_cabecera])
    };

    // Agregar
    static add = async (id_compra_cabecera, id_producto, cantidad, precio) => {
        const sql = `INSERT INTO compras_detalles(id_compra_cabecera, id_producto, cantidad, precio) VALUES(?,?,?,?)`
        return await pool.query(sql, [id_compra_cabecera, id_producto, cantidad, precio])
    };

    // Modificar
    static update = async (id_compra_cabecera, id_producto, cantidad, precio, id_compra_detalle) => {
        const sql = `UPDATE compras_detalles SET id_compra_cabecera=?, id_producto=?, cantidad=?, precio=? WHERE id=?`
        return await pool.query(sql, [id_compra_cabecera, id_producto, cantidad, precio, id_compra_detalle])
    };

    // Eliminar
    static delete = async (id_compra_detalle) => {
        const sql = `DELETE FROM compras_detalles WHERE id=?`
        return await pool.query(sql, [id_compra_detalle])
    };

}