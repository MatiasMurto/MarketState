const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const menuRouter = require('./routes/menu');

// Api
const usuariosRouter = require('./routes/usuariosRouter');
const rolesRouter = require('./routes/rolesRouter');
const formulariosRouter = require('./routes/formulariosRouter');
const submenusRouter = require('./routes/submenusRouter');
const permisosRouter = require('./routes/permisosRouter');
const backupsRouter = require('./routes/backupsRouter');
const clientesRouter = require('./routes/clientesRouter');
const productosRouter = require('./routes/productosRouter');
const proveedoresRouter = require('./routes/proveedoresRouter');
const compras_cabecerasRouter = require('./routes/compras_cabecerasRouter');
const compras_detallesRouter = require('./routes/compras_detallesRouter');
const inventarios_cabecerasRouter = require('./routes/inventarios_cabecerasRouter');
const inventarios_detallesRouter = require('./routes/inventarios_detallesRouter');
const ventas_cabecerasRouter = require('./routes/ventas_cabecerasRouter');
const ventas_detallesRouter = require('./routes/ventas_detallesRouter');
const configuracionRouter = require('./routes/configuracionRouter');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/menu', menuRouter);

// Api
app.use('/api/v1/usuarios', usuariosRouter);
app.use('/api/v1/roles', rolesRouter);
app.use('/api/v1/formularios', formulariosRouter);
app.use('/api/v1/submenus', submenusRouter);
app.use('/api/v1/permisos', permisosRouter);
app.use('/api/v1/backups', backupsRouter);
app.use('/api/v1/clientes', clientesRouter);
app.use('/api/v1/productos', productosRouter);
app.use('/api/v1/proveedores', proveedoresRouter);
app.use('/api/v1/compras_cabeceras', compras_cabecerasRouter);
app.use('/api/v1/compras_detalles', compras_detallesRouter);
app.use('/api/v1/inventarios_cabeceras', inventarios_cabecerasRouter);
app.use('/api/v1/inventarios_detalles', inventarios_detallesRouter);
app.use('/api/v1/ventas_cabeceras', ventas_cabecerasRouter);
app.use('/api/v1/ventas_detalles', ventas_detallesRouter);
app.use('/api/v1/configuraciones', configuracionRouter);
module.exports = app;
