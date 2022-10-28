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

function getComputadoras() {
    let out = $.ajax({ method: "GET", url: `${URL}/api/computadora/` });

    return out;
}

function getComputadora(id) {
    let out = $.ajax({ method: "GET", url: `${URL}/api/computadora/${id}` });

    return out;
}

function getMarcas() {
    let out = $.ajax({ method: "GET", url: `${URL}/api/marca/` });

    return out;
}

function postComputadora(computadora) {
    let out = $.ajax({ method: "POST", url: `${URL}/api/computadora/`, data: JSON.stringify({
            codigo: computadora.codigo,
            descripcion: computadora.descripcion,
            precio: computadora.precio,
            stock: computadora.stock,
            marca: {
                codigo: computadora.marca.codigo,
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

function deleteComputadora(id) {
    let out = $.ajax({ method: "DELETE", url: `${URL}/api/computadora/${id}`});

    return out;
}

function addComputadoraIdToUrl(id) {
    history.pushState({}, '', location.pathname.concat(id));
}

function removeComputadoraIdToUrl() {
    history.pushState({}, '', location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1));
}

async function saveComputadora() {
    let id = location.pathname.substring(location.pathname.lastIndexOf("/") + 1, location.pathname.length);

    let computadora = {
        codigo: id == '' ? null : id,
        descripcion: $("#descripcion").val(),
        precio: $("#precio").val(),
        stock: $("#stock").val(),
        marca: {
            codigo: parseInt($("#marca").val(), 10),
            nombre: null
        }
    };

    let out = await postComputadora(computadora);

    fillComputadorasTable();
}

function mapComputadoraInTableRow(computadora) {
    return `<tr>
                    <td scope="col">${computadora.codigo}</td>
                    <td scope="col">${computadora.descripcion}</td>
                    <td scope="col">${computadora.precio}</td>
                    <td scope="col">${computadora.stock}</td>
                    <td scope="col">${computadora.marca.nombre}</td>
                    <td scope="col">
                        <button type="button" class="btn btn-warning" data-bs-dismiss="modal" onclick="editComputadoraFromList('${computadora.codigo}')" data-bs-toggle="modal" data-bs-target="#computadoraModal">Editar</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteComputadoraFromList('${computadora.codigo}')">Eliminar</button>
                    </td>
                </tr>
                `;
}

function mapMarcaInCombobox(marca) {
    return `<option value=${marca.codigo}>${marca.nombre}</option>
                    `;
}

async function fillComputadoraForm(id) {
    let computadora = await getComputadora(id);

    $("#descripcion").val(computadora.descripcion);
    $("#precio").val(computadora.precio);
    $("#stock").val(computadora.stock);
    $("#marca").val(computadora.marca.codigo);
}

async function editComputadoraFromList(id) {
    addComputadoraIdToUrl(id);
    fillComputadoraForm(id);
}

async function deleteComputadoraFromList(id) {
    let out = await deleteComputadora(id);

    fillComputadorasTable();
}

async function fillComputadorasTable() {
    const computadorasTableBody = $("#computadoras-table__body");

    computadorasTableBody.empty();

    let computadoras = await getComputadoras();

    computadoras.forEach(computadora => {
        computadorasTableBody.append(mapComputadoraInTableRow(computadora));
    })
}

async function fillMarcasCombobox() {
    const marcasCombobox = $("#marca");

    let marcas = await getMarcas();

    marcas.forEach(marca => {
        marcasCombobox.append(mapMarcaInCombobox(marca));
    })
}

function emptyComputadoraForm() {
    $("#descripcion").val(null);
    $("#precio").val(null);
    $("#stock").val(null);
    $("#marca").val(null);
}

function closeComputadoraModal() {
    $("#computadoraModal").modal("hide");
}

function index() {
    let saveButton = $("#save-button");
    let computadoraForm = $("#computadoraForm");

    fillComputadorasTable();
    fillMarcasCombobox();

    computadoraForm.validate({
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
    });

    saveButton.on("click", e => {
        if(computadoraForm.valid()) {
            saveComputadora();
            emptyComputadoraForm();
            closeComputadoraModal();
        }
    });

    $("#computadoraModal").on("show.bs.modal", (e) => {
        emptyComputadoraForm();
    })

    $("#computadoraModal").on("hidden.bs.modal", (e) => {
        removeComputadoraIdToUrl();
    })
}

$(document).ready(function() {
    index();
});