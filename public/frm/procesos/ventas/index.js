inicializador_formulario(); 

function inicializador_formulario() {
    document.getElementById('fecha').value = get_hoy()
    document.querySelector('#condicion').focus();

    siguiente_campo('#condicion', '#timbrado', false);
    siguiente_campo('#timbrado', '#fiscal', false);
    siguiente_campo('#fiscal', '#cliente', false);
    siguiente_campo('#cliente', '#boton-guardar', true);

    siguiente_campo('#producto', '#cantidad', false);
    siguiente_campo('#cantidad', '#boton-guardar-detalle', false);
    buscar_ventas();
    id_venta_cabecera = 0;
    id_venta_detalle = 0;
}

function editar_linea(xthis) {
    id_venta_cabecera = xthis.parentElement.parentElement.getAttribute('datos-id_venta_cabecera')
    id_cliente = xthis.parentElement.parentElement.getAttribute('datos-id_cliente')
    const tds = xthis.parentElement.parentElement.children
    const fecha = tds[0].innerText
    const condicion = tds[1].innerText
    const timbrado = tds[2].innerText
    const fiscal = tds[3].innerText
    const cliente = tds[4].innerText
    document.getElementById('fecha').value = fecha
    document.getElementById('condicion').value = condicion
    document.getElementById('timbrado').value = timbrado
    document.getElementById('fiscal').value = fiscal
    document.getElementById('cliente').value = cliente
    focus('#fecha')                                       
    document.getElementById('boton-guardar').innerHTML = '<i class="fas fa-pencil-alt"></i> Modificar'
    buscar_ventas_detalle()
}

function editar_linea_detalle(xthis) {
    id_venta_detalle = xthis.parentElement.parentElement.getAttribute('datos-id_venta_detalle')
    id_producto = xthis.parentElement.parentElement.getAttribute('datos-id_producto')
    const tds = xthis.parentElement.parentElement.children
    const cantidad = tds[0].innerText
    const producto = tds[1].innerText
    const precio = tds[2].innerText
    const total = tds[3].innerText
    document.getElementById('cantidad').value = cantidad
    document.getElementById('producto').value = producto
    document.getElementById('precio').value = precio
    document.getElementById('total').value = total
    focus('#producto')
    document.getElementById('boton-guardar-detalle').innerHTML = '<i class="bi bi-pencil-fill"></i>  Modificar Detalle'
}

function agregar_linea() {
    id_venta_cabecera = 0
    id_cliente = 0
    document.getElementById('fecha').value = get_hoy()
    document.getElementById('condicion').value = '1'
    document.getElementById('timbrado').value = ''
    document.getElementById('fiscal').value = ''
    document.getElementById('cliente').value = ''
    document.getElementById('tbody-datos-ventas-detalle').innerHTML = ''
    document.getElementById('total_venta').innerHTML = 0
    document.querySelector('#condicion').focus();
    document.getElementById('boton-guardar').innerHTML = '<i class="bi bi-plus-lg"></i>  Agregar'
}

function agregar_linea_detalle() {
    id_venta_detalle = 0
    id_producto = 0
    document.getElementById('producto').value = ''
    document.getElementById('cantidad').value = 1
    document.getElementById('precio').value = ''
    document.getElementById('total').value = ''
    document.querySelector('#producto').focus();
    document.getElementById('boton-guardar-detalle').innerHTML = '<i class="bi bi-plus-lg"></i>  Agregar Detalle'
}

function eliminar_linea(xthis) {
    id_venta_cabecera_eliminar = xthis.parentElement.parentElement.getAttribute('datos-id_venta_cabecera')
    mensaje_confirmar('Seguro que quiere eliminar este registro?', 'Eliminar', 'guardar_eliminar()')
}

function eliminar_linea_detalle(xthis) {
    id_venta_detalle_eliminar = xthis.parentElement.parentElement.getAttribute('datos-id_venta_detalle')
    mensaje_confirmar('Seguro que quiere eliminar este registro?', 'Eliminar', 'guardar_eliminar_detalle()')
}

function guardar() {
    if (validar_formulario()) {
        if (id_venta_cabecera === 0) {
            guardar_agregar(false)
        } else {
            guardar_modificar()
        }
    }
}; 

function guardar_detalle() {
    if (id_venta_cabecera === 0) {
        if (validar_formulario()) {
            guardar_agregar(true)
        }
    } else {
        if (validar_formulario_detalle()) {
            if (id_venta_detalle === 0) {
                guardar_agregar_detalle()
            } else {
                guardar_modificar_detalle()
            }
        }
    }
}; 

function validar_formulario() {
    let ok = true
    const fecha = document.getElementById('fecha')
    const condicion = document.getElementById('condicion')
    const timbrado = document.getElementById('timbrado')
    const fiscal = document.getElementById('fiscal')
    const cliente = document.getElementById('cliente')
    if (fecha.value.trim() === '') {
        mensaje_formulario('#fecha','Fecha vacia.')
        ok = false
    } else if (condicion.value.trim() === '') {
        mensaje_formulario('#condicion','Condición vacia.')
        ok = false
    } else if (timbrado.value.trim() === '') {
        mensaje_formulario('#timbrado','Timbrado vacio.')
        ok = false
    } else if (fiscal.value.trim() === '') {
        mensaje_formulario('#fiscal','Nº Fiscal vacio.')
        ok = false
    } else if (cliente.value.trim() === '') {
        mensaje_formulario('#cliente','Cliente vacio.')
        ok = false
    }
    return ok
};

function validar_formulario_detalle() {
    let ok = true
    const producto = document.getElementById('producto')
    const cantidad = document.getElementById('cantidad')
    if (producto.value.trim() === '') {
        mensaje_formulario('#producto','Producto vacio.')
        ok = false
    } else if (cantidad.value.trim() === '') {
        mensaje_formulario('#cantidad','Cantidad vacia.')
        ok = false
    } else if(cantidad.value <= 0) {
        mensaje_formulario('#cantidad','Cantidad menor o igual a cero.')
        ok = false
    }
    return ok
};

// llamadas al servidor
async function buscar_ventas() {
    const buscar = document.getElementById('buscar').value
    const url = `/api/v1/ventas_cabeceras?buscar=${buscar}`
    var parametros = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    console.log(json);
    const tbody = document.getElementById('tbody-datos-ventas');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr datos-id_venta_cabecera=${json.datos[item].id} datos-id_cliente=${json.datos[item].id_cliente}>
                            <td>${json.datos[item].fecha.replace('T',' ').replace('.000Z','')}</td>
                            <td>${json.datos[item].condicion}</td>
                            <td>${json.datos[item].timbrado}</td>
                            <td>${json.datos[item].fiscal}</td>
                            <td>${json.datos[item].nombre_cliente}</td>
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
        lineas = `<tr><td colspan="6" class="text-center">No hay registros....</td></tr>`
    }
    tbody.innerHTML = lineas;
}

async function buscar_ventas_detalle() {
    let url = `/api/v1/ventas_detalles/venta_cabecera/${id_venta_cabecera}`;
    var parametros = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    console.log(json);
    const tbody = document.getElementById('tbody-datos-ventas-detalle');
    tbody.innerText = '';
    let lineas = '';
    let total_venta = 0
    if (json.status === 200) {
        for (let item in json.datos) {
            let total = json.datos[item].cantidad * json.datos[item].precio
            total_venta += total
            let linea = `<tr datos-id_venta_detalle=${json.datos[item].id} datos-id_producto=${json.datos[item].id_producto}>
                            <td class='text-end'>${json.datos[item].cantidad}</td>
                            <td>${json.datos[item].nombre_producto}</td>
                            <td class='text-end'>${json.datos[item].precio}</td>
                            <td class='text-end'>${total}</td>
                            <td class="text-center">
                                <button type="button" class="btn btn-outline-warning btn-sm" onclick='editar_linea_detalle(this)'>
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button type="button" class="btn btn-outline-danger btn-sm" onclick='eliminar_linea_detalle(this)'>
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>`;
            lineas += linea;
        }
    }
    if (lineas === '') {
        lineas = `<tr><td colspan="5" class="text-center">No hay registros....</td></tr>`
    }
    tbody.innerHTML = lineas;
    document.getElementById('total_venta').innerText = total_venta
}

async function guardar_agregar(detalle) {
    let url = '/api/v1/ventas_cabeceras';
    let fecha = document.getElementById('fecha').value;
    let condicion = document.getElementById('condicion').value;
    let timbrado = document.getElementById('timbrado').value;
    let fiscal = document.getElementById('fiscal').value;
    let data = {
        fecha: fecha,
        condicion: condicion,
        timbrado: timbrado,
        fiscal: fiscal,
        id_cliente: id_cliente
    };
    var parametros = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    var datos = await fetch(url, parametros);
    const json = await datos.json();
    console.log(json);
    buscar_ventas();
    if(detalle){
        id_venta_cabecera = json.data.id_venta_cabecera
        if (validar_formulario_detalle()) {
            guardar_agregar_detalle()
        }
    } else {
        agregar_linea();
    }
};

async function guardar_agregar_detalle() {
    let url = `/api/v1/ventas_detalles`;
    let cantidad = document.getElementById('cantidad').value;
    let precio = document.getElementById('precio').value;
    let data = {
        id_venta_cabecera: id_venta_cabecera,
        id_producto: id_producto,
        cantidad: cantidad,
        costo: costo,
        precio: precio
    };
    var parametros = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    var datos = await fetch(url, parametros);
    const json = await datos.json();
    console.log(json);
    buscar_ventas_detalle();
    agregar_linea_detalle();
};

async function guardar_modificar() {
    let url = `/api/v1/ventas_cabeceras/${id_venta_cabecera}`;
    let fecha = document.getElementById('fecha').value;
    let condicion = document.getElementById('condicion').value;
    let timbrado = document.getElementById('timbrado').value;
    let fiscal = document.getElementById('fiscal').value;
    let data = {
        fecha: fecha,
        condicion: condicion,
        timbrado: timbrado,
        fiscal: fiscal,
        id_cliente: id_cliente
    };
    console.log(data);
    let parametros = {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    let datos = await fetch(url, parametros);
    const json = await datos.json();
    console.log(json);
    buscar_ventas();
    agregar_linea();
};

async function guardar_modificar_detalle() {
    let url = `/api/v1/ventas_detalles/${id_venta_detalle}`;
    let cantidad = document.getElementById('cantidad').value;
    let precio = document.getElementById('precio').value;
    let data = {
        id_venta_cabecera: id_venta_cabecera,
        id_producto: id_producto,
        cantidad: cantidad,
        costo: costo,
        precio: parseInt(precio)
    };
    console.log(data);
    let parametros = {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    let datos = await fetch(url, parametros);
    const json = await datos.json();
    console.log(json);
    buscar_ventas_detalle();
    agregar_linea_detalle();
};

async function guardar_eliminar() {
    let url = `/api/v1/ventas_cabeceras/${id_venta_cabecera_eliminar}`;
    let data = {};
    let parametros = {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(parametros)
    let datos = await fetch(url, parametros);
    const json = await datos.json();
    console.log(json);
    buscar_ventas();
};

async function guardar_eliminar_detalle() {
    let url = `/api/v1/ventas_detalles/${id_venta_detalle_eliminar}`;
    let data = {};
    let parametros = {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(parametros)
    let datos = await fetch(url, parametros);
    const json = await datos.json();
    console.log(json);
    buscar_ventas_detalle();
};

// CLIENTES
async function buscar_cliente() {
    let buscar = document.getElementById('cliente').value;
    let url = `/api/v1/clientes?buscar=${buscar}`;

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
    const tbody = document.getElementById('tbody-datos-elegir-cliente');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr data-id_cliente=${json.datos[item].id} onclick="elegir_cliente(this)">
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

function elegir_cliente(xthis) {
    id_cliente = parseInt(xthis.getAttribute('data-id_cliente'));
    const tds = xthis.children;
    const nombre = tds[0].innerText;
    document.getElementById('cliente').value = nombre;
    salir_buscador('modal_buscador-cliente');
}

// PRODUCTOS 
async function buscar_producto() {
    let buscar = document.getElementById('producto').value;
    let url = `/api/v1/productos?buscar=${buscar}`;

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
    const tbody = document.getElementById('tbody-datos-elegir-producto');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let linea = `<tr data-id_producto=${json.datos[item].id} data-costo=${json.datos[item].costo} data-precio=${json.datos[item].precio} onclick="elegir_producto(this)">
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

function elegir_producto(xthis) {
    id_producto = parseInt(xthis.getAttribute('data-id_producto'));
    costo = parseInt(xthis.getAttribute('data-costo'));
    const precio = parseInt(xthis.getAttribute('data-precio'));
    const tds = xthis.children;
    const nombre = tds[0].innerText;
    document.getElementById('producto').value = nombre;
    document.getElementById('precio').value = precio;
    calcular_total_linea_detalle();
    salir_buscador('modal_buscador-producto');
}

function calcular_total_linea_detalle(){
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;
    document.getElementById('total').value = cantidad * precio;
}

// Imprimir laser 3 facturas
async function imprimir_laser() {
    const id = parseInt($('#id').val());
    if(id === 0 ){
        mensaje(`Ticket Nº ${id} no exite.`, 'Aceptar', 'focus("#id")');
        return true;
    }
    const url_config = "api/configuraciones/" + empresaDB + "/1";
    const datos_config = await fetch(url_config);
    const json_config = await datos_config.json();
    const json_datos_config = JSON.parse(json_config.datos);

    let total_final = 0;
    const url = "api/ventas_detalles/imprimir/ticket/" + empresaDB + "/" + id;
    const datos = await fetch(url);
    const json = await datos.json();
    let linea = "";
    if (json.codigo === '200') {
        let json_datos = JSON.parse(json.datos);
        console.log(json_datos)
        linea += "<div style='height: 65px'></div>";
        linea += "<div style='height: 15px'>" + espacio(50) + get_fecha_factura(json_datos[0].VentasCabecera.Fecha);
        linea += json_datos[0].VentasCabecera.Condicion === 1 ? espacio(95) + 'X' : espacio(100) + 'X';
        linea += "</div>" 
        linea += "<div style='height: 20px'>" + espacio(70) + json_datos[0].VentasCabecera.Cliente.Nombre + "</div>";
        linea += "<div style='height: 20px'>" + espacio(35) + json_datos[0].VentasCabecera.Cliente.Ruc + "</div>";
        linea += "<div style='height: 16px'></div>";
        linea += "<table class='table table-borderless table-sm'>";
        linea += "  <tbody>";
        let cantidad = 0
        $.each(json_datos, function (key, value) {
            cantidad = cantidad + 1
            linea += "  <tr>";
            linea += "      <td class='text-end' style='width: 50px'>" + value.Cantidad.toLocaleString('es') + "</td>";
            linea += "      <td style='width: 200px'>" + value.Producto.Nombre + "</td>";
            linea += "      <td class='text-end' style='width: 150px'>" + value.Precio.toLocaleString('es') + "</td>";
            linea += "      <td class='text-end' style='width: 220px'>" + (value.Cantidad * value.Precio).toLocaleString('es') + espacio(2) + "</td>";
            linea += "  </tr>";
            total_final += value.Cantidad * value.Precio
        });
        if(cantidad > 7 ){
            mensaje(`Cantidad de productos mayor a 7.`, 'Aceptar', 'focus("#id")');
            return true;
        }
        for (let i = 1; i <= (7-cantidad); i++) {
            linea += "  <tr><td>&nbsp;</td></tr>";
        }
        linea += "  </tbody>";
        linea += "  <tfoot>";
        linea += "      <tr>";
        linea += "          <td colspan='3'></td>";
        linea += "          <td class='text-end'>" + total_final.toLocaleString('es') + espacio(2) + "</td>";
        linea += "      </tr>";
        linea += "      <tr>";
        linea += "          <td colspan='3'>" + espacio(85) + NumeroALetras(total_final) + "</td>";
        linea += "          <td class='text-end'><br>" + total_final.toLocaleString('es') + espacio(2) + "</td>";
        linea += "      </tr>";
        linea += "      <tr>";
        linea += "          <td colspan='3'></td>";
        linea += "          <td class='text-end'></td>";
        linea += "      </tr>";
        linea += "      <tr>";
        linea += "          <td colspan='4'>" + espacio(80)+ "------" + espacio(60) + Math.ceil(total_final/11).toLocaleString('es') + espacio(55) + Math.ceil(total_final/11).toLocaleString('es') + "</td>";
        linea += "      </tr>";
        linea += "  </tfoot>";
        linea += "</table>";
        let separador1 = "<div style='height: 59px'></div>";
        let separador2 = "<div style='height: 62px'></div>";

        linea3 = linea + separador1 + linea + separador2 + linea;

        $('#ticket').html(linea3);
        window.print();
    }
}

/*************************************************************/
// NumeroALetras
// The MIT License (MIT)
// 
// Copyright (c) 2015 Luis Alfredo Chee 
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// @author Rodolfo Carmona
// @contributor Jean (jpbadoino@gmail.com)
/*************************************************************/
function Unidades(num){

    switch(num)
    {
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
    }

    return "";
}//Unidades()

function Decenas(num){

    decena = Math.floor(num/10);
    unidad = num - (decena * 10);

    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + Unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return "VEINTE";
                default: return "VEINTI" + Unidades(unidad);
            }
        case 3: return DecenasY("TREINTA", unidad);
        case 4: return DecenasY("CUARENTA", unidad);
        case 5: return DecenasY("CINCUENTA", unidad);
        case 6: return DecenasY("SESENTA", unidad);
        case 7: return DecenasY("SETENTA", unidad);
        case 8: return DecenasY("OCHENTA", unidad);
        case 9: return DecenasY("NOVENTA", unidad);
        case 0: return Unidades(unidad);
    }
}//Unidades()

function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
    return strSin + " Y " + Unidades(numUnidades)

    return strSin;
}//DecenasY()

function Centenas(num) {
    centenas = Math.floor(num / 100);
    decenas = num - (centenas * 100);

    switch(centenas)
    {
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2: return "DOSCIENTOS " + Decenas(decenas);
        case 3: return "TRESCIENTOS " + Decenas(decenas);
        case 4: return "CUATROCIENTOS " + Decenas(decenas);
        case 5: return "QUINIENTOS " + Decenas(decenas);
        case 6: return "SEISCIENTOS " + Decenas(decenas);
        case 7: return "SETECIENTOS " + Decenas(decenas);
        case 8: return "OCHOCIENTOS " + Decenas(decenas);
        case 9: return "NOVECIENTOS " + Decenas(decenas);
    }

    return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    letras = "";

    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += "";

    return letras;
}//Seccion()

function Miles(num) {
    divisor = 1000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMiles = Seccion(num, divisor, "UN MIL", "MIL");
    strCentenas = Centenas(resto);

    if(strMiles == "")
        return strCentenas;

    return strMiles + " " + strCentenas;
}//Miles()

function Millones(num) {
    divisor = 1000000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
    strMiles = Miles(resto);

    if(strMillones == "")
        return strMiles;

    return strMillones + " " + strMiles;
}//Millones()

function NumeroALetras(num) {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: '',//"PESOS", 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: '', //"PESO", 'Dólar', 'Bolivar', 'etc'

        letrasMonedaCentavoPlural: "CENTAVOS",
        letrasMonedaCentavoSingular: "CENTAVO"
    };

    if (data.centavos > 0) {
        data.letrasCentavos = "CON " + (function (){
            if (data.centavos == 1)
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
            else
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
            })();
    };

    if(data.enteros == 0)
        return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    if (data.enteros == 1)
        return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
    else
        return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}//NumeroALetras()