inicializar_formulario()

function inicializar_formulario(){
    focus('#nombre')
    siguiente_campo('#nombre','#boton-guardar', true)
    buscar_submenus()
    id_submenu = 0
}

function editar_linea(xthis){
    id_submenu = xthis.parentElement.parentElement.getAttribute('data-id_submenu')
    const tds = xthis.parentElement.parentElement.children
    const nombre = tds[0].innerText
    document.getElementById('nombre').value = nombre
    focus('#nombre')
    document.getElementById('boton-guardar').innerHTML = '<i class="bi bi-pencil"></i> Modificar'
}

function agregar_linea(){
    id_submenu = 0
    document.getElementById('nombre').value = ''
    focus('#nombre')
    document.getElementById('boton-guardar').innerHTML = '<i class="bi bi-plus-lg"></i> Agregar'
}

function eliminar_linea(xthis){
    id_submenu_eliminar = xthis.parentElement.parentElement.getAttribute('data-id_submenu')
    mensaje_confirmar('¿Está seguro de eliminar este registro?','Eliminar','guardar_eliminar()')
}

function guardar(){
    if (validar_formulario()) {
        if (id_submenu === 0) {
            guardar_agregar()
        } else {
            guardar_modificar()
        }
    }
}

function validar_formulario(){
    let ok = true
    const nombre = document.getElementById('nombre')
    if (nombre.value.trim() === '') {
        mensaje_formulario('#nombre','Nombre vacio.')
        ok = false
    }
    return ok
}

// Llamadas al Servidor
async function buscar_submenus() {
    let buscar = document.getElementById('buscar').value;
    let url = `/api/v1/submenus?buscar=${buscar}`;
    
    var parametros = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    const tbody = document.getElementById('tbody-datos-submenus');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr data-id_submenu=${json.datos[item].id}>
                            <td>${json.datos[item].nombre}</td>
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
        lineas = `<tr><td colspan="2" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
}

async function guardar_agregar(){
    let url = '/api/v1/submenus';
    let nombre = document.getElementById('nombre').value;

    var data = {
        nombre: nombre,
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
    buscar_submenus();
    agregar_linea();
}

async function guardar_modificar(){
    let url = `/api/v1/submenus/${id_submenu}`;
    let nombre = document.getElementById('nombre').value;

    var data = {
        nombre: nombre
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
    buscar_submenus();
    agregar_linea();
}

async function guardar_eliminar(){
    let url = `/api/v1/submenus/${id_submenu_eliminar}`;

    var data = {};

    var parametros = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    buscar_submenus();
}

