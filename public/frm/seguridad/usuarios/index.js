inicializar_formulario()
foto = undefined
modificado = false

function inicializar_formulario() {
    focus('#nombre')
    siguiente_campo('#nombre', '#usuario', false)
    siguiente_campo('#usuario', '#clave', false)
    siguiente_campo('#clave', '#rol', false)
    siguiente_campo('#rol', '#boton-guardar', true)
    buscar_usuarios()
    id_usuario = 0
}

function editar_linea(xthis) {
    modificado = false
    id_usuario = xthis.parentElement.parentElement.getAttribute('data-id_usuario')
    id_rol = xthis.parentElement.parentElement.getAttribute('data-id_rol')
    const tds = xthis.parentElement.parentElement.children
    const nombre = tds[0].innerText
    const usuario = tds[1].innerText
    const clave = tds[2].innerText
    const rol = tds[3].innerText
    const img = 'img/usuarios/' + id_usuario + '.jpg'
    document.getElementById('nombre').value = nombre
    document.getElementById('usuario').value = usuario
    document.getElementById('clave').value = clave
    document.getElementById('rol').value = rol
    document.getElementById('foto-img').setAttribute('src', img)
    focus('#nombre')
    document.getElementById('boton-guardar').innerHTML = '<i class="fas fa-pencil-alt"></i> Modificar'
}

function agregar_linea() {
    modificado = false
    id_usuario = 0
    id_rol = 0
    document.getElementById('nombre').value = ''
    document.getElementById('usuario').value = ''
    document.getElementById('clave').value = ''
    document.getElementById('rol').value = ''
    document.getElementById('foto-img').setAttribute('src', 'img/usuarios/0.jpg')
    focus('#nombre')
    document.getElementById('boton-guardar').innerHTML = '<i class="fas fa-plus"></i> Agregar'
}

function eliminar_linea(xthis) {
    id_usuario_eliminar = xthis.parentElement.parentElement.getAttribute('data-id_usuario')
    mensaje_confirmar('¿Está seguro de eliminar este registro?', 'Eliminar', 'guardar_eliminar()')
}

function guardar() {
    if (validar_formulario()) {
        if (id_usuario === 0) {
            guardar_agregar()
        } else {
            guardar_modificar()
        }
    }
}

function validar_formulario() {
    let ok = true
    const nombre = document.getElementById('nombre')
    const usuario = document.getElementById('usuario')
    const clave = document.getElementById('clave')
    if (nombre.value.trim() === '') {
        mensaje_formulario('#nombre', 'Nombre vacio.')
        ok = false
    } else if (usuario.value.trim() === '') {
        mensaje_formulario('#usuario', 'Usuario vacio.')
        ok = false
    } else if (clave.value.trim() === '') {
        mensaje_formulario('#clave', 'Contraseña vacia.')
        ok = false
    }
    return ok
}

// foto
function cargar_foto(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('foto-img').setAttribute('src', e.target.result);
            foto = input.files[0];
            getBase64(foto).then(data => foto = data);
            modificado = true
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Llamadas al Servidor
async function buscar_usuarios() {
    let buscar = document.getElementById('buscar').value;
    let url = `/api/v1/usuarios?buscar=${buscar}`;
    var parametros = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    const tbody = document.getElementById('tbody-datos-usuarios');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let img = `img/usuarios/${json.datos[item].id}.jpg`
            let foto = `<img src="${img}" alt="${img}" class="img-fluid rounded-circle" style="height: 50px">`
            let linea = `<tr data-id_usuario=${json.datos[item].id} data-id_rol=${json.datos[item].id_rol}>
                            <td>${json.datos[item].nombre}</td>
                            <td>${json.datos[item].usuario}</td>
                            <td>${json.datos[item].clave}</td>
                            <td>${json.datos[item].nombre_rol}</td>
                            <td class="text-center">${foto}</td>
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
        lineas = `<tr><td colspan="6" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
}

async function guardar_agregar() {
    let url = '/api/v1/usuarios';
    let nombre = document.getElementById('nombre').value;
    let usuario = document.getElementById('usuario').value;
    let clave = document.getElementById('clave').value;

    var data = {
        nombre: nombre,
        usuario: usuario,
        clave: clave,
        id_rol: id_rol,
        foto: foto,
        modificado: modificado
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
    buscar_usuarios();
    agregar_linea();
}

async function guardar_modificar() {
    let url = `/api/v1/usuarios/${id_usuario}`;
    let nombre = document.getElementById('nombre').value;
    let usuario = document.getElementById('usuario').value;
    let clave = document.getElementById('clave').value;

    var data = {
        nombre: nombre,
        usuario: usuario,
        clave: clave,
        id_rol: id_rol,
        foto: foto,
        modificado: modificado
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
    buscar_usuarios();
    agregar_linea();
}

async function guardar_eliminar() {
    let url = `/api/v1/usuarios/${id_usuario_eliminar}`;

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
    buscar_usuarios();
}

// Roles
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
}
