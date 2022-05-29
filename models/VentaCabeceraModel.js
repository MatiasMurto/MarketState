const pool = require('../databases/db')

module.exports = class VentaCabeceraModel {
    
    constructor(id, item){
        this.id = id
        this.item = item
    }

    // Get Todos los VentaCabeceras
    static getAll = async (buscar) => {
        const sql = `SELECT vc.id, fecha, condicion, timbrado, fiscal, vc.id_cliente, c.nombre nombre_cliente
                        FROM ventas_cabeceras vc
                        LEFT JOIN clientes c ON vc.id_cliente = c.id
                        WHERE c.nombre LIKE ? 
                        ORDER BY vc.id DESC`
        buscar = `%${buscar}%`
        return await pool.query(sql, [buscar])
    };

    // Agregar
    static add = async (fecha, condicion, timbrado, fiscal, id_cliente) => {
        const sql = `INSERT INTO ventas_cabeceras(fecha, condicion, timbrado, fiscal, id_cliente)  VALUES(?,?,?,?,?)`
        return await pool.query(sql, [fecha, condicion, timbrado, fiscal, id_cliente])
    };

    // Modificar
    static update = async (fecha, condicion, timbrado, fiscal, id_cliente, id_venta_cabecera) => {
        const sql = `UPDATE ventas_cabeceras SET fecha=?, condicion=?, timbrado=?, fiscal=?, id_cliente=? WHERE id=?`
        return await pool.query(sql, [fecha, condicion, timbrado, fiscal, id_cliente, id_venta_cabecera])
    };

    // Eliminar
    static delete = async (id_venta_cabecera) => {
        let sql = `DELETE FROM ventas_detalles WHERE id_venta_cabecera=?`
        await pool.query(sql, [id_venta_cabecera])
        sql = `DELETE FROM ventas_cabeceras WHERE id=?`
        return await pool.query(sql, [id_venta_cabecera])
    };

    // Consultas
    static consult = async (desde_fecha, hasta_fecha, desde_cliente, hasta_cliente) => {
        const sql = `SELECT vc.id, fecha, condicion, timbrado, fiscal, vc.id_cliente, c.nombre nombre_cliente, vc.total_costo, vc.total_precio
                        FROM ventas_cabeceras vc
                        LEFT JOIN clientes c ON vc.id_cliente = c.id
                        WHERE  fecha  BETWEEN ? AND  ? AND 
                               vc.id_cliente BETWEEN ? AND  ?
                        ORDER BY fecha ASC`
        return await pool.query(sql, [desde_fecha, hasta_fecha, desde_cliente, hasta_cliente])
    };

    // Informes
    // Ventas por meses
    static salesMonth = async (anio) => {
        const sql = `SELECT anio, mes, total_costo, total_precio
                        FROM ventas_meses
                        WHERE anio = ?
                        ORDER BY anio,mes ASC`
        return await pool.query(sql, [anio])
    };

}