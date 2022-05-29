const express = require('express')
const router = express.Router()
const ConfiguracionController = require("../controllers/ConfiguracionController")


// Recargar
router.get('/:id_configuraciones', function (req, res, next) {
    ConfiguracionController.getOne(req, res, next)
})

// Modificar
router.put('/:id_configuraciones', function (req, res, next) {
    ConfiguracionController.update(req, res, next)
});

module.exports = router
