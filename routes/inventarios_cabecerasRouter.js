const express = require('express')
const router = express.Router()
const InventarioCabeceraController = require("../controllers/InventarioCabeceraController")

// Buscar
router.get('', function (req, res, next) {
    InventarioCabeceraController.getAll(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    InventarioCabeceraController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    InventarioCabeceraController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    InventarioCabeceraController.delete(req, res, next)
});

// Consulta
router.get('/consulta', function (req, res, next) {
    InventarioCabeceraController.consult(req, res, next)
});

// Informes
router.get('/informe/inventarios_meses', function (req, res, next) {
    InventarioCabeceraController.salesMonth(req, res, next)
});


module.exports = router
