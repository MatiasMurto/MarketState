id_configuraciones = 1
inicializar_formulario()

function inicializar_formulario() {
    buscar_id()
    focus('#nombre')
    siguiente_campo('#nombre','#direccion',false)
    siguiente_campo('#direccion','#telefono',false)
    siguiente_campo('#telefono','#ruc',false)
    siguiente_campo('#ruc','#email',false)
    siguiente_campo('#email','#boton-guardar', true)
}

function guardar(){
    if (validar_formulario()) {
        guardar_modificar()
    }
}

function validar_formulario() {
    let ok = true
    const nombre = document.getElementById('nombre')
    const direccion = document.getElementById('direccion')
    const telefono = document.getElementById('telefono')
    const ruc = document.getElementById('ruc')
    const email = document.getElementById('email')
    if (nombre.value.trim() === '') {
        mensaje_formulario('#nombre','Nombre vacio.')
        ok = false
    } else if (direccion.value.trim() === '') {
        mensaje_formulario('#direccion','Dirección vacia.')
        ok = false
    } else if (telefono.value === '') {
        mensaje_formulario('#telefono','Teléfono vacio.')
        ok = false
    } else if (ruc.value === '') {
        mensaje_formulario('#telefono','Teléfono vacio.')
        ok = false
    } else if (email.value === '') {
        mensaje_formulario('#email','Email vacio.')
        ok = false
    }
    return ok
}

// Servidor
async function buscar_id() {
    let url = `/api/v1/configuraciones/${id_configuraciones}`;

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
    if (json.status === 200) {
        document.getElementById('nombre').value = json.datos[0].nombre
        document.getElementById('direccion').value = json.datos[0].direccion
        document.getElementById('telefono').value = json.datos[0].telefono
        document.getElementById('ruc').value = json.datos[0].ruc
        document.getElementById('email').value = json.datos[0].email
        focus('#nombre')
    }

}

async function guardar_modificar() {
    let url = `/api/v1/configuraciones/${id_configuraciones}`;
    let nombre = document.getElementById('nombre').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    let ruc = document.getElementById('ruc').value;
    let email = document.getElementById('email').value;

    var data = {
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        ruc: ruc,
        email: email
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
    if (json.status === 200) {
        mensaje_formulario('#nombre','Datos Modificados.')
    } else {
        mensaje.classList.remove('d-none')
        mensaje_formulario('#nombre','Datos NO Modificados.')
    }

}