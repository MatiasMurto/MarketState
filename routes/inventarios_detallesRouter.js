const express = require('express')
const router = express.Router()
const InventarioDetalleController = require("../controllers/InventarioDetalleController")

// Buscar
router.get('/inventario_cabecera/:id', function (req, res, next) {
    InventarioDetalleController.getInventarioCabecera(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    InventarioDetalleController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    InventarioDetalleController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    InventarioDetalleController.delete(req, res, next)
});

module.exports = router
