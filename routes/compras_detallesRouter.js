const express = require('express')
const router = express.Router()
const CompraDetalleController = require("../controllers/CompraDetalleController")

// Buscar
router.get('/compra_cabecera/:id', function (req, res, next) {
    CompraDetalleController.getCompraCabecera(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    CompraDetalleController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    CompraDetalleController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    CompraDetalleController.delete(req, res, next)
});

module.exports = router
