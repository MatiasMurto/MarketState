inicializar_formulario()

function inicializar_formulario(){
    document.getElementById('desde_fecha').value = get_hoy()
    document.getElementById('hasta_fecha').value = get_hoy()
    focus('#proveedor')
    siguiente_campo('#proveedor','#boton-consultar', true)
    id_proveedor = 0
}

function consultar(){
    if(validar_formulario()){
        consultar_servidor()
    }
}

function validar_formulario(){
    let ok = true
    const desde_fecha = document.getElementById('desde_fecha')
    const hasta_fecha = document.getElementById('hasta_fecha')
    if (desde_fecha.value.trim() === '') {
        mensaje_formulario('#desde_fecha','Desde fecha vacia.')
        ok = false
    } else if (hasta_fecha.value.trim() === '') {
        mensaje_formulario('#hasta_fecha','Hasta fecha vacia.')
        ok = false
    }
    return ok
}

// Llamadas al Servidor
async function consultar_servidor() {
    const desde_fecha = document.getElementById('desde_fecha').value
    const hasta_fecha = document.getElementById('hasta_fecha').value
    if (document.getElementById('proveedor').value === '') {
        id_proveedor = 0
    }
    let url = `/api/v1/compras_cabeceras/consulta?desde_fecha=${desde_fecha}&hasta_fecha=${hasta_fecha}&id_proveedor=${id_proveedor}`;
    var parametros = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    console.log(json)
    const tbody = document.getElementById('tbody-datos-compras');
    tbody.innerText = '';
    let lineas = '';
    let total = 0
    if (json.status === 200) {
        for (let item in json.datos) {
            total += json.datos[item].total_precio
            let linea = `<tr>
                            <td>${json.datos[item].fecha.replace('T',' ').replace('.000Z','')}</td>
                            <td>${json.datos[item].condicion}</td>
                            <td>${json.datos[item].nombre_proveedor}</td>
                            <td class="text-end">${json.datos[item].total_precio.toLocaleString('es-ES', {minimumFractionDigits: 0})}</td>
                        </tr>`;
             lineas += linea;
        }
    }
    if(lineas === ''){
        lineas = `<tr><td colspan="4" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
    total = total.toLocaleString('es-ES', {minimumFractionDigits: 0})
    document.getElementById('total_compras').innerText = total
}

// CLIENTES
async function buscar_proveedor() {
    let buscar = document.getElementById('proveedor').value;
    let url = `/api/v1/proveedores?buscar=${buscar}`;

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
    const tbody = document.getElementById('tbody-datos-elegir-proveedor');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr data-id_proveedor=${json.datos[item].id} onclick="elegir_proveedor(this)">
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

function elegir_proveedor(xthis) {
    id_proveedor = parseInt(xthis.getAttribute('data-id_proveedor'));
    const tds = xthis.children;
    const nombre = tds[0].innerText;
    document.getElementById('proveedor').value = nombre;
    salir_buscador('modal_buscador-proveedor');
}