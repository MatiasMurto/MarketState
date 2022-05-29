inicializar_formulario()

function inicializar_formulario(){
    document.getElementById('desde_fecha').value = get_hoy()
    document.getElementById('hasta_fecha').value = get_hoy()
    focus('#boton-consultar')
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
    let url = `/api/v1/inventarios_cabeceras/consulta?desde_fecha=${desde_fecha}&hasta_fecha=${hasta_fecha}`;
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
    const tbody = document.getElementById('tbody-datos-inventarios');
    tbody.innerText = '';
    let lineas = '';
    let total = 0
    if (json.status === 200) {
        for (let item in json.datos) {
            total += json.datos[item].total_precio
            let linea = `<tr>
                            <td>${json.datos[item].fecha.replace('T',' ').replace('.000Z','')}</td>
                            <td>${json.datos[item].observaciones}</td>
                            <td class="text-end">${json.datos[item].total_precio.toLocaleString('es-ES', {minimumFractionDigits: 0})}</td>
                        </tr>`;
             lineas += linea;
        }
    }
    if(lineas === ''){
        lineas = `<tr><td colspan="3" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
    total = total.toLocaleString('es-ES', {minimumFractionDigits: 0})
    document.getElementById('total_inventarios').innerText = total
}
