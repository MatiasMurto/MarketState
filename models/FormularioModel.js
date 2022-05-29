const pool = require('../databases/db')

module.exports = class FormularioModel {
    
    constructor(id, item){
        this.id = id
        this.item = item
    }
    // Get Permisos
    static getPermisos = async (id_rol) => {
        const sql = `SELECT f.id id_formulario, f.nombre, f.url, f.id_submenu, s.nombre nombre_submenu,
                            p.id id_permiso, p.agregar, p.modificar, p.eliminar
                            FROM formularios f
                            LEFT JOIN submenus s ON f.id_submenu = s.id
                            LEFT JOIN permisos p ON f.id = p.id_formulario AND p.id_rol = ?
                            ORDER BY f.id_submenu, f.id`
        return await pool.query(sql, [id_rol])
    };

    // Get Todos los Formularios
    static getAll = async (buscar) => {
        const sql = `SELECT f.id, f.nombre, url, f.id_submenu, s.nombre nombre_submenu
                            FROM formularios f
                            LEFT JOIN submenus s ON f.id_submenu = s.id
                            WHERE f.nombre LIKE ?
                            ORDER BY f.id DESC`
        buscar = `%${buscar}%`
        return await pool.query(sql, [buscar])
    };

    // Agregar
    static add = async (nombre, url, id_submenu) => {
        const sql = `INSERT INTO formularios(nombre, url, id_submenu) VALUES(?,?,?)`
        return await pool.query(sql, [nombre, url, id_submenu])
    };

    // Modificar
    static update = async (nombre, url, id_submenu, id_formulario) => {
        const sql = `UPDATE formularios SET nombre=?, url=?, id_submenu=? WHERE id=?`
        return await pool.query(sql, [nombre, url, id_submenu, id_formulario])
    };

    // Eliminar
    static delete = async (id_formulario) => {
        const sql = `DELETE FROM formularios WHERE id=?`
        return await pool.query(sql, [id_formulario])
    };

}