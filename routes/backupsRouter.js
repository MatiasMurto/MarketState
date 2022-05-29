const express = require('express');
const router = express.Router();
const fs = require('fs');
const { exec } = require("child_process");
// Buscar
router.get('', function (req, res, next) {
    let datos = { status: 404, data: [] };
    const buscar = req.query.buscar;
    const directorio = __dirname.substr(0,__dirname.length-6)+"backups";
    const files = fs.readdirSync(directorio);
    let archivos = [];
    files.forEach(archivo => {
        if( archivo.indexOf(buscar) > -1 ){
            archivos.push(archivo);
        }
    });
    datos = { status: 200, data: archivos};
    res.send(datos);
});

// Realizar
router.post('', function (req, res, next) {
    //C:\xampp\mysql\bin\mysqldump --user=root --password=1 app_maquicenter > C:\...\backups\app_maquicenter_20210710_162150.sql
    let archivo = __dirname.substr(0,__dirname.length-6)+"backups\\marketstate-matiasmurto_"+get_fecha_hora_actual()+".sql";
    let sentencia = `C:\\xampp\\mysql\\bin\\mysqldump --user=root --password=1 marketstate-matiasmurto > ${archivo}`;
    exec(sentencia);
    datos = { status: 200, data: {msg: "Backups realizado"}};
    res.send(datos);
});

function get_fecha_hora_actual() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        hora = d.getHours();
        minuto = d.getMinutes();
        segundo = d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year+month+day+"_"+hora+minuto+segundo;
}

// Eliminar
router.delete('', function (req, res, next) {
    let archivo = req.body.archivo;
    let archivo_eliminar = __dirname.substr(0,__dirname.length-6)+"backups\\"+archivo;
    fs.unlinkSync(archivo_eliminar);
    datos = { status: 200, data: {msg: "Backups eliminado"}};
    res.send(datos);
});

// Recuperar
router.put('', function (req, res, next) {
    // mysql --user=root --password=1 [database_name] < [filename].sql
    let archivo = req.body.archivo;
    let archivo_recuperar = __dirname.substr(0,__dirname.length-6)+"backups\\"+archivo;
    let sentencia = `C:\\xampp\\mysql\\bin\\mysql --user=root --password=1 marketstate-matiasmurto < ${archivo_recuperar}`;
    exec(sentencia);
    datos = { status: 200, data: {msg: "Backups recuperado"}};
    res.send(datos);
});

module.exports = router