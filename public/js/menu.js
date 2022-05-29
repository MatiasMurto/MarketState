let id_usuario = 0
let id_usuario_eliminar = 0
let id_rol = 0
let id_rol_eliminar = 0
let id_sucursal = 0
let id_sucursal_eliminar = 0


buscar_permisos()

document.getElementById('menu-boton').addEventListener('click', function(){
    const elemento = document.getElementsByClassName('menu-admin')[0];
    const panel_main = document.getElementsByClassName('panel-main')[0];
    if(elemento.classList.contains('menu-oculto')){
        elemento.classList.remove('menu-oculto');
        panel_main.classList.remove('panel-main-oculto');
    }else{
        elemento.className += ' menu-oculto';
        panel_main.className += ' panel-main-oculto';
    }
});

// Llamadas al Servidor
async function buscar_permisos() {
    let url = 'api/v1/permisos/buscar/rol';

    var parametros = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }
    };

    var datos = await fetch(url, parametros)
    const json = await datos.json();
    console.log(json)
    let menu = "";
    if (json.status === 200) {
        id_usuario = json.usuario.id
        localStorage.setItem("id_usuario",id_usuario)
        localStorage.setItem("nombre_usuario",json.usuario.nombre)
        localStorage.setItem("usuario_usuario",json.usuario.usuario)
        const imagen = `./img/usuarios/${json.usuario.id}.jpg`
        document.getElementById('img-usuario-menubar').setAttribute('src',imagen)
        document.getElementById('nombre-usuario-menubar').innerHTML = json.usuario.nombre
        let g_id_submenu = 0;
        for (let item in json.data) {
            let id_submenu = json.data[item].id_submenu;
            if (g_id_submenu !== id_submenu){
                if (g_id_submenu !==0){
                    menu += `</ul>`;
                    menu += `</div>`;
                    menu += `</div>`;
                    menu += `</div>`;
                }
                menu += `<div class="accordion-item">`;
                menu += `<h2 class="accordion-header" id="heading${id_submenu}">`;
                menu += ` <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse${id_submenu}" aria-expanded="false" aria-controls="collapse${id_submenu}">`;
                menu += `${json.data[item].nombre_submenu}`;
                menu += `</button>`;
                menu += `</h2>`;
                menu += `<div id="collapse${id_submenu}" class="accordion-collapse collapse" aria-labelledby="heading${id_submenu}"
                data-bs-parent="#accordionExample">`;
                menu += `<div class="accordion-body">`;
                menu += `<ul class="list-group">`;
                g_id_submenu = id_submenu;
            }
            menu += `<li class="list-group-item list-group-item-action" onclick="cargar_formulario('panel-lista','${json.data[item].url}','')">${json.data[item].nombre_formulario}</li>`;
               
        }
    } else {
        location.href = '../admin'
    }
    if (menu !== "") {
        menu += `</ul>`;
        menu += `</div>`;
        menu += `</div>`;
        menu += `</div>`;
    }
    document.getElementById('accordion_menu').innerHTML = menu;
}