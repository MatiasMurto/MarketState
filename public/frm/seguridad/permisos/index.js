inicializar_formulario()

function inicializar_formulario(){
    focus('#rol')
    id_rol = 0
}

function guardar_permiso(xthis){
    const xid_permiso = xthis.parentNode.parentNode.getAttribute('data-id_permiso')
    const xid_formulario = xthis.parentNode.parentNode.getAttribute('data-id_formulario')
    const tds = xthis.parentNode.parentNode.children
    const agregar = tds[2].children[0].checked ? 1: 0
    const modificar = tds[3].children[0].checked ? 1: 0
    const eliminar = tds[4].children[0].checked ? 1: 0
    if (xid_permiso === 'null') {
        guardar_permiso_agregar(xid_formulario, agregar, modificar, eliminar)
    } else {
        guardar_permiso_modificar(xid_permiso, xid_formulario, agregar, modificar, eliminar)
    }
}

// Llamadas al servidor
async function buscar_formularios_permisos(){
    let url = `/api/v1/formularios/rol/${id_rol}/permisos`;
    var parametros = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    var datos = await fetch(url, parametros)
    const json = await datos.json();
    const tbody = document.getElementById('tbody-datos-formularios');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            var agregar = json.datos[item].agregar === 1 ? 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)" checked>` : 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)">`;
            var modificar = json.datos[item].modificar === 1 ? 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)" checked>` : 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)">`;
            var eliminar = json.datos[item].eliminar === 1 ? 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)" checked>` : 
                          `<input type="checkbox" class="form-check-input" onchange="guardar_permiso(this)">`;
            let linea = `<tr data-id_permiso=${json.datos[item].id_permiso} data-id_formulario=${json.datos[item].id_formulario}>
                            <td>${json.datos[item].nombre}</td>
                            <td>${json.datos[item].nombre_submenu}</td>
                            <td class="text-center">${agregar}</td>
                            <td class="text-center">${modificar}</td>
                            <td class="text-center">${eliminar}</td>
                        </tr>`;
             lineas += linea;
        }
    }
    if(lineas === ''){
        lineas = `<tr><td colspan="5" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
}

async function buscar_rol() {
    let buscar = document.getElementById('rol').value;
    let url = `/api/v1/roles?buscar=${buscar}`;

    var parametros = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    var datos = await fetch(url, parametros)
    const json = await datos.json();
    const tbody = document.getElementById('tbody-datos-elegir-rol');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr data-id_rol=${json.datos[item].id} onclick="elegir_rol(this)">
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

function elegir_rol(xthis) {
    id_rol = parseInt(xthis.getAttribute('data-id_rol'));
    const tds = xthis.children;
    const nombre = tds[0].innerText;
    document.getElementById('rol').value = nombre;
    salir_buscador('modal-buscador-rol');
    buscar_formularios_permisos();
}

async function guardar_permiso_agregar(xid_formulario, agregar, modificar, eliminar){
    let url = '/api/v1/permisos';

    var data = {
        id_rol: id_rol,
        id_formulario: xid_formulario,
        agregar: agregar,
        modificar: modificar,
        eliminar: eliminar
    };

    var parametros = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    buscar_formularios_permisos();
}

async function guardar_permiso_modificar(xid_permiso, xid_formulario, agregar, modificar, eliminar){
    let url = `/api/v1/permisos/${xid_permiso}`;

    var data = {
        id_rol: id_rol,
        id_formulario: xid_formulario,
        agregar: agregar,
        modificar: modificar,
        eliminar: eliminar
    };

    var parametros = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    buscar_formularios_permisos();
}