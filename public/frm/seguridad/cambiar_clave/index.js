inicializar_formulario()

function inicializar_formulario() {
    id_usuario = localStorage.getItem('id_usuario')
    document.getElementById('nombre').value = localStorage.getItem('nombre_usuario')
    document.getElementById('usuario').value = localStorage.getItem('usuario_usuario')
    focus('#clave')
    siguiente_campo('#clave','#confirmacion',false)
    siguiente_campo('#confirmacion','#boton-guardar', true)
}

function guardar(){
    if (validar_formulario()) {
        guardar_modificar()
    }
}

function validar_formulario() {
    let ok = true
    const clave = document.getElementById('clave')
    const confirmacion = document.getElementById('confirmacion')
    if (clave.value.trim() === '') {
        mensaje_formulario('#clave','Contraseña vacia.')
        ok = false
    } else if (confirmacion.value.trim() === '') {
        mensaje_formulario('#confirmacion','Confirmación de Contraseña vacia.')
        ok = false
    } else if (clave.value !== confirmacion.value) {
        mensaje_formulario('#clave','Contraseña no es igual a Cofirmación.')
        ok = false
    }
    return ok
}

// Servidor
async function guardar_modificar() {
    let url = `/api/v1/usuarios/${id_usuario}/modificar_clave`;
    let clave = document.getElementById('clave').value;

    var data = {
        clave: clave,
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
        mensaje_formulario('#clave','Contraseña Modificada.')
        document.getElementById('clave').value = ''
        document.getElementById('confirmacion').value = ''
    } else {
        mensaje_formulario('#clave','Contraseña NO Modificada.')
    }

}