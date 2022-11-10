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
const nombre_est = document.getElementById('nombre_est')
const matricula = document.getElementById('matricula')
const email = document.getElementById('email')
const telefono = document.getElementById('telefono')
//datos del docente
const nombre_doc = document.getElementById('nombre_doc')
const codigo_doc = document.getElementById('codigo_doc')

//button submit
const buttonSubmit = document.getElementById('buttonSubmit')

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

  console.log(data)

  checkInputs()
})


const checkInputArray = [
  {
    expresion: /^\D*\d{10}$/,
    input: telefono
  },
  {
    expresion: /^[a-zA-Z]{2,254}$/,
    input: asignatura
  },
  {
    expresion: /^[a-cA-C]{1}[0-9]{3}$/,
    input: aula
  },
  {
    expresion: /^[a-zA-Z]{2,254}$/,
    input: nombre_est
  },
  {
    expresion: /^\D*\d{7}$/,
    input: matricula
  },
  {
    expresion: /^[a-zA-Z]{2,254}$/,
    input: nombre_doc
  },
  {
    expresion: /^[a-zA-Z]{3}[0-9]{3}$/,
    input: codigo_doc
  },

]

checkInputArray.map((elemento) => {
  let { expresion, input } = elemento;

  console.log("🚀 ~ file: main.js ~ line 84 ~ checkInputArray.map ~ buttonSubmit", buttonSubmit)

  function validation(expresion, retornar) {
    if (expresion.test(retornar.value.trim())) setSuccessFor(retornar)
    else setErrorFor(retornar)
  }


  input.addEventListener('keyup', () => {
    validation(expresion, input)
  })

})

function checkInputs() {
  // remover espacios en blancos
  const fechaValue = fecha.value.trim()
  const hora_inicioValue = hora_inicio.value.trim()
  const hora_finValue = hora_fin.value.trim()
  const asignaturaValue = asignatura.value.trim()
  const aulaValue = aula.value.trim()
  const nombre_estValue = nombre_est.value.trim()
  const matriculaValue = matricula.value.trim()
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
    /[a-cA-C ]{1}[0-9]{3}/,
    aulaValue,
    aula,
  )

  validation(
    /[a-zA-Z ]/,
    nombre_estValue,
    nombre_est,
  )

  validation(
    /^\D*\d{7}$/,
    matriculaValue,
    matricula
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

}

function setErrorFor(input, message) {
  const formControl = input.parentElement
  const small = formControl.querySelector('small')
  formControl.className = 'form-control error'
  small.innerText = message

  const disable = document.createAttribute('disabled')
  buttonSubmit.setAttributeNode(disable)
  buttonSubmit.className = 'errorbutton'
  
}

function setSuccessFor(input) {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
  buttonSubmit.removeAttribute('disabled')
  buttonSubmit.className = 'successButton'
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