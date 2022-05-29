var archivo = '';
inicializar_formulario();

function inicializar_formulario() {
    buscar_backups();
}

function realizar_backup(xthis) {
    mensaje_confirmar("¿Está seguro de realizar una copia de seguridad ahora?", "Realizar Backup", "comenzar_backup()");
}

function comenzar_backup() {
    realizar();
}

function recuperar_linea(xthis) {
    const tds = xthis.parentElement.parentElement.children;
    archivo = tds[0].innerText;
    mensaje_confirmar("¿Está seguro de recuperar esta copia de seguridad?<br>ATENCION: Sus datos actuales serán eliminados.", "Recuperar", "recuperar_backup()");
}

function recuperar_backup() {
    recuperar();
}

function eliminar_linea(xthis) {
    const tds = xthis.parentElement.parentElement.children;
    archivo = tds[0].innerText;
    mensaje_confirmar("¿Está seguro de eliminar esta copia de seguridad?", "Eliminar", "eliminar_backup()");
}

function eliminar_backup() {
    eliminar();
}

function salir_formulario() {
    document.getElementById('panel-lista').innerText = '';
}

// Llamadas al Servidor
async function buscar_backups() {
    let buscar = document.getElementById('buscar').value;
    let url = `api/v1/backups?buscar=${buscar}`;

    var parametros = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    var datos = await fetch(url, parametros)
    const json = await datos.json();
    const tbody = document.getElementById('tbody-datos-backups');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.data) {
            let linea = `<tr>
                            <td>${json.data[item]}</td>
                            <td class="text-center">
                                <button class="btn btn-outline-danger btn-sm" onclick='recuperar_linea(this)'' >
                                    <i class="fas fa-download"></i>
                                </button>
                                <button class="btn btn-outline-danger btn-sm" onclick='eliminar_linea(this)''>
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>`;
            lineas += linea;
        }
    }
    if (lineas === '') {
        lineas = `<tr><td colspan="2" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
}

async function realizar() {
    let url = 'api/v1/backups';

    var data = {};

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
    setTimeout(buscar_backups, 5000);
}

async function eliminar() {
    let url = 'api/v1/backups';

    var data = {
        archivo: archivo
    };

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
    buscar_backups();
}

async function recuperar() {
    let url = 'api/v1/backups';

    var data = {
        archivo: archivo
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
}
