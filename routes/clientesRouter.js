const express = require('express')
const router = express.Router()
const ClienteController = require("../controllers/ClienteController")
const fs = require("fs")

// Login
router.post('/login', async (req, res, next) => {
    ClienteController.login(req, res, next)
})

// Buscar
router.get('', function (req, res, next) {
    ClienteController.getAll(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    ClienteController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    ClienteController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    ClienteController.delete(req, res, next)
});

// Modificar clave
router.put('/:id/modificar_clave', function (req, res, next) {
    ClienteController.changePassword(req, res, next)
});

// Listado
router.get('/listado', (req, res, next) => {
    ClienteController.list(req, res, next)
});

module.exports = router
