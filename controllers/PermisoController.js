const UsuarioModel = require("../models/UsuarioModel")
const PermisoModel = require("../models/PermisoModel")
const jwt = require("jsonwebtoken")

exports.getRol = async (req, res, next) => {
    let usuario = { id_rol: 0 }
    let datos = { status: 404, data: [], usuario: { id_rol: 0 } }
    // TOKEN
    const token = req.headers.authorization
    try {
        const decoded = jwt.verify(token, "clave_secreta")
        console.log(decoded)
        if (decoded != undefined) {
            // BUSCAR USUARIO
            let id_usuario = decoded.id
            let result = await UsuarioModel.getOne(id_usuario)
            if (result.length > 0) {
                usuario = result[0]
            }
            // BUSCAR PERMISOS
            let id_rol = usuario.id_rol
            result = await PermisoModel.getRol(id_rol)
            if (result.length > 0) {
                datos = { status: 200, data: result, usuario: usuario }
            }
            res.send(datos)
        }
    } catch (error) {
        console.log(error)
        res.send(datos)
    }
}

exports.insert = async (req, res, next) => {
    let datos = { status: 404, data: [] }
    const id_rol = req.body.id_rol
    const id_formulario = req.body.id_formulario
    const agregar = req.body.agregar
    const modificar = req.body.modificar
    const eliminar = req.body.eliminar
    const result = PermisoModel.add(id_rol, id_formulario, agregar, modificar, eliminar)
    if (result.affectedRows > 0) {
        const data = {
            id_permiso: result.insertId,
            id_rol: id_rol,
            id_formulario: id_formulario,
            agregar: agregar,
            modificar: modificar,
            eliminar: eliminar
        }
        datos = { status: 200, data: data };
    }
    res.send(datos)
}

exports.update = async (req, res, next) => {
    let datos = { status: 404, data: [] }
    const id_rol = req.body.id_rol
    const id_formulario = req.body.id_formulario
    const agregar = req.body.agregar
    const modificar = req.body.modificar
    const eliminar = req.body.eliminar
    const id_permiso = req.params.id
    const result = PermisoModel.update(id_rol, id_formulario, agregar, modificar, eliminar, id_permiso)
    if (result.affectedRows > 0) {
        const data = {
            id_rol: id_rol,
            id_formulario: id_formulario,
            agregar: agregar,
            modificar: modificar,
            eliminar: eliminar
        }
        datos = { status: 200, data: data };
    }
    res.send(datos)
}
