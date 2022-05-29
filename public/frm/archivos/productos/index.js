inicializar_formulario()
foto = undefined
modificado = false

function inicializar_formulario(){
    focus('#nombre')
    siguiente_campo('#nombre','#costo', false)
    siguiente_campo('#costo','#precio', false)
    siguiente_campo('#precio','#stock', false)
    siguiente_campo('#stock','#boton-guardar', true)
    buscar_productos()
    id_producto = 0
}

function editar_linea(xthis){
    modificado = false
    id_producto = xthis.parentElement.parentElement.getAttribute('data-id_producto')
    const tds = xthis.parentElement.parentElement.children
    const nombre = tds[0].innerText
    const costo = tds[1].innerText
    const precio = tds[2].innerText
    const stock = tds[3].innerText
    const img = 'img/productos/'+id_producto+'.jpg'
    document.getElementById('nombre').value = nombre
    document.getElementById('costo').value = costo
    document.getElementById('precio').value = precio
    document.getElementById('stock').value = stock
    document.getElementById('foto-img').setAttribute('src',img)
    focus('#nombre')
    document.getElementById('boton-guardar').innerHTML = '<i class="fas fa-pencil-alt"></i> Modificar'
}

function agregar_linea(){
    modificado = false
    id_producto = 0
    document.getElementById('nombre').value = ''
    document.getElementById('costo').value = ''
    document.getElementById('precio').value = ''
    document.getElementById('stock').value = ''
    document.getElementById('foto-img').setAttribute('src','img/productos/0.jpg')
    focus('#nombre')
    document.getElementById('boton-guardar').innerHTML = '<i class="fas fa-plus"></i> Agregar'
}

function eliminar_linea(xthis){
    id_producto_eliminar = xthis.parentElement.parentElement.getAttribute('data-id_producto')
    mensaje_confirmar('¿Está seguro de eliminar este registro?','Eliminar','guardar_eliminar()')
}

function guardar(){
    if (validar_formulario()) {
        if (id_producto === 0) {
            guardar_agregar()
        } else {
            guardar_modificar()
        }
    }
}

function validar_formulario(){
    let ok = true
    const nombre = document.getElementById('nombre')
    const costo = document.getElementById('costo')
    const precio = document.getElementById('precio')
    const stock = document.getElementById('stock')
    limpiar_mensaje_formulario()
    if (nombre.value.trim() === '') {
        mensaje_formulario('#nombre','Nombre vacio.')
        ok = false
    } else if (costo.value.trim() === '') {
        mensaje_formulario('#costo','Costo vacio.')
        ok = false
    } else if (precio.value.trim() === '') {
        mensaje_formulario('#precio','Precio vacio.')
        ok = false
    } else if (stock.value.trim() === '') {
        mensaje_formulario('#stock','Stock vacio.')
        ok = false
    }
    return ok
}

// foto
function cargar_foto(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('foto-img').setAttribute('src', e.target.result);
            foto = input.files[0];
            getBase64(foto).then(data => foto = data);
            modificado = true
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Llamadas al Servidor
async function buscar_productos() {
    let buscar = document.getElementById('buscar').value;
    let url = `/api/v1/productos?buscar=${buscar}`;
    var parametros = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    const tbody = document.getElementById('tbody-datos-productos');
    tbody.innerText = '';
    let lineas = '';
    if (json.status === 200) {
        for (let item in json.datos) {
            let img = `img/productos/${json.datos[item].id}.jpg`
            let foto = `<img src="${img}" alt="${img}" class="img-fluid" style="height: 50px">`
            let linea = `<tr data-id_producto=${json.datos[item].id}>
                            <td>${json.datos[item].nombre}</td>
                            <td class="text-end">${json.datos[item].costo}</td>
                            <td class="text-end">${json.datos[item].precio}</td>
                            <td class="text-end">${json.datos[item].stock}</td>
                            <td class="text-center">${foto}</td>
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
    if(lineas === ''){
        lineas = `<tr><td colspan="4" class="text-center">No existen registros ...</td></tr>`;
    }
    tbody.innerHTML = lineas;
}

async function guardar_agregar(){
    let url = '/api/v1/productos';
    let nombre = document.getElementById('nombre').value;
    let costo = document.getElementById('costo').value;
    let precio = document.getElementById('precio').value;
    let stock = document.getElementById('stock').value;

    var data = {
        nombre: nombre,
        costo: costo,
        precio: precio,
        stock: stock,
        foto: foto,
        modificado: modificado
    };

    var parametros = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    buscar_productos();
    agregar_linea();
}

async function guardar_modificar(){
    let url = `/api/v1/productos/${id_producto}`;
    let nombre = document.getElementById('nombre').value;
    let costo = document.getElementById('costo').value;
    let precio = document.getElementById('precio').value;
    let stock = document.getElementById('stock').value;

    var data = {
        nombre: nombre,
        costo: costo,
        precio: precio,
        stock: stock,
        foto: foto,
        modificado: modificado
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
    buscar_productos();
    agregar_linea();
}

async function guardar_eliminar(){
    let url = `/api/v1/productos/${id_producto_eliminar}`;

    var data = {};

    var parametros = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    var datos = await fetch(url, parametros)
    const json = await datos.json();
    buscar_productos();
}

