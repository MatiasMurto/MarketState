inicializar_formulario()

function inicializar_formulario() {
    focus('#desde_producto')
    siguiente_campo('#desde_producto', '#hasta_producto', true)
    siguiente_campo('#hasta_producto', '#boton-consultar', true)
}

function imprimir() {
    if(validar_formulario()){
        pdf_servidor()
    }
}

function validar_formulario() {
    let ok = true
    const desde_producto = Number(document.getElementById('desde_producto').value)
    const hasta_producto = Number(document.getElementById('hasta_producto').value)
    console.log(desde_producto)
    console.log(hasta_producto)
    if (desde_producto > hasta_producto) {
        mensaje_formulario('#desde_producto','Desde producto mayor a hasta producto.')
        ok = false
    }
    return ok
}

// Llamadas al Servidor
async function pdf_servidor() {
    const desde_producto = document.getElementById('desde_producto').value
    const hasta_producto = document.getElementById('hasta_producto').value
    let url = `/api/v1/productos/listado?desde_producto=${desde_producto}&hasta_producto=${hasta_producto}`;
    
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
