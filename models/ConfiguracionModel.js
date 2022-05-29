const pool = require('../databases/db')

module.exports = class ConfiguracionModel {
    
    constructor(id, item){
        this.id = id
        this.item = item
    }

    

    // Get Una Configuracion
    static getOne = async (id_configuraciones) => {
        const sql = `SELECT id, nombre, direccion, telefono, ruc, email
                            FROM configuraciones`
        return await pool.query(sql, [id_configuraciones])
    };

    // Modificar
    static update = async (nombre, direccion, telefono, ruc, email) => {
        const sql = `UPDATE configuraciones SET nombre=?, direccion=?, telefono=?, ruc=?, email=?`
        return await pool.query(sql, [nombre, direccion, telefono, ruc, email])
    };


}