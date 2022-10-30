
let cerrar = document.querySelectorAll(".close")[0];
let abrir = document.querySelectorAll(".cta")[0];
let modal = document.querySelectorAll(".modal")[0];
let modalC = document.querySelectorAll(".modal-container")[0];

abrir.addEventListener("click", function(e){
	e.preventDefault();
	modalC.style.opacity = "1";
	modalC.style.visibility = "visible";
	modal.classList.toggle("modal-close")
});

cerrar.addEventListener("click", function(){
	modal.classList.toggle("modal-close");
	
	setTimeout(function(){
		modalC.style.opacity = "0";
	modalC.style.visibility = "hidden";
	},850)
})

const form = document.getElementById('form');
//equipos
const equipo = document.getElementById('equipo');
//fecha y hora
const fecha = document.getElementById('fecha');
const hora_inicio = document.getElementById('hora_inicio');
const hora_fin = document.getElementById('hora_fin');
//especificaciones
const asignatura = document.getElementById('asignatura');
const aula = document.getElementById('aula');
//datos del estudiante
const nombre_est = document.getElementById('nombre_est');
const matricula = document.getElementById('matricula');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
//datos del docente
const nombre_doc = document.getElementById('nombre_doc');
const codigo_doc = document.getElementById('codigo_doc')

const formIsValid = {
    equipo: false
}

equipo
.addEventListener('change', (e) => {
    console.log(e.target.checked)
    if(e.target.checked == true) formIsValid.equipo = true
})

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	// remover espacios en blancos 
	const fechaValue = fecha.value.trim();
    const hora_inicioValue = hora_inicio.value.trim();
    const hora_finValue = hora_fin.value.trim();
    const asignaturaValue = asignatura.value.trim();
    const aulaValue = aula.value.trim();
	const nombre_estValue = nombre_est.value.trim();
    const matriculaValue = matricula.value.trim();
    const emailValue = email.value.trim();
	const telefonoValue = telefono.value.trim();
	const nombre_docValue = nombre_doc.value.trim();
    const codigo_docValue = codigo_doc.value.trim();
	
	if(fechaValue === '') {
		setErrorFor(fecha);
	} else {
		setSuccessFor(fecha);
	}

    if(hora_inicioValue === '') {
		setErrorFor(hora_inicio);
	} else {
		setSuccessFor(hora_inicio);
	}

    if(hora_finValue === '') {
		setErrorFor(hora_fin);
	} else {
		setSuccessFor(hora_fin);
	}

    if(asignaturaValue === '') {
		setErrorFor(asignatura);
	} else {
		setSuccessFor(asignatura);
	}

    if(aulaValue === '') {
		setErrorFor(aula);
	} else {
		setSuccessFor(aula);
	}

    if(nombre_estValue === '') {
		setErrorFor(nombre_est);
	} else {
		setSuccessFor(nombre_est);
	}

    if(matriculaValue === '') {
		setErrorFor(matricula);
	} else {
		setSuccessFor(matricula);
	}
		
	if(emailValue === '') {
		setErrorFor(email);
	} else if (!isEmail(emailValue)) {
		setErrorFor(email);
	} else {
		setSuccessFor(email);
	}
	
	if(telefonoValue === '') {
		setErrorFor(telefono);
	} else {
		setSuccessFor(telefono);
	}

    if(nombre_docValue === '') {
		setErrorFor(nombre_doc);
	} else {
		setSuccessFor(nombre_doc);
	}

    if(codigo_docValue === '') {
		setErrorFor(codigo_doc);
	} else {
		setSuccessFor(codigo_doc);
	}
	
	
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
