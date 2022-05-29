const pool = require('../databases/db')

module.exports = class ProveedorModel {
    
    constructor(id, item){
        this.id = id
        this.item = item
    }

    // Login
    static login = async(email, clave) => {
        const sql = `SELECT id, nombre, telefono, direccion, ruc, email, localizacion
                         FROM proveedores
                         WHERE email = ? AND clave = ?`
        return await pool.query(sql, [email, clave])
    }
    
    // Get Todos los Proveedors
    static getAll = async (buscar) => {
        const sql = `SELECT id, nombre, telefono, direccion, ruc, localizacion, email
                            FROM proveedores 
                            WHERE nombre LIKE ?
                            ORDER BY id DESC`
        buscar = `%${buscar}%`
        return await pool.query(sql, [buscar])
    };

    // Agregar
    static add = async (nombre, telefono, direccion, ruc, localizacion, email) => {
        const sql = `INSERT INTO proveedores(nombre, telefono, direccion, ruc, localizacion, email) VALUES(?,?,?,?,?,?)`
        return await pool.query(sql, [nombre, telefono, direccion, ruc, localizacion, email])
    };

    // Modificar
    static update = async (nombre, telefono, direccion, ruc, localizacion, email, id_proveedor) => {
        const sql = `UPDATE proveedores SET nombre=?, telefono=?, direccion=?, ruc=?, localizacion=?, email=? WHERE id=?`
        return await pool.query(sql, [nombre, telefono, direccion, ruc, localizacion, email, id_proveedor])
    };

    // Eliminar
    static delete = async (id_proveedor) => {
        const sql = `DELETE FROM proveedores WHERE id=?`
        return await pool.query(sql, [id_proveedor])
    };

    // List
    static list = async (desde_proveedor, hasta_proveedor) => {
        const sql = `SELECT * FROM proveedores WHERE id >= ? AND id <= ?`
        return await pool.query(sql, [desde_proveedor, hasta_proveedor])
    };
}