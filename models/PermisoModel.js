const pool = require('../databases/db')

module.exports = class PermisoModel {

    constructor(id, item) {
        this.id = id
        this.item = item
    }

    // Buscar por rol
    static getRol = async (id_rol) => {
        const sql = `SELECT f.id id_formulario, f.nombre nombre_formulario, f.url, f.id_submenu,
                            s.nombre nombre_submenu,
                            p.agregar, p.modificar, p.eliminar 
                            FROM formularios f
                            LEFT JOIN permisos p ON f.id = p.id_formulario
                            LEFT JOIN submenus s ON f.id_submenu = s.id
                            WHERE p.id_rol = ?
                            ORDER BY f.id_submenu, f.id`
        return await pool.query(sql, [id_rol])
    };

    // Agregar
    static add = async (id_rol, id_formulario, agregar, modificar, eliminar) => {
        const sql = `INSERT INTO permisos(id_rol, id_formulario, agregar, modificar, eliminar) 
                                   VALUES(?,?,?,?,?)`
        return await pool.query(sql, [id_rol, id_formulario, agregar, modificar, eliminar])
    };

    // Modificar
    static update = async (id_rol, id_formulario, agregar, modificar, eliminar, id_permiso) => {
        const sql = `UPDATE permisos SET id_rol = ?, id_formulario = ?, agregar = ?, modificar = ?, eliminar = ? 
                                   WHERE id = ?`
        return await pool.query(sql, [id_rol, id_formulario, agregar, modificar, eliminar, id_permiso])
    };

}