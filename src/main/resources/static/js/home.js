const URL = location.origin;

function showDangerAlert(message) {
	const container = document.createElement("div");
	let alert = `
        <div class="alert alert-danger appears-in-top-center text-center shadow-sm" role="alert">
            ${message}
        </div>
	`
	container.innerHTML = alert;
	$('body').prepend(container);

	setTimeout(function() {
		container.remove();
	}, 3000);
}

function showSuccessAlert(message) {
	const container = document.createElement("div");
	let alert = `
        <div class="alert alert-success appears-in-top-center text-center shadow-sm" role="alert">
            ${message}
        </div>
	`
	container.innerHTML = alert;
	$('body').prepend(container);

	setTimeout(function() {
		container.remove();
	}, 3000);
}

function getProgramadores() {
    let out = $.ajax({ method: "GET", url: `${URL}/api/programador/` });

    return out;
}

function getProgramador(id) {
    let out = $.ajax({ method: "GET", url: `${URL}/api/programador/${id}` });

    return out;
}

function getProyectos() {
    let out = $.ajax({ method: "GET", url: `${URL}/api/proyecto/` });

    return out;
}

function postProgramador(programador) {
    let out = $.ajax({ method: "POST", url: `${URL}/api/programador/`, data: JSON.stringify({
            codigo: programador.codigo,
            nombre: programador.nombre,
            apellido: programador.apellido,
            dni: programador.dni,
            hijos: programador.hijos,
            sueldo: programador.sueldo,
            proyecto: {
                codigo: programador.proyecto.codigo,
                nombre: null
            }
        }),
        contentType: "application/json",
        success: function() {
            showSuccessAlert(`Registro / Actualización exitosa!`);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            showDangerAlert(`Hubo un error al registrar, mensaje: ${textStatus}`)
        } });

    return out;
}

function deleteProgramador(id) {
    let out = $.ajax({ method: "DELETE", url: `${URL}/api/programador/${id}`});

    return out;
}

function addProgramadorIdToUrl(id) {
    history.pushState({}, '', location.pathname.concat(id));
}

function removeProgramadorIdToUrl() {
    history.pushState({}, '', location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1));
}

async function saveProgramador() {
    let id = location.pathname.substring(location.pathname.lastIndexOf("/") + 1, location.pathname.length);

    let out = await deleteProgramador(id);

    fillProgramadoresTable();
}

function mapProgramadorInTableRow(programador) {
    return `<tr>
                    <td scope="col">${programador.codigo}</td>
                    <td scope="col">${programador.nombre}</td>
                    <td scope="col">${programador.apellido}</td>
                    <td scope="col">${programador.dni}</td>
                    <td scope="col">${programador.hijos}</td>
                    <td scope="col">${programador.sueldo}</td>
                    <td scope="col">${programador.proyecto.nombre}</td>
                    <td scope="col">
                        <button type="button" class="btn btn-warning" data-bs-dismiss="modal" onclick="editProgramadorFromList('${programador.codigo}')" data-bs-toggle="modal" data-bs-target="#programadorModal">Seleccionar</button>
                    </td>
                </tr>
                `;
}

function mapProyectoInCombobox(proyecto) {
    return `<option value=${proyecto.codigo}>${proyecto.nombre}</option>
                    `;
}

async function fillProgramadorForm(id) {
    let programador = await getProgramador(id);

    $("#codigo").val(programador.codigo)
    $("#nombre").val(programador.nombre);
    $("#apellido").val(programador.apellido);
    $("#dni").val(programador.dni);
    $("#hijo").val(programador.hijos);
    $("#sueldo").val(programador.sueldo);
    $("#proyecto").val(programador.proyecto.codigo);
}

async function editProgramadorFromList(id) {
    addProgramadorIdToUrl(id);
    fillProgramadorForm(id);
}

async function deleteProgramadorFromList(id) {
    let out = await deleteProgramador(id);

    fillProgramadoresTable();
}

async function fillProgramadoresTable() {
    const programadoresTableBody = $("#programadores-table__body");

    programadoresTableBody.empty();

    let programadores = await getProgramadores();

    programadores.forEach(programador => {
        programadoresTableBody.append(mapProgramadorInTableRow(programador));
    })
}

async function fillProyectosCombobox() {
    const proyectosCombobox = $("#proyecto");

    let proyectos = await getProyectos();

    proyectos.forEach(proyecto => {
        proyectosCombobox.append(mapProyectoInCombobox(proyecto));
    })
}

function emptyProgramadorForm() {
    /*$("#descripcion").val(null);
    $("#precio").val(null);
    $("#stock").val(null);
    $("#marca").val(null);*/
}

function closeProgramadorModal() {
    $("#programadorModal").modal("hide");
}

function index() {
    let saveButton = $("#save-button");
    let programadorForm = $("#programadorForm");

    fillProgramadoresTable();
    fillProyectosCombobox();

    /*programadorForm.validate({
        messages: {
            descripcion: {
              required: "Por favor, pon una descripción",
              minlength: "Digita como mínimo 3 caracteres",
              maxlength: "Digita como máximo 30 caracteres"
            },
            precio: {
              required: "Por favor, pon un precio",
              pattern: "El patrón es: X.YY"
            },
            stock: {
              required: "Por favor, pon un stock",
              min: "La cantidad mínima es 1",
              max: "La cantidad máxima es 10"
            },
            marca: {
              required: "Por favor, elige una marca"
            },
          }
    });*/

    saveButton.on("click", e => {
        if(programadorForm.valid()) {
            saveProgramador();
            emptyProgramadorForm();
            closeProgramadorModal();
        }
    });

    $("#programadorModal").on("show.bs.modal", (e) => {
        emptyProgramadorForm();
    })

    $("#programadorModal").on("hidden.bs.modal", (e) => {
        removeProgramadorIdToUrl();
    })
}

$(document).ready(function() {
    index();
});