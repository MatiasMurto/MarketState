inicializar_formulario()

function inicializar_formulario() {
    focus('#desde_proveedor')
    siguiente_campo('#desde_proveedor', '#hasta_proveedor', true)
    siguiente_campo('#hasta_proveedor', '#boton-consultar', true)
}

function imprimir() {
    if(validar_formulario()){
        pdf_servidor()
    }
}

function validar_formulario() {
    let ok = true
    const desde_proveedor = Number(document.getElementById('desde_proveedor').value)
    const hasta_proveedor = Number(document.getElementById('hasta_proveedor').value)
    console.log(desde_proveedor)
    console.log(hasta_proveedor)
    if (desde_proveedor > hasta_proveedor) {
        mensaje_formulario('#desde_proveedor','Desde proveedor mayor a hasta proveedor.')
        ok = false
    }
    return ok
}

// Llamadas al Servidor
async function pdf_servidor() {
    const desde_proveedor = document.getElementById('desde_proveedor').value
    const hasta_proveedor = document.getElementById('hasta_proveedor').value
    let url = `/api/v1/proveedores/listado?desde_proveedor=${desde_proveedor}&hasta_proveedor=${hasta_proveedor}`;
    
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
