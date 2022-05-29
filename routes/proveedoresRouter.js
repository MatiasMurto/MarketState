const express = require('express')
const router = express.Router()
const ProveedorController = require("../controllers/ProveedorController")

// Buscar
router.get('', function (req, res, next) {
    ProveedorController.getAll(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    ProveedorController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    ProveedorController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    ProveedorController.delete(req, res, next)
});

// Listado
router.get('/listado', (req, res, next) => {
    ProveedorController.list(req, res, next)
});

module.exports = router
