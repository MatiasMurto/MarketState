const ConfiguracionModel = require("../models/ConfiguracionModel")


exports.getOne = async (req, res, next) => {
    let id_configuracion = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await ConfiguracionModel.getOne(id_configuracion)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.update = async (req, res, next) => {
    const nombre = req.body.nombre
    const direccion = req.body.direccion
    const telefono = req.body.telefono
    const ruc = req.body.ruc
    const email = req.body.email
    let datos = { status: 404, datos: [] }
    const result = await ConfiguracionModel.update(nombre, direccion, telefono, ruc, email)
    if (result.affectedRows > 0) {
        const data = {
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            ruc: ruc,
            email: email
        
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

