/*
 * Form Validation
 */

const form = document.getElementById('form')
//equipos
const equipo = document.getElementById('equipo')
//fecha y hora
const fecha = document.getElementById('fecha')
const hora_inicio = document.getElementById('hora_inicio')
const hora_fin = document.getElementById('hora_fin')
//especificaciones
const asignatura = document.getElementById('asignatura')
const aula = document.getElementById('aula')
//datos del estudiante
const email = document.getElementById('email')
const telefono = document.getElementById('telefono')
//datos del docente
const nombre_doc = document.getElementById('nombre_doc')
const codigo_doc = document.getElementById('codigo_doc')

const server = 'http://localhost:8080/api'

const formIsValid = {
	equipo: false,
}

equipo.addEventListener('change', (e) => {
	console.log(e.target.checked)
	if (e.target.checked == true) formIsValid.equipo = true
})

form.addEventListener('submit', (e) => {
	e.preventDefault()

	const data = new FormData(form)

	checkInputs()

	const arreglo = [
		data.get("cLaptop") ? "laptop" : "",
		data.get("cProyector") ? "proyector" : "",
		data.get("cSonido") ? "sonido" : "",
	].filter(item => item !== "")

	const payload = {
		fechaDeUso: data.get("fechaDeUso"),
		horaInicio: data.get("horaInicio"),
		horaFinal: data.get("horaFinal"),
		asignatura: data.get("asignatura"),
		curso: data.get("curso"),
		telefono: data.get("telefonoEstudiante"),
		codigoDocente: data.get("codigoDocente"),
		matriculaEstudiante: 'nada',
		equipos: arreglo,
		rol: 'docente',
	}
	console.log("payload", payload)

	fetch(`${server}/form`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
		.then(res => console.log(res))
		.catch(err => console.error(err))
})

function checkInputs() {
	// remover espacios en blancos
	const fechaValue = fecha.value.trim()
	const hora_inicioValue = hora_inicio.value.trim()
	const hora_finValue = hora_fin.value.trim()
	const asignaturaValue = asignatura.value.trim()
	const aulaValue = aula.value.trim()
	const emailValue = email.value.trim()
	const telefonoValue = telefono.value.trim()
	const nombre_docValue = nombre_doc.value.trim()
	const codigo_docValue = codigo_doc.value.trim()

	function validation(expresion, value, retornar) {
		if (expresion.test(value)) setSuccessFor(retornar)
		else setErrorFor(retornar)
	}

	validation(
		/[a-zA-Z ]/,
		asignaturaValue,
		asignatura,
	)

	validation(
		/[a-cA-C ]{3}[0-9]{3}/,
		aulaValue,
		aula,
	)

	validation(
		/[a-zA-Z ]/,
		nombre_docValue,
		nombre_doc,
	)

	validation(
		/[a-zA-Z ]{3}[0-9]{3}/,
		codigo_docValue,
		codigo_doc,
	)

	validation(
		/^\D*\d{10}$/,
		telefonoValue,
		telefono,
	)

	validation(
		/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
		emailValue,
		email,
	)

}

function setErrorFor(input, message) {
	const formControl = input.parentElement
	const small = formControl.querySelector('small')
	formControl.className = 'form-control error'
	small.innerText = message
}

function setSuccessFor(input) {
	const formControl = input.parentElement
	formControl.className = 'form-control success'
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	)
}

/*
 * Modal
 */

const modal = document.getElementById('modal')
const modalButton = document.querySelector('.cta')

modalButton.addEventListener('click', () => {
	if (typeof modal.showModal === 'function') {
		modal.showModal()
	}
})
