inicializador_formulario();

var map = L.map('mapid').setView([-25.3253331, -57.5255339], 18);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([-25.3253331, -57.5255339], {
    draggable: 'true'
}).addTo(map)

document.getElementById('localizacion').value = '[-25.3253331, -57.5255339]'

marker.on('move', function (ev) {
    document.getElementById('localizacion').value = `[ ${ev.latlng.lat}  ,  ${ev.latlng.lng} ]`
})


function inicializador_formulario() {
    focus('#nombre');
    siguiente_campo('#nombre', '#direccion', false);
    siguiente_campo('#direccion', '#telefono', false);
    siguiente_campo('#telefono', '#ruc', false);
    siguiente_campo('#ruc', '#email', false);
    siguiente_campo('#email', '#clave', false);
    siguiente_campo('#clave', '#localizacion', false);
    siguiente_campo('#localizacion', '#boton-guardar', true);
    buscar_clientes();
    id_cliente = 0;
}

// llamadas al servidor
async function buscar_clientes() {
    let buscar = document.getElementById('buscar').value;
    let url = `/api/v1/clientes?buscar=${buscar}`;
    var parametros = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    const tbody = document.getElementById('tbody-datos-clientes');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr datos-id_cliente=${json.datos[item].id}>
                            <td>${json.datos[item].nombre}</td>
                            <td>${json.datos[item].direccion}</td>
                            <td>${json.datos[item].telefono}</td>
                            <td>${json.datos[item].ruc}</td>
                            <td>${json.datos[item].email}</td>
                            <td>${json.datos[item].clave}</td>
                            <td>${json.datos[item].localizacion}</td>
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
        lineas = `<tr><td colspan="8" class="text-center">No hay registros....<td><tr>`
    }
    tbody.innerHTML = lineas;
}

function editar_linea(xthis) {
    id_cliente = xthis.parentElement.parentElement.getAttribute('datos-id_cliente')
    const tds = xthis.parentElement.parentElement.children
    const nombre = tds[0].innerText
    const direccion = tds[1].innerText
    const telefono = tds[2].innerText
    const ruc = tds[3].innerText
    const email = tds[4].innerText
    const clave = tds[5].innerText
    const localizacion = tds[6].innerText
    document.getElementById('nombre').value = nombre
    document.getElementById('telefono').value = telefono
    document.getElementById('direccion').value = direccion
    document.getElementById('ruc').value = ruc
    document.getElementById('localizacion').value = localizacion
    document.getElementById('email').value = email
    document.getElementById('clave').value = clave
    focus('#nombre')
    document.getElementById('boton-guardar').innerHTML = '<i class="fas fa-pencil-alt"></i> Modificar'
}

function agregar_linea() {
    id_cliente = 0
    document.getElementById('nombre').value = ''
    document.getElementById('telefono').value = ''
    document.getElementById('direccion').value = ''
    document.getElementById('ruc').value = ''
    document.getElementById('localizacion').value = ''
    document.getElementById('email').value = ''
    document.getElementById('clave').value = ''
    focus('#nombre')
    document.getElementById('boton-guardar').innerHTML = '<i class="bi bi-plus-lg"></i>  Agregar'
}

function eliminar_linea(xthis) {
    id_cliente_eliminar = xthis.parentElement.parentElement.getAttribute('datos-id_cliente')
    mensaje_confirmar('Seguro que quiere eliminar este registro?', 'Eliminar', 'guardar_eliminar()')
}

function guardar() {
    if (validar_formulario()) {
        if (id_cliente === 0) {
            guardar_agregar()
        } else {
            guardar_modificar()
        }
    }
};

function validar_formulario() {
    let ok = true
    const nombre = document.getElementById('nombre')
    const direccion = document.getElementById('direccion')
    const telefono = document.getElementById('telefono')
    const ruc = document.getElementById('ruc')
    const email = document.getElementById('email')
    const clave = document.getElementById('clave')
    const localizacion = document.getElementById('localizacion')
    if (nombre.value.trim() === '') {
        mensaje_formulario('#nombre','Nombre vacio.')
        ok = false
    } else if (direccion.value.trim() === '') {
        mensaje_formulario('#direccion','Dirección vacia.')
        ok = false
    } else if (telefono.value.trim() === '') {
        mensaje_formulario('#telefono','Telefono vacio.')
        ok = false
    } else if (ruc.value.trim() === '') {
        mensaje_formulario('#ruc','RUC vacio.')
        ok = false
    } else if (email.value.trim() === '') {
        mensaje_formulario('#email','Email vacio.')
        ok = false
    } else if (clave.value.trim() === '') {
        mensaje_formulario('#clave','Contraseña vacia.')
        ok = false
    } else if (localizacion.value.trim() === '') {
        mensaje_formulario('#telefono','Telefono vacio.')
        ok = false
    }
    return ok
};

async function guardar_agregar() {
    let url = '/api/v1/clientes';
    let nombre = document.getElementById('nombre').value;
    let telefono = document.getElementById('telefono').value;
    let direccion = document.getElementById('direccion').value;
    let ruc = document.getElementById('ruc').value;
    let localizacion = document.getElementById('localizacion').value;
    let email = document.getElementById('email').value;
    let clave = document.getElementById('clave').value;
    let data = {
        nombre: nombre,
        telefono: telefono,
        direccion: direccion,
        ruc: ruc,
        localizacion: localizacion,
        email: email,
        clave: clave
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
    buscar_clientes();
    agregar_linea();
};

async function guardar_modificar() {
    let url = `/api/v1/clientes/${id_cliente}`;
    let nombre = document.getElementById('nombre').value;
    let telefono = document.getElementById('telefono').value;
    let direccion = document.getElementById('direccion').value;
    let ruc = document.getElementById('ruc').value;
    let localizacion = document.getElementById('localizacion').value;
    let email = document.getElementById('email').value;
    let clave = document.getElementById('clave').value;
    let data = {
        nombre: nombre,
        telefono: telefono,
        direccion: direccion,
        ruc: ruc,
        localizacion: localizacion,
        email: email,
        clave: clave
    };
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
    buscar_clientes();
    agregar_linea();
};

async function guardar_eliminar() {
    let url = `/api/v1/clientes/${id_cliente_eliminar}`;
    let data = {};
    let parametros = {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    let datos = await fetch(url, parametros);
    const json = await datos.json();
    buscar_clientes();
};