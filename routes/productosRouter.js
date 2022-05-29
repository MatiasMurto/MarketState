const express = require('express')
const router = express.Router()
const ProductoController = require("../controllers/ProductoController")

// Buscar
router.get('', function (req, res, next) {
    ProductoController.getAll(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    ProductoController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    ProductoController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    ProductoController.delete(req, res, next)
});

// Listado
router.get('/listado', (req, res, next) => {
    ProductoController.list(req, res, next)
});


module.exports = router
