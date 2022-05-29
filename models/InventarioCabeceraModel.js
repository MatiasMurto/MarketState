const pool = require('../databases/db')

module.exports = class InventarioCabeceraModel {
    
    constructor(id, item){
        this.id = id
        this.item = item
    }

    // Get Todos los InventarioCabeceras
    static getAll = async (buscar) => {
        const sql = `SELECT id, fecha, observaciones
                        FROM inventarios_cabeceras
                        WHERE observaciones LIKE ? 
                        ORDER BY id DESC`
        buscar = `%${buscar}%`
        return await pool.query(sql, [buscar])
    };

    // Agregar
    static add = async (fecha, observaciones) => {
        const sql = `INSERT INTO inventarios_cabeceras(fecha, observaciones)  VALUES(?,?)`
        return await pool.query(sql, [fecha, observaciones])
    };

    // Modificar
    static update = async (fecha, observaciones, id_inventario_cabecera) => {
        const sql = `UPDATE inventarios_cabeceras SET fecha=?, observaciones=? WHERE id=?`
        return await pool.query(sql, [fecha, observaciones, id_inventario_cabecera])
    };

    // Eliminar
    static delete = async (id_inventario_cabecera) => {
        let sql = `DELETE FROM inventarios_detalles WHERE id_inventario_cabecera=?`
        await pool.query(sql, [id_inventario_cabecera])
        sql = `DELETE FROM inventarios_cabeceras WHERE id=?`
        return await pool.query(sql, [id_inventario_cabecera])
    };

    // Consultas
    static consult = async (desde_fecha, hasta_fecha) => {
        const sql = `SELECT id, fecha, observaciones, total_costo, total_precio
                        FROM inventarios_cabeceras 
                        WHERE  fecha  BETWEEN ? AND  ? 
                        ORDER BY fecha ASC`
        return await pool.query(sql, [desde_fecha, hasta_fecha])
    };

    // Informes
    // Por meses
    static salesMonth = async (anio) => {
        const sql = `SELECT anio, mes, total_costo, total_precio
                        FROM inventarios_meses
                        WHERE anio = ?
                        ORDER BY anio,mes ASC`
        return await pool.query(sql, [anio])
    };

}