const express = require('express')
const router = express.Router()
const CompraCabeceraController = require("../controllers/CompraCabeceraController")

// Buscar
router.get('', function (req, res, next) {
    CompraCabeceraController.getAll(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    CompraCabeceraController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    CompraCabeceraController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    CompraCabeceraController.delete(req, res, next)
});

// Consulta
router.get('/consulta', function (req, res, next) {
    CompraCabeceraController.consult(req, res, next)
});

// Informes
router.get('/informe/compras_meses', function (req, res, next) {
    CompraCabeceraController.salesMonth(req, res, next)
});


module.exports = router
