var express = require('express');
var router = express.Router();
const pool = require('../databases/db')

router.get('/', async (req, res, next) => {
    const sql = `SELECT id, nombre, costo, precio, stock 
                      FROM productos
                      ORDER BY id DESC
                      `;
    const result = await pool.query(sql, [])
    res.render('index', { result: result });
});

router.get('/admin', (req, res, next) => {
    res.render('admin', { title: 'Express' });
});

router.get('/menu', (req, res, next) => {
    res.render('menu', { title: 'Express' });
});

module.exports = router;
