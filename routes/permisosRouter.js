const express = require('express')
const router = express.Router()
const PermisoController = require("../controllers/PermisoController")

// Buscar por roles
router.get('/buscar/rol', async (req, res, next) => {
    PermisoController.getRol(req, res, next)
});

// Agregar
router.post('', function (req, res, next) {
    PermisoController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    PermisoController.update(req, res, next)
});

module.exports = router

