const ProductoModel = require("../models/ProductoModel")
const FPDF = require('node-fpdf')
const fs = require("fs")

exports.getAll = async (req, res, next) => {
    let buscar = req.query.buscar
    let datos = { status: 404, datos: [] }
    const result = await ProductoModel.getAll(buscar)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.insert = async (req, res, next) => {
    const nombre = req.body.nombre
    const costo = req.body.costo
    const precio = req.body.precio
    const stock = req.body.stock
    const foto = req.body.foto
    const modificado = req.body.modificado
    let datos = { status: 404, datos: [] }
    const result = await ProductoModel.add(nombre, costo, precio, stock)
    if (result.affectedRows > 0) {
        const data = {
            id_producto: result.insertId,
            nombre: nombre,
            costo: costo,
            precio: precio,
            stock: stock
        }
        let archivo = __dirname.replace("controllers", "public/img/productos/0.jpg");
        let ruta = __dirname.replace("controllers", "public/img/productos/");
        ruta = ruta + result.insertId + ".jpg";
        if (modificado) {
            const base64Data = foto.replace(/^data:image\/jpeg;base64,/, "");
            fs.writeFile(ruta, base64Data, "base64", function (err) {
                console.log("SUBIR ERROR--->" + err);
            });
        } else {
            fs.copyFile(archivo, ruta, (err) => {
                console.log("COPIAR ERROR--->" + err);
            });
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.update = async (req, res, next) => {
    const nombre = req.body.nombre
    const costo = req.body.costo
    const precio = req.body.precio
    const stock = req.body.stock
    const foto = req.body.foto
    const modificado = req.body.modificado
    const id_producto = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await ProductoModel.update(nombre, costo, precio, stock, id_producto)
    if (result.affectedRows > 0) {
        const data = {
            id_producto: id_producto,
            nombre: nombre,
            costo: costo,
            precio: precio,
            stock: stock
        }
        let ruta = __dirname.replace("controllers", "public/img/productos/");
        ruta = ruta + id_producto + ".jpg";
        if (modificado) {
            const base64Data = foto.replace(/^data:image\/jpeg;base64,/, "");
            fs.writeFile(ruta, base64Data, "base64", function (err) {
                console.log("SUBIR ERROR--->" + err);
            });
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.delete = async (req, res, next) => {
    const id_producto = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await ProductoModel.delete(id_producto)
    if (result.affectedRows > 0) {
        const data = {
            id_producto: id_producto,
        }
        let ruta = __dirname.replace("controllers", "public/img/productos/");
        ruta = ruta + id_producto + ".jpg";
        fs.unlink(ruta, function (err) {
            console.log("ELIMINAR ERROR--->" + err);
        });
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.list = async (req, res, next) => {
    const desde_producto = req.query.desde_producto
    const hasta_producto = req.query.hasta_producto
    let datos = { status: 404, datos: [] }
    const result = await ProductoModel.list(desde_producto, hasta_producto)
    const pdf = new FPDF('L', 'mm', 'A4');
    pdf.AliasNbPages = '{nb}';
    pdf.Header = function Header() {
        let fecha = new Date().toISOString().split('T')[0]
        let hora = new Date().toISOString().split('T')[1].substring(0, 8)
        pdf.SetFont('helvetica', 'B', 8);
        pdf.Image('public/img/logo_pdf.jpg', 10, 10, -300)
        pdf.Cell(0, 6, 'LISTADO DE PRODUCTOS', 0, 0, 'C');
        pdf.Cell(0, 6, 'LISTADO: productos', 0, 0, 'R');
        pdf.Ln(5);
        pdf.Cell(0, 6, `DESDE PRODUCTO: ${desde_producto} - HASTA PRODUCTO: ${hasta_producto}`, 0, 0, 'C');
        pdf.Cell(0, 6, 'USUARIO: admin', 0, 0, 'R');
        pdf.Ln(5);
        pdf.Cell(0, 6, `FECHA: ${fecha}`, 0, 0, 'R');
        pdf.Ln(5);
        pdf.Cell(0, 6, `HORA: ${hora}`, 0, 0, 'R');
        pdf.Ln(5);
        pdf.Cell(10, 6, 'ID', 1, 0);
        pdf.Cell(60, 6, 'NOMBRE', 1, 0);
        pdf.Cell(60, 6, 'COSTO', 1, 0);
        pdf.Cell(50, 6, 'PRECIO', 1, 0);
        pdf.Cell(50, 6, 'STOCK', 1, 0);
        pdf.Cell(50, 6, 'IVA', 1, 0);
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
        pdf.Cell(60, 6, fila.costo);
        pdf.Cell(50, 6, fila.precio);
        pdf.Cell(50, 6, fila.stock);
        pdf.Cell(50, 6, fila.iva);
        pdf.Ln(5);
    });

    const pdfBase64 = pdf.Output('base64');
    const nombre = "producto";

    datos = { status: 200, data: { archivo: pdfBase64, nombre: nombre } }
    res.send(datos);
}