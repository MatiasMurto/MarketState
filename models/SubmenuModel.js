const pool = require('../databases/db')

module.exports = class SubmenuModel {
    
    constructor(id, item){
        this.id = id
        this.item = item
    }

    // Get Todos los Submenus
    static getAll = async (buscar) => {
        const sql = `SELECT id, nombre
                            FROM submenus 
                            WHERE nombre LIKE ?
                            ORDER BY id DESC`
        buscar = `%${buscar}%`
        return await pool.query(sql, [buscar])
    };

    // Get Un Submenu
    static getOne = async (id_submenu) => {
        const sql = `SELECT id, nombre
                            FROM submenus
                            WHERE id = ?`
        return await pool.query(sql, [id_submenu])
    };

    // Agregar
    static add = async (nombre) => {
        const sql = `INSERT INTO submenus(nombre) VALUES(?)`
        return await pool.query(sql, [nombre])
    };

    // Modificar
    static update = async (nombre, id_submenu) => {
        const sql = `UPDATE submenus SET nombre=? WHERE id=?`
        return await pool.query(sql, [nombre, id_submenu])
    };

    // Eliminar
    static delete = async (id_submenu) => {
        const sql = `DELETE FROM submenus WHERE id=?`
        return await pool.query(sql, [id_submenu])
    };

}