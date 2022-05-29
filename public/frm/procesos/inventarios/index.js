inicializador_formulario(); 

function inicializador_formulario() {
    document.getElementById('fecha').value = get_hoy()
    document.querySelector('#observaciones').focus();

    siguiente_campo('#observaciones', '#boton-guardar', true);

    siguiente_campo('#producto', '#cantidad', false);
    siguiente_campo('#cantidad', '#boton-guardar-detalle', false);
    buscar_inventarios();
    id_inventario_cabecera = 0;
    id_inventario_detalle = 0;
}

function editar_linea(xthis) {
    id_inventario_cabecera = xthis.parentElement.parentElement.getAttribute('datos-id_inventario_cabecera')
    const tds = xthis.parentElement.parentElement.children
    const fecha = tds[0].innerText
    const observaciones = tds[1].innerText
    document.getElementById('fecha').value = fecha
    document.getElementById('observaciones').value = observaciones
    focus('#fecha')
    document.getElementById('boton-guardar').innerHTML = '<i class="bi bi-pencil-fill"></i>  Modificar'
    buscar_inventarios_detalle()
}

function editar_linea_detalle(xthis) {
    id_inventario_detalle = xthis.parentElement.parentElement.getAttribute('datos-id_inventario_detalle')
    id_producto = xthis.parentElement.parentElement.getAttribute('datos-id_producto')
    const tds = xthis.parentElement.parentElement.children
    const cantidad = tds[0].innerText
    const producto = tds[1].innerText
    const precio = tds[2].innerText
    const total = tds[3].innerText
    document.getElementById('cantidad').value = cantidad
    document.getElementById('producto').value = producto
    document.getElementById('precio').value = precio
    document.getElementById('total').value = total
    focus('#producto')
    document.getElementById('boton-guardar-detalle').innerHTML = '<i class="bi bi-pencil-fill"></i>  Modificar Detalle'
}

function agregar_linea() {
    id_inventario_cabecera = 0
    document.getElementById('fecha').value = get_hoy()
    document.getElementById('observaciones').value = '1'
    document.getElementById('tbody-datos-inventarios-detalle').innerHTML = ''
    document.getElementById('total_inventario').innerHTML = 0
    document.querySelector('#observaciones').focus();
    document.getElementById('boton-guardar').innerHTML = '<i class="bi bi-plus-lg"></i>  Agregar'
}

function agregar_linea_detalle() {
    id_inventario_detalle = 0
    id_producto = 0
    document.getElementById('producto').value = ''
    document.getElementById('cantidad').value = 1
    document.getElementById('precio').value = ''
    document.getElementById('total').value = ''
    document.querySelector('#producto').focus();
    document.getElementById('boton-guardar-detalle').innerHTML = '<i class="bi bi-plus-lg"></i>  Agregar Detalle'
}

function eliminar_linea(xthis) {
    id_inventario_cabecera_eliminar = xthis.parentElement.parentElement.getAttribute('datos-id_inventario_cabecera')
    mensaje_confirmar('Seguro que quiere eliminar este registro?', 'Eliminar', 'guardar_eliminar()')
}

function eliminar_linea_detalle(xthis) {
    id_inventario_detalle_eliminar = xthis.parentElement.parentElement.getAttribute('datos-id_inventario_detalle')
    mensaje_confirmar('Seguro que quiere eliminar este registro?', 'Eliminar', 'guardar_eliminar_detalle()')
}

function guardar() {
    if (validar_formulario()) {
        if (id_inventario_cabecera === 0) {
            guardar_agregar(false)
        } else {
            guardar_modificar()
        }
    }
}; 

function guardar_detalle() {
    if (id_inventario_cabecera === 0) {
        if (validar_formulario()) {
            guardar_agregar(true)
        }
    } else {
        if (validar_formulario_detalle()) {
            if (id_inventario_detalle === 0) {
                guardar_agregar_detalle()
            } else {
                guardar_modificar_detalle()
            }
        }
    }
}; 

function validar_formulario() {
    let ok = true
    const fecha = document.getElementById('fecha')
    const observaciones = document.getElementById('observaciones')
    const cliente = document.getElementById('cliente')
    if (fecha.value.trim() === '') {
        mensaje_formulario('#fecha','Fecha vacia.')
        ok = false
    } else if (observaciones.value.trim() === '') {
        mensaje_formulario('#observaciones','Condición vacia.')
        ok = false
    }
    return ok
};

function validar_formulario_detalle() {
    let ok = true
    const producto = document.getElementById('producto')
    const cantidad = document.getElementById('cantidad')
    if (producto.value.trim() === '') {
        mensaje_formulario('#producto','Producto vacio.')
        ok = false
    } else if (cantidad.value.trim() === '') {
        mensaje_formulario('#cantidad','Cantidad vacia.')
        ok = false
    } else if(cantidad.value <= 0) {
        mensaje_formulario('#cantidad','Cantidad menor o igual a cero.')
        ok = false
    }
    return ok
};

// llamadas al servidor
async function buscar_inventarios() {
    const buscar = document.getElementById('buscar').value
    const url = `/api/v1/inventarios_cabeceras?buscar=${buscar}`
    var parametros = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    console.log(json);
    const tbody = document.getElementById('tbody-datos-inventarios');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr datos-id_inventario_cabecera=${json.datos[item].id} datos-id_cliente=${json.datos[item].id_cliente}>
                            <td>${json.datos[item].fecha.replace('T',' ').replace('.000Z','')}</td>
                            <td>${json.datos[item].observaciones}</td>
                            <td class="text-center">
                                <button type="button" class="btn btn-outline-warning btn-sm" onclick='editar_linea(this)'>
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button type="button" class="btn btn-outline-danger btn-sm" onclick='eliminar_linea(this)'>
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>`;
            lineas += linea;
        }
    }
    if (lineas === '') {
        lineas = `<tr><td colspan="3" class="text-center">No hay registros....</td></tr>`
    }
    tbody.innerHTML = lineas;
}

async function buscar_inventarios_detalle() {
    let url = `/api/v1/inventarios_detalles/inventario_cabecera/${id_inventario_cabecera}`;
    var parametros = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    console.log(json);
    const tbody = document.getElementById('tbody-datos-inventarios-detalle');
    tbody.innerText = '';
    let lineas = '';
    let total_inventario = 0
    if (json.status === 200) {
        for (let item in json.datos) {
            let total = json.datos[item].cantidad * json.datos[item].precio
            total_inventario += total
            let linea = `<tr datos-id_inventario_detalle=${json.datos[item].id} datos-id_producto=${json.datos[item].id_producto}>
                            <td class='text-end'>${json.datos[item].cantidad}</td>
                            <td>${json.datos[item].nombre_producto}</td>
                            <td class='text-end'>${json.datos[item].precio}</td>
                            <td class='text-end'>${total}</td>
                            <td class="text-center">
                                <button type="button" class="btn btn-outline-warning btn-sm" onclick='editar_linea_detalle(this)'>
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button type="button" class="btn btn-outline-danger btn-sm" onclick='eliminar_linea_detalle(this)'>
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>`;
            lineas += linea;
        }
    }
    if (lineas === '') {
        lineas = `<tr><td colspan="5" class="text-center">No hay registros....</td></tr>`
    }
    tbody.innerHTML = lineas;
    document.getElementById('total_inventario').innerText = total_inventario
}

async function guardar_agregar(detalle) {
    let url = '/api/v1/inventarios_cabeceras';
    let fecha = document.getElementById('fecha').value;
    let observaciones = document.getElementById('observaciones').value;
    let data = {
        fecha: fecha,
        observaciones: observaciones
    };
    var parametros = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    var datos = await fetch(url, parametros);
    const json = await datos.json();
    console.log(json);
    buscar_inventarios();
    if(detalle){
        id_inventario_cabecera = json.data.id_inventario_cabecera
        if (validar_formulario_detalle()) {
            guardar_agregar_detalle()
        }
    } else {
        agregar_linea();
    }
};

async function guardar_agregar_detalle() {
    let url = `/api/v1/inventarios_detalles`;
    let cantidad = document.getElementById('cantidad').value;
    let precio = document.getElementById('precio').value;
    let data = {
        id_inventario_cabecera: id_inventario_cabecera,
        id_producto: id_producto,
        cantidad: cantidad,
        costo: costo,
        precio: precio
    };
    var parametros = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    var datos = await fetch(url, parametros);
    const json = await datos.json();
    console.log(json);
    buscar_inventarios_detalle();
    agregar_linea_detalle();
};

async function guardar_modificar() {
    let url = `/api/v1/inventarios_cabeceras/${id_inventario_cabecera}`;
    let fecha = document.getElementById('fecha').value;
    let observaciones = document.getElementById('observaciones').value;
    let data = {
        fecha: fecha,
        observaciones: observaciones
    };
    console.log(data);
    let parametros = {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    let datos = await fetch(url, parametros);
    const json = await datos.json();
    console.log(json);
    buscar_inventarios();
    agregar_linea();
};

async function guardar_modificar_detalle() {
    let url = `/api/v1/inventarios_detalles/${id_inventario_detalle}`;
    let cantidad = document.getElementById('cantidad').value;
    let precio = document.getElementById('precio').value;
    let data = {
        id_inventario_cabecera: id_inventario_cabecera,
        id_producto: id_producto,
        cantidad: cantidad,
        costo: costo,
        precio: parseInt(precio)
    };
    console.log(data);
    let parametros = {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    let datos = await fetch(url, parametros);
    const json = await datos.json();
    console.log(json);
    buscar_inventarios_detalle();
    agregar_linea_detalle();
};

async function guardar_eliminar() {
    let url = `/api/v1/inventarios_cabeceras/${id_inventario_cabecera_eliminar}`;
    let data = {};
    let parametros = {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(parametros)
    let datos = await fetch(url, parametros);
    const json = await datos.json();
    console.log(json);
    buscar_inventarios();
};

async function guardar_eliminar_detalle() {
    let url = `/api/v1/inventarios_detalles/${id_inventario_detalle_eliminar}`;
    let data = {};
    let parametros = {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(parametros)
    let datos = await fetch(url, parametros);
    const json = await datos.json();
    console.log(json);
    buscar_inventarios_detalle();
};

// PRODUCTOS 
async function buscar_producto() {
    let buscar = document.getElementById('producto').value;
    let url = `/api/v1/productos?buscar=${buscar}`;

    var parametros = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    var datos = await fetch(url, parametros)
    const json = await datos.json();
    console.log(json)
    const tbody = document.getElementById('tbody-datos-elegir-producto');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr data-id_producto=${json.datos[item].id} data-costo=${json.datos[item].costo} data-precio=${json.datos[item].precio} onclick="elegir_producto(this)">
                            <td>${json.datos[item].nombre}</td>
                         </tr>`;
            lineas += linea;
        }
    }
    if (lineas === '') {
        lineas = `<tr><td class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
}

function elegir_producto(xthis) {
    id_producto = parseInt(xthis.getAttribute('data-id_producto'));
    costo = parseInt(xthis.getAttribute('data-costo'));
    const precio = parseInt(xthis.getAttribute('data-precio'));
    const tds = xthis.children;
    const nombre = tds[0].innerText;
    document.getElementById('producto').value = nombre;
    document.getElementById('precio').value = precio;
    calcular_total_linea_detalle();
    salir_buscador('modal_buscador-producto');
}

function calcular_total_linea_detalle(){
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;
    document.getElementById('total').value = cantidad * precio;
}
