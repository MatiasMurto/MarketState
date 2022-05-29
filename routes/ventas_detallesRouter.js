const express = require('express')
const router = express.Router()
const VentaDetalleController = require("../controllers/VentaDetalleController")

// Buscar
router.get('/venta_cabecera/:id', function (req, res, next) {
    VentaDetalleController.getVentaCabecera(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    VentaDetalleController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    VentaDetalleController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    VentaDetalleController.delete(req, res, next)
});

module.exports = router
