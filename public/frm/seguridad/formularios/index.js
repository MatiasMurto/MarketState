inicializar_formulario()

function inicializar_formulario(){
    focus('#nombre')
    siguiente_campo('#nombre','#url', false)
    siguiente_campo('#url','#submenu', false)
    siguiente_campo('#submenu','#boton-guardar', true)
    buscar_formularios()
    id_formulario = 0
}

function editar_linea(xthis){
    id_formulario = xthis.parentElement.parentElement.getAttribute('data-id_formulario')
    id_submenu = xthis.parentElement.parentElement.getAttribute('data-id_submenu')
    const tds = xthis.parentElement.parentElement.children
    const nombre = tds[0].innerText
    const url = tds[1].innerText
    const submenu = tds[2].innerText
    document.getElementById('nombre').value = nombre
    document.getElementById('url').value = url
    document.getElementById('submenu').value = submenu
    focus('#nombre')
    document.getElementById('boton-guardar').innerHTML = '<i class="fas fa-pencil-alt"></i> Modificar'
}

function agregar_linea(){
    id_formulario = 0
    id_submenu = 0
    document.getElementById('nombre').value = ''
    document.getElementById('url').value = ''
    document.getElementById('submenu').value = ''
    focus('#nombre')
    document.getElementById('boton-guardar').innerHTML = '<i class="fas fa-plus"></i> Agregar'
}

function eliminar_linea(xthis){
    id_formulario_eliminar = xthis.parentElement.parentElement.getAttribute('data-id_formulario')
    mensaje_confirmar('¿Está seguro de eliminar este registro?','Eliminar','guardar_eliminar()')
}

function guardar(){
    if (validar_formulario()) {
        if (id_formulario === 0) {
            guardar_agregar()
        } else {
            guardar_modificar()
        }
    }
}

function validar_formulario(){
    let ok = true
    const nombre = document.getElementById('nombre')
    const url = document.getElementById('url')
    if (nombre.value.trim() === '') {
        mensaje_formulario('#nombre','Nombre vacio.')
        ok = false
    } else if (url.value.trim() === '') {
        mensaje_formulario('#url','Url vacia.')
        ok = false
    }
    return ok
}

// Llamadas al Servidor
async function buscar_formularios() {
    let buscar = document.getElementById('buscar').value;
    let url2 = `/api/v1/formularios?buscar=${buscar}`;
    var parametros = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var datos = await fetch(url2, parametros)
    const json = await datos.json();
    const tbody = document.getElementById('tbody-datos-formularios');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr data-id_formulario=${json.datos[item].id} data-id_submenu=${json.datos[item].id_submenu}>
                            <td>${json.datos[item].nombre}</td>
                            <td>${json.datos[item].url}</td>
                            <td>${json.datos[item].nombre_submenu}</td>
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
    if(lineas === ''){
        lineas = `<tr><td colspan="4" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
}

async function guardar_agregar(){
    let url2 = '/api/v1/formularios';
    let nombre = document.getElementById('nombre').value;
    let url = document.getElementById('url').value;

    var data = {
        nombre: nombre,
        url: url,
        id_submenu: id_submenu
    };

    var parametros = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    var datos = await fetch(url2, parametros)
    const json = await datos.json();
    buscar_formularios();
    agregar_linea();
}

async function guardar_modificar(){
    let url2 = `/api/v1/formularios/${id_formulario}`;
    let nombre = document.getElementById('nombre').value;
    let url = document.getElementById('url').value;

    var data = {
        nombre: nombre,
        url: url,
        id_submenu: id_submenu
    };

    var parametros = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    var datos = await fetch(url2, parametros)
    const json = await datos.json();
    buscar_formularios();
    agregar_linea();
}

async function guardar_eliminar(){
    let url2 = `/api/v1/formularios/${id_formulario_eliminar}`;

    var data = {};

    var parametros = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    var datos = await fetch(url2, parametros)
    const json = await datos.json();
    buscar_formularios();
}

// Submenus
async function buscar_submenu() {
    let buscar = document.getElementById('submenu').value;
    let url2 = `/api/v1/submenus?buscar=${buscar}`;

    var parametros = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    var datos = await fetch(url2, parametros)
    const json = await datos.json();
    const tbody = document.getElementById('tbody-datos-elegir-submenu');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr data-id_submenu=${json.datos[item].id} onclick="elegir_submenu(this)">
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

function elegir_submenu(xthis) {
    id_submenu = parseInt(xthis.getAttribute('data-id_submenu'));
    const tds = xthis.children;
    const nombre = tds[0].innerText;
    document.getElementById('submenu').value = nombre;
    salir_buscador('modal-buscador-submenu');
}