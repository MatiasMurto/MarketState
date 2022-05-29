const express = require('express')
const router = express.Router()
const VentaCabeceraController = require("../controllers/VentaCabeceraController")

// Buscar
router.get('', function (req, res, next) {
    VentaCabeceraController.getAll(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    VentaCabeceraController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    VentaCabeceraController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    VentaCabeceraController.delete(req, res, next)
});

// Consulta
router.get('/consulta', function (req, res, next) {
    VentaCabeceraController.consult(req, res, next)
});

// Informes
router.get('/informe/ventas_meses', function (req, res, next) {
    VentaCabeceraController.salesMonth(req, res, next)
});

module.exports = router
