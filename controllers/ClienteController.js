const ClienteModel = require("../models/ClienteModel")
const FPDF = require('node-fpdf')
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
    const cliente = req.body.cliente
    const clave = req.body.clave
    let datos = { status: 404, data: [] };
    const result = await ClienteModel.login(cliente, clave)
    if (result.length > 0) {
        const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (300), id: result[0].id, tipo: 'cliente' }, "clave_secreta");
        datos = { status: 200, datos: result[0], token: token };
    }
    res.json(datos)
}

exports.getAll = async (req, res, next) => {
    let buscar = req.query.buscar
    let datos = { status: 404, datos: [] }
    const result = await ClienteModel.getAll(buscar)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.insert = async (req, res, next) => {
    const nombre = req.body.nombre
    const telefono = req.body.telefono
    const direccion = req.body.direccion
    const ruc = req.body.ruc
    const localizacion = req.body.localizacion
    const email = req.body.email
    const clave = req.body.clave
    let datos = { status: 404, datos: [] }
    const result = await ClienteModel.add(nombre, telefono, direccion, ruc, localizacion, email, clave)
    if (result.affectedRows > 0) {
        const data = {
            id_cliente: result.insertId,
            nombre: nombre,
            telefono: direccion,
            ruc: ruc,
            localizacion: localizacion,
            email: email,
            clave: clave
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.update = async (req, res, next) => {
    const nombre = req.body.nombre
    const telefono = req.body.telefono
    const direccion = req.body.direccion
    const ruc = req.body.ruc
    const localizacion = req.body.localizacion
    const email = req.body.email
    const clave = req.body.clave
    const id_cliente = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await ClienteModel.update(nombre, telefono, direccion, ruc, localizacion, email, clave, id_cliente)
    if (result.affectedRows > 0) {
        const data = {
            id_cliente: id_cliente,
            nombre: nombre,
            telefono: direccion,
            ruc: ruc,
            localizacion: localizacion,
            email: email,
            clave: clave
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.delete = async (req, res, next) => {
    const id_cliente = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await ClienteModel.delete(id_cliente)
    if (result.affectedRows > 0) {
        const data = {
            id_cliente: id_cliente,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.changePassword = async (req, res, next) => {
    const clave = req.body.clave
    const id_cliente = req.body.id_cliente
    let datos = { status: 404, datos: [] }
    const result = await ClienteModel.changePassword(clave, id_cliente)
    if (result.affectedRows > 0) {
        const data = {
            id_cliente: id_cliente,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.list = async (req, res, next) => {
    const desde_cliente = req.query.desde_cliente
    const hasta_cliente = req.query.hasta_cliente
    let datos = { status: 404, datos: [] }
    const result = await ClienteModel.list(desde_cliente, hasta_cliente)
    const pdf = new FPDF('L', 'mm', 'A4');
    pdf.AliasNbPages = '{nb}';
    pdf.Header = function Header() {
        let fecha = new Date().toISOString().split('T')[0]
        let hora = new Date().toISOString().split('T')[1].substring(0, 8)
        pdf.SetFont('helvetica', 'B', 8);
        pdf.Image('public/img/logo_pdf.jpg', 10, 10, -300)
        pdf.Cell(0, 6, 'LISTADO DE CLIENTES', 0, 0, 'C');
        pdf.Cell(0, 6, 'LISTADO: clientes', 0, 0, 'R');
        pdf.Ln(5);
        pdf.Cell(0, 6, `DESDE CLIENTE: ${desde_cliente} - HASTA CLIENTE: ${hasta_cliente}`, 0, 0, 'C');
        pdf.Cell(0, 6, 'USUARIO: admin', 0, 0, 'R');
        pdf.Ln(5);
        pdf.Cell(0, 6, `FECHA: ${fecha}`, 0, 0, 'R');
        pdf.Ln(5);
        pdf.Cell(0, 6, `HORA: ${hora}`, 0, 0, 'R');
        pdf.Ln(5);
        pdf.Cell(10, 6, 'ID', 1, 0);
        pdf.Cell(60, 6, 'NOMBRE', 1, 0);
        pdf.Cell(60, 6, 'DIRECCIÓN', 1, 0);
        pdf.Cell(50, 6, 'TELEFONO', 1, 0);
        pdf.Cell(50, 6, 'RUC', 1, 0);
        pdf.Cell(50, 6, 'EMAIL', 1, 0);
        pdf.Ln(5);
    }
    pdf.Footer = function Footer() {
        pdf.SetY(-15);
        pdf.SetFont('helvetica', 'B', 8);
        pdf.Cell(0, 10, 'Página ' + pdf.PageNo() + ' de {nb}', 0, 0, 'R');
    }

    pdf.AddPage();
    pdf.SetFont('Arial', 'B', 8);
    result.forEach(function (fila) {
        pdf.Cell(10, 6, fila.id.toString());
        pdf.Cell(60, 6, fila.nombre);
        pdf.Cell(60, 6, fila.direccion);
        pdf.Cell(50, 6, fila.telefono);
        pdf.Cell(50, 6, fila.ruc);
        pdf.Cell(50, 6, fila.email);
        pdf.Ln(5);
    });

    const pdfBase64 = pdf.Output('base64');
    const nombre = "cliente";

    datos = { status: 200, data: { archivo: pdfBase64, nombre: nombre } }
    res.send(datos);
}