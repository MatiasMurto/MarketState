const pool = require('../databases/db')

module.exports = class ClienteModel {
    
    constructor(id, item){
        this.id = id
        this.item = item
    }

    // Login
    static login = async(email, clave) => {
        const sql = `SELECT id, nombre, telefono, direccion, ruc, email, localizacion
                         FROM clientes
                         WHERE email = ? AND clave = ?`
        return await pool.query(sql, [email, clave])
    }
    
    // Get Todos los Clientes
    static getAll = async (buscar) => {
        const sql = `SELECT id, nombre, telefono, direccion, ruc, localizacion, email, clave 
                            FROM clientes 
                            WHERE nombre LIKE ?
                            ORDER BY id DESC`
        buscar = `%${buscar}%`
        return await pool.query(sql, [buscar])
    };

    // Agregar
    static add = async (nombre, telefono, direccion, ruc, localizacion, email, clave) => {
        const sql = `INSERT INTO clientes(nombre, telefono, direccion, ruc, localizacion, email, clave) VALUES(?,?,?,?,?,?,?)`
        return await pool.query(sql, [nombre, telefono, direccion, ruc, localizacion, email, clave])
    };

    // Modificar
    static update = async (nombre, telefono, direccion, ruc, localizacion, email, clave, id_cliente) => {
        const sql = `UPDATE clientes SET nombre=?, telefono=?, direccion=?, ruc=?, localizacion=?, email=?, clave=? WHERE id=?`
        return await pool.query(sql, [nombre, telefono, direccion, ruc, localizacion, email, clave, id_cliente])
    };

    // Eliminar
    static delete = async (id_cliente) => {
        const sql = `DELETE FROM clientes WHERE id=?`
        return await pool.query(sql, [id_cliente])
    };

    // List
    static list = async (desde_cliente, hasta_cliente) => {
        const sql = `SELECT * FROM clientes WHERE id >= ? AND id <= ?`
        return await pool.query(sql, [desde_cliente, hasta_cliente])
    };
}