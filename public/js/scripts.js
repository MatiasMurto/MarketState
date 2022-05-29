function focus(campo){
    const elemento = document.querySelector(campo)
    if (elemento.getAttribute('type') === 'button') {
        elemento.focus()
    } else {
        elemento.select()
    }
}

function siguiente_campo(actual, siguiente, preventDefault){
    const campo_actual = document.querySelector(actual)
    const campo_siguiente = document.querySelector(siguiente)
    campo_actual.addEventListener('keydown', function(event){
        if (event.which === 13) {
            if (preventDefault) {
                event.preventDefault()
            }
            if (campo_siguiente.getAttribute('type') === 'button') {
                campo_siguiente.focus()
            } else {
                campo_siguiente.select()
            }       
        }
    })
}

function mensaje(texto, funcion){
    const modal = `
        <div class="modal" id="myModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Mensaje del sistema</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>${texto}</p>
                </div>
                <div class="modal-footer">
                    <button id="mensaje-aceptar" type="button" class="btn btn-danger" data-bs-dismiss="modal">Aceptar</button>
                </div>
                </div>
            </div>
        </div>`
    document.getElementById('mensaje').innerHTML = modal
    const options = {}
    const myModal = new bootstrap.Modal(document.getElementById("myModal"), options)
    myModal.show()
    const mensaje_aceptar = document.querySelector('#mensaje-aceptar')
    mensaje_aceptar.focus()
    mensaje_aceptar.addEventListener('click',function(){
        eval(funcion)
        document.querySelector('#mensaje').innerHTML = ''
    })
}

function mensaje_confirmar(texto, texto_boton, funcion) {
    const modal = `
    <div id="myModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Mensaje del Sistema</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>${texto}</p>
                </div>
                <div class="modal-footer">
                    <button id="mensaje-eliminar" type="button" class="btn btn-danger" data-bs-dismiss="modal">${texto_boton}</button>
                    <button id="mensaje-cancelar" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    `
    document.querySelector("#mensaje").innerHTML = modal;
    let options = {

    };
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), options)
    myModal.show();
    const mensaje_eliminar = document.querySelector("#mensaje-eliminar");
    const mensaje_cancelar = document.querySelector("#mensaje-cancelar");
    mensaje_cancelar.focus();
    mensaje_eliminar.addEventListener('click', function () {
        eval(funcion);
        document.querySelector("#mensaje").innerHTML = '';
    });
}

function limpiar_mensaje_formulario(){
    let mensaje = document.getElementById('panel-formulario-mensaje')
    mensaje.classList.add("d-none")
    mensaje.innerHTML = ''
}

function mensaje_formulario(campo, msg){
    let mensaje = document.getElementById('panel-formulario-mensaje')
    mensaje.classList.add("d-none")
    mensaje.innerHTML = ''
    focus(campo)
    mensaje.classList.remove('d-none')
    mensaje.innerHTML = msg
}

async function cargar_formulario(div, url, funcion) {
    const response = await fetch(url);
    const div_link = "#" + div + " link";
    const div_script = "#" + div + " script";
    if (response.status === 200) {
        const cuerpo = await response.text();
        document.getElementById(div).innerHTML = cuerpo;
        document.querySelectorAll(div_link).forEach(link => {
            document.getElementById(div).removeChild(link);
            var linkElement = document.createElement("link");
            for (attribute of link.attributes) {
                linkElement.setAttribute(attribute.name, attribute.value);
            }
            linkElement.text = link.innerHTML;
            document.getElementById(div).append(linkElement);
        });
        document.querySelectorAll(div_script).forEach(script => {
            document.getElementById(div).removeChild(script);
            var scriptElement = document.createElement("script");
            for (attribute of script.attributes) {
                scriptElement.setAttribute(attribute.name, attribute.value);
            }
            document.getElementById(div).append(scriptElement);
            eval(script.innerText);
        });
        eval(funcion);
    }
}

function hacer_visible_lista() {
    document.getElementById('panel-formulario').classList.add('panel-oculto');
    document.getElementById('panel-lista').classList.remove('panel-oculto');
}

function buscar_lista(campo, id, funcion_elegir, funcion_buscar, panel_activo) {
    let elemento = document.getElementById(campo);
    let modal_buscador = document.getElementById(id);
    let menu_admin = document.getElementById('menu-admin');
    let menu_oculto = menu_admin.classList.contains('menu-oculto');
    sumar = menu_oculto ? 0 : 300;

    if (modal_buscador !== null) modal_buscador.remove();
    let coords = elemento.getBoundingClientRect();
    modal_buscador = document.createElement('div');
    let left = coords.left - sumar;

    modal_buscador.setAttribute('style', `
        width: ${coords.width}px;
        position: absolute;
        top: ${coords.top - 15}px;
        left: ${left}px;
        z-index: 1000;
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
    `);
    modal_buscador.id = id;
    modal_buscador.innerHTML = `
    <div class="table-resposive">
        <table class="table table-striped table-hover table-bordered">
            <tbody id="tbody-datos-elegir-${campo}" style="cursor: pointer">
                
            </tbody>
        </table>
        <div class="btn-group d-flex mb-2" role="group" aria-label="Basic example">
            <button class="btn btn-outline-danger btn-sm" onclick='salir_buscador("${id}")'><i class="fas fa-sign-out-alt"></i> Salir</button>
        </div>
    </div>
    `;
    let panel = document.getElementById(panel_activo);
    panel.append(modal_buscador);
    eval(funcion_buscar);
}

function salir_buscador(id) {
    let modal_buscador = document.getElementById(id);
    modal_buscador.remove();
}

function salir_formulario(){
    document.getElementById('panel-lista').innerHTML = ''
}

function get_hoy(){
    const fecha = new Date()
    const anio = fecha.getFullYear()
    const mes = (fecha.getMonth()+1) < 10 ? '0'+(fecha.getMonth()+1) : fecha.getMonth()+1
    const dia = fecha.getDate() < 10 ? '0'+fecha.getDate() : fecha.getDate()
    const hora = fecha.getHours() < 10 ? '0'+fecha.getHours() : fecha.getHours()
    const minuto = fecha.getMinutes() < 10 ? '0'+fecha.getMinutes() : fecha.getMinutes()
    const segundo = fecha.getSeconds() < 10 ? '0'+fecha.getSeconds() : fecha.getSeconds()
    const fecha_format = `${anio}-${mes}-${dia} ${hora}:${minuto}:${segundo}`
    return fecha_format
}

// CALENDARIO
function calendario(campo, id, panel_activo){
    const elemento = document.getElementById(campo)
    const coords = elemento.getBoundingClientRect()
    const menu_admin = document.getElementById('menu-admin');
    const menu_oculto = menu_admin.classList.contains('menu-oculto');
    const sumar = menu_oculto ? 0 : 300;

    let top = coords.top
    let left = coords.left
    let modal = document.createElement('div')
    modal.setAttribute('style', `
        width: ${coords.width}px;
        position: absolute;
        top: ${top - 20}px;
        left: ${left - sumar}px;
        z-index: 1000;
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
    `);
    const meses = get_meses()
    const anios = get_anios()
    modal.id = id
    modal.innerHTML = `
    <div class="table-resposive">
        <div class="row">
            <div class="col-md-6">
                <select class='form-control' onchange="cargar_calendario_anio_mes(this,'${campo}')">
                    ${meses}
                </select>
            </div>
            <div class="col-md-6">
                <select class='form-control' onchange="cargar_calendario_anio_mes(this,'${campo}')">
                    ${anios}
                </select>
            </div>
        </div>
        <table class="table table-striped table-hover table-bordered text-center">
            <thead>
                <tr>
                    <th>L</th>
                    <th>M</th>
                    <th>X</th>
                    <th>J</th>
                    <th>V</th>
                    <th>S</th>
                    <th>D</th>
                </tr>
            </thead>
            <tbody id="tbody-datos-elegir-${campo}" style="cursor: pointer">
                
            </tbody>
        </table>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon-hora">
                <i class="fas fa-clock"></i>
            </span>
            <input type="number" min="0" max="23" class="form-control" aria-label="Hora" aria-describedby="basic-addon-hora" value="0">
            <input type="number" min="0" max="59" class="form-control" aria-label="Hora" aria-describedby="basic-addon-minuto" value="0">
            <input type="number" min="0" max="59" class="form-control" aria-label="Hora" aria-describedby="basic-addon-segundo" value="0">
        </div>
        <div class="btn-group d-flex mb-2" role="group" aria-label="Basic example">
            <button class="btn btn-outline-primary btn-sm" onclick='seleccionar_calendario("${campo}","${id}")'><i class="fas fa-check"></i> Seleccionar</button>
            <button class="btn btn-outline-danger btn-sm" onclick='salir_calendario("${id}")'><i class="fas fa-sign-out-alt"></i> Salir</button>
        </div>
    </div>
    `;
    const panel = document.getElementById(panel_activo);
    panel.append(modal);
    const anio = new Date().getFullYear()
    const mes = new Date().getMonth() + 1
    console.log(anio)
    console.log(mes)
    cargar_calendario(campo, anio, mes);
    const tbody_datos = document.getElementById(`tbody-datos-elegir-${campo}`)
    tbody_datos.parentNode.parentNode.children[0].children[0].children[0].value = mes 
    tbody_datos.parentNode.parentNode.children[0].children[1].children[0].value = anio
}

function cargar_calendario_anio_mes(xthis, campo){
    console.log(campo)
    const mes = xthis.parentNode.parentNode.children[0].children[0].value
    const anio = xthis.parentNode.parentNode.children[1].children[0].value
    cargar_calendario(campo, anio, mes)
}

function seleccionar_calendario(campo,id){
    const tbody_data = document.getElementById(`tbody-datos-elegir-${campo}`)
    let hora = tbody_data.parentNode.parentNode.children[2].children[1].value
    let minuto = tbody_data.parentNode.parentNode.children[2].children[2].value
    let segundo = tbody_data.parentNode.parentNode.children[2].children[3].value
    hora = hora < 10 ? '0'+hora : hora
    minuto = minuto < 10 ? '0'+minuto : minuto
    segundo = segundo < 10 ? '0'+segundo : segundo
    document.getElementById(campo).value = tbody_data.getAttribute('data-fecha-seleccionada').substring(0,10) + " " + hora + ":" + minuto + ":" + segundo
    let modal = document.getElementById(id);
    modal.remove();
}

function salir_calendario(id) {
    let modal = document.getElementById(id);
    modal.remove();
}

function cargar_calendario(campo, anio, mes) {
    const tbody_data = document.getElementById(`tbody-datos-elegir-${campo}`)
    tbody_data.innerText = '';
    const fecha_actual = new Date();
    let fecha = new Date(anio, mes - 1, 1);
    do {
        if (fecha.getDay() === 1) {
            break;
        }
        fecha.setDate(fecha.getDate() - 1);
    } while (true);

    for (let i = 1; i <= 6; i++) {
        let tr = document.createElement('tr');
        for (let j = 1; j <= 7; j++) {
            let td = document.createElement('td');
            if ((fecha.getDate() === fecha_actual.getDate()) &&
                (fecha.getMonth() === fecha_actual.getMonth()) &&
                (fecha.getFullYear() === fecha_actual.getFullYear())) {
                td.className = 'actual'
            }
            if (fecha.getMonth() !== fecha_actual.getMonth()) {
                td.className = 'no-mes-actual'
            }
            td.innerHTML = fecha.getDate();
            td.setAttribute('data-fecha', fecha.toISOString().substring(0,10))
            tr.append(td);
            fecha.setDate(fecha.getDate() + 1);
        }
        tbody_data.append(tr);
    }
    const tds = `#tbody-datos-elegir-${campo} tr td`
    document.querySelectorAll(tds).forEach(celda => {
        celda.addEventListener('click', (event) => {
            fecha_elegida = celda.getAttribute('data-fecha');
            tbody_data.setAttribute("data-fecha-seleccionada",fecha_elegida)
        });
    });    
}

function get_meses(){
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']
    let lista = ''
    for (let mes = 0; mes < meses.length; mes++) {
        lista += `<option value='${mes+1}'>${meses[mes]}</option>`
    }
    return lista
}

function get_anios(){
    const anio = Number(new Date().getFullYear())
    const desde = anio - 5
    const hasta = anio + 5
    let lista = ''
    for (let anio = desde; anio < hasta; anio++) {
        lista += `<option value='${anio}'>${anio}</option>`
    }
    return lista
}

function get_mes(mes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']
    return meses[mes - 1]
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}