const pool = require('../databases/db')

module.exports = class RolModel {
    
    constructor(id, item){
        this.id = id
        this.item = item
    }

    // Get Todos los Roles
    static getAll = async (buscar) => {
        const sql = `SELECT id, nombre
                            FROM roles 
                            WHERE nombre LIKE ?
                            ORDER BY id DESC`
        buscar = `%${buscar}%`
        return await pool.query(sql, [buscar])
    };

    // Get Un Rol
    static getOne = async (id_rol) => {
        const sql = `SELECT id, nombre
                            FROM roles
                            WHERE id = ?`
        return await pool.query(sql, [id_rol])
    };

    // Agregar
    static add = async (nombre) => {
        const sql = `INSERT INTO roles(nombre) VALUES(?)`
        return await pool.query(sql, [nombre])
    };

    // Modificar
    static update = async (nombre, id_rol) => {
        const sql = `UPDATE roles SET nombre=? WHERE id=?`
        return await pool.query(sql, [nombre, id_rol])
    };

    // Eliminar
    static delete = async (id_rol) => {
        const sql = `DELETE FROM roles WHERE id=?`
        return await pool.query(sql, [id_rol])
    };

}