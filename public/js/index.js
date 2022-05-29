let carrito = JSON.parse(localStorage.getItem('carrito'))
if( carrito == null){
    carrito = []
}
document.getElementById('cantidad_carrito').innerText = carrito.length

function mostrar_carrito(){
    document.getElementById('detalle_carrito').classList.toggle("d-none");
    actualizar_carrito()
}

function agregar_carrito(xthis){
    const id = xthis.getAttribute('data-id_producto')
    let actualizado = false
    carrito.forEach(producto => {
        if (producto.id === id) {
            actualizado = true
            producto.cantidad = producto.cantidad + 1
        }
    })
    if (actualizado === false){
        const nombre = xthis.parentNode.parentNode.children[1].children[0].children[0].innerText
        const precio = xthis.parentNode.parentNode.children[1].children[0].children[1].innerText
        const producto = {
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1,
        }
        carrito.push(producto)
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizar_carrito()
}

function actualizar_carrito(){
    document.getElementById('cantidad_carrito').innerText = carrito.length
    carrito = JSON.parse(localStorage.getItem('carrito'))
    datos = ''
    let total = 0
    carrito.forEach(producto => {
        let total_linea = producto.cantidad * producto.precio
        total += total_linea
        datos += `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td class="text-end" style="width: 50px"><input type="number" class="form-control input-sm" min="1" onchange="actualizar_linea(this)" value="${producto.cantidad}"></td>
                <td class="text-end">${producto.precio}</td>
                <td class="text-end">${total_linea}</td>
                <td class="text-center" style="cursor: pointer" onclick="eliminar_linea(this)">
                    <i class="fas fa-trash"></i>
                </td>
            </tr>
        `
    })
    document.getElementById('tabla-carrito-datos').innerHTML = datos
    document.getElementById('total-carrito').innerHTML = total
}

function actualizar_linea(xthis){
    let id = xthis.parentNode.parentNode.children[0].innerText
    let cantidad = Number(xthis.value)
    carrito.forEach(producto => {
        if (producto.id === id) {
            producto.cantidad = cantidad
        }
    })
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizar_carrito()
}

function eliminar_linea(xthis){
    let id = xthis.parentNode.children[0].innerText
    carrito = carrito.filter(producto => {
        return producto.id !== id 
    })
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizar_carrito()
}

function comprar(){
    let cliente = JSON.parse(localStorage.getItem('cliente'))
    if (cliente === null) {
        document.getElementById('detalle_carrito').classList.toggle('d-none')
        document.getElementById('cliente_login').classList.remove('d-none')
        document.getElementById('usuario').focus()
        siguiente_campo('#usuario','#clave', false)
        siguiente_campo('#clave','#boton-ingresar-cliente', false)
    } else {
        mensaje_confirmar('Seguro que quiere enviar esta compra?', 'Enviar', 'grabar_compra()')
    }
}

function grabar_compra(){
    guardar_agregar()
}

async function guardar_agregar() {
    let url = '/api/v1/ventas_cabeceras';
    let fecha = get_hoy();
    let condicion = 2;
    let cliente = JSON.parse(localStorage.getItem('cliente'));
    let id_cliente = cliente.id;
    let timbrado = '1'
    let fiscal = '1'
    let data = {
        fecha: fecha,
        condicion: condicion,
        id_cliente: id_cliente,
        timbrado: timbrado,
        fiscal: fiscal
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
    const id_venta_cabecera = json.data.id_venta_cabecera
    // guardar detalles
    // recorrer los detalles y por cada detalle hacer guardar_agregar_detalle
    carrito = JSON.parse(localStorage.getItem('carrito'))
    carrito.forEach( producto => {
        guardar_agregar_detalle(id_venta_cabecera, producto.id, producto.cantidad, 0, producto.precio)
    });
    // Limpiar el carrito en el localStorage y volver a refrescar el carrito en la pantalla
    carrito = []
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizar_carrito()
};

async function guardar_agregar_detalle(id_venta_cabecera, id_producto, cantidad, costo, precio) {
    let url = '/api/v1/ventas_detalles';
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
};

function mostrar_cliente_login() {
    document.getElementById('cliente_login').classList.toggle('d-none')
    document.getElementById('detalle_carrito').classList.add('d-none')
    document.getElementById('usuario').focus()
    siguiente_campo('#usuario','#clave',false)
    siguiente_campo('#clave','#boton-ingresar-cliente',false)
    let cliente = JSON.parse(localStorage.getItem('cliente'))
    if (cliente === null) {
        document.getElementById('form-cliente').classList.remove('d-none')
        document.getElementById('datos-cliente').classList.add('d-none')
    } else {
        document.getElementById('cliente_nombre').value = cliente.nombre
        document.getElementById('form-cliente').classList.add('d-none')
        document.getElementById('datos-cliente').classList.remove('d-none')
    }
}

function cliente_login(){
    if(validar_formulario()){
        validar_servidor()
    }
}

function validar_formulario(){
    let ok = true
    const usuario = document.getElementById('usuario')
    const clave = document.getElementById('clave')
    if (usuario.value.trim() === '') {
        ok = false
        mensaje('Usuario vacio.','focus("#usuario")')
    } else if (clave.value.trim() === '') {
        ok = false
        mensaje('Contraseña vacia.','focus("#clave")')
    }
    return ok
}

async function validar_servidor(){
    const usuario = document.getElementById('usuario')
    const clave = document.getElementById('clave')

    const url = 'api/v1/clientes/login'
    
    const data = {
        cliente: usuario.value,
        clave: clave.value
    }

    const parametros = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const datos = await fetch(url,parametros)
    const json = await datos.json()
    console.log(json)
    if (json.status === 200) {
        const cliente = {
            id: json.datos.id,
            ruc: json.datos.ruc,
            email: json.datos.email,
            nombre: json.datos.nombre,
            direccion: json.datos.direccion,
            telefono: json.datos.telefono,
            localizacion: json.datos.localizacion
        }
        localStorage.setItem('cliente', JSON.stringify(cliente))
        document.getElementById('cliente_login').classList.add('d-none')
    } else {
        mensaje('Credencial incorrecta.','focus("#usuario")')
    }
}

function cliente_logout(){
    localStorage.removeItem('cliente')
    document.getElementById('cliente_login').classList.add('d-none')
}