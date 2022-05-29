inicializar_formulario()
var myChart, myChart2;


function inicializar_formulario() {
    document.getElementById('anio').value = Number(new Date().getFullYear())
    focus('#anio')
    siguiente_campo('#anio', '#boton-consultar', true)
}

function consultar() {
    if (validar_formulario()) {
        consultar_servidor()
    }
}

function imprimir() {
    window.print()
}

function validar_formulario() {
    let ok = true
    const anio = document.getElementById('anio')
    if (anio.value.trim() === '') {
        mensaje_formulario('#anio','Año vacio.')
        ok = false
    }
    return ok
}

// Llamadas al Servidor
async function consultar_servidor() {
    const anio = document.getElementById('anio').value
    let url = `/api/v1/ventas_cabeceras/informe/ventas_meses?anio=${anio}`;
    
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
    const tbody = document.getElementById('tbody-datos-ventas');
    tbody.innerText = '';
    let lineas = '';
    let total = 0
    let labels = []
    let datosGrafico = []
    if (json.status === 200) {
        for (let item in json.datos) {
            labels.push(get_mes(json.datos[item].mes))
            datosGrafico.push(json.datos[item].total_precio)
            total += json.datos[item].total_precio
            let linea = `<tr>
                            <td>${get_mes(json.datos[item].mes)}</td>
                            <td class="text-end">${json.datos[item].total_precio.toLocaleString('es-ES', { minimumFractionDigits: 0 })}</td>
                        </tr>`;
            lineas += linea;
        }
    }
    if (lineas === '') {
        lineas = `<tr><td colspan="2" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
    total = total.toLocaleString('es-ES', { minimumFractionDigits: 0 })
    document.getElementById('total_ventas').innerText = total
    generar_grafico(labels, datosGrafico)
    generar_grafico2(labels, datosGrafico)
}

function generar_grafico(labels, datos) {

    if (myChart) {
        myChart.destroy()
    }

    const anio = document.getElementById('anio').value
    const data = {
        labels: labels,
        datasets: [{
            label: `Ventas por Meses del Año ${anio}`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: datos,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}

function generar_grafico2(labels, datos) {
    const anio = document.getElementById('anio').value
    if (myChart2) {
        myChart2.destroy()
    }
    const data = {
        labels: labels,
        datasets: [{
            label: `Ventas por Meses del Año ${anio}`,
            data: datos,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
    const config = {
        type: 'pie',
        data: data,
    };
    myChart2 = new Chart(
        document.getElementById('myChart2'),
        config
    );
}