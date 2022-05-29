inicializar_formulario()

function inicializar_formulario() {
    focus('#desde_cliente')
    siguiente_campo('#desde_cliente', '#hasta_cliente', true)
    siguiente_campo('#hasta_cliente', '#boton-consultar', true)
}

function imprimir() {
    if(validar_formulario()){
        pdf_servidor()
    }
}

function validar_formulario() {
    let ok = true
    const desde_cliente = Number(document.getElementById('desde_cliente').value)
    const hasta_cliente = Number(document.getElementById('hasta_cliente').value)
    console.log(desde_cliente)
    console.log(hasta_cliente)
    if (desde_cliente > hasta_cliente) {
        mensaje_formulario('#desde_cliente','Desde cliente mayor a hasta cliente.')
        ok = false
    }
    return ok
}

// Llamadas al Servidor
async function pdf_servidor() {
    const desde_cliente = document.getElementById('desde_cliente').value
    const hasta_cliente = document.getElementById('hasta_cliente').value
    let url = `/api/v1/clientes/listado?desde_cliente=${desde_cliente}&hasta_cliente=${hasta_cliente}`;
    
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
    //Mostrar vista de impresión
    let pdfWindow = window.open('', '_blank', 'toolbar=yes,location=no,status=no,menubar=yes,scrollbars=no,resizable=yes,width=300,height=500,top=0');
    pdfWindow.document.write("<iframe width='100%' height='100%' scrolling='no' frameBorder='0' src='data:application/pdf;base64, " + encodeURI(json.data.archivo) + "'></iframe>");
    pdfWindow.document.querySelector("body").style.overflow='hidden';
    // Descargar a la vez el fichero
    var a = document.createElement('a');
    a.href = "data:application/pdf;base64," + encodeURI(json.data.archivo);
    a.download = json.data.nombre;
    document.body.appendChild(a);
    //a.click();
    document.body.removeChild(a);
}
