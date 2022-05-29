const pool = require('../databases/db')

module.exports = class CompraCabeceraModel {
    
    constructor(id, item){
        this.id = id
        this.item = item
    }

    // Get Todos los CompraCabeceras
    static getAll = async (buscar) => {
        const sql = `SELECT cc.id, fecha, condicion, cc.timbrado, cc.fiscal, cc.id_proveedor, p.nombre nombre_proveedor
                        FROM compras_cabeceras cc
                        LEFT JOIN proveedores p ON cc.id_proveedor = p.id
                        WHERE p.nombre LIKE ? 
                        ORDER BY cc.id DESC`
        buscar = `%${buscar}%`
        return await pool.query(sql, [buscar])
    };

    // Agregar
    static add = async (fecha, condicion, timbrado, fiscal, id_proveedor) => {
        const sql = `INSERT INTO compras_cabeceras(fecha, condicion, timbrado, fiscal, id_proveedor)  VALUES(?,?,?,?,?)`
        return await pool.query(sql, [fecha, condicion, timbrado, fiscal, id_proveedor])
    };

    // Modificar
    static update = async (fecha, condicion, timbrado, fiscal, id_proveedor, id_compra_cabecera) => {
        const sql = `UPDATE compras_cabeceras SET fecha=?, condicion=?, timbrado=?, fiscal=?, id_proveedor=? WHERE id=?`
        return await pool.query(sql, [fecha, condicion, timbrado, fiscal, id_proveedor, id_compra_cabecera])
    };

    // Eliminar
    static delete = async (id_compra_cabecera) => {
        let sql = `DELETE FROM compras_detalles WHERE id_compra_cabecera=?`
        await pool.query(sql, [id_compra_cabecera])
        sql = `DELETE FROM compras_cabeceras WHERE id=?`
        return await pool.query(sql, [id_compra_cabecera])
    };

    // Consultas
    static consult = async (desde_fecha, hasta_fecha, desde_proveedor, hasta_proveedor) => {
        const sql = `SELECT cc.id, fecha, condicion, timbrado, fiscal, cc.id_proveedor, p.nombre nombre_proveedor, cc.total_precio
                        FROM compras_cabeceras cc
                        LEFT JOIN proveedores p ON cc.id_proveedor = p.id
                        WHERE  fecha  BETWEEN ? AND  ? AND 
                               cc.id_proveedor BETWEEN ? AND  ?
                        ORDER BY fecha ASC`
        return await pool.query(sql, [desde_fecha, hasta_fecha, desde_proveedor, hasta_proveedor])
    };

    // Informes
    // Ventas por meses
    static salesMonth = async (anio) => {
        const sql = `SELECT anio, mes, total_precio
                        FROM compras_meses
                        WHERE anio = ?
                        ORDER BY anio,mes ASC`
        return await pool.query(sql, [anio])
    };

}