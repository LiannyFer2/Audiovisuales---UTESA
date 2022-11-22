/*
 * Form Validation
 */

// const form = document.getElementById('form')
// //equipos
// const equipo = document.getElementById('equipo')
// //fecha y hora
// const fecha = document.getElementById('fecha')
// const hora_inicio = document.getElementById('hora_inicio')
// const hora_fin = document.getElementById('hora_fin')
// //especificaciones
// const asignatura = document.getElementById('asignatura')
// const aula = document.getElementById('aula')
// //datos del estudiante
// const nombre_est = document.getElementById('nombre_est')
// const matricula = document.getElementById('matricula')
// const email = document.getElementById('email')
// const telefono = document.getElementById('telefono')
// //datos del docente
// const nombre_doc = document.getElementById('nombre_doc')
// const codigo_doc = document.getElementById('codigo_doc')

// const dataTable = document.getElementById('data')
// const searchInput = document.getElementById('search')

// const server = 'http://localhost:8080/api'

// fetch(`${server}/assistants`)
//   .then(res => res.json())
//   .then(res => {
//     const objetoFiltrado = [];
//     const objetoPrueba = [];

//     objetoPrueba.push(...res.assistant)

//     function printDatos(objeto = objetoPrueba) {
//       console.log("objetoPrueba", objetoPrueba)
//       objeto.map((element, index) => {
//         let { nombre, _id, estado, idAuxiliar } = element;

//         // tag
//         let
//           containerTag = document.createElement('tr'),
//           nombreTag = document.createElement('td'),
//           idTag = document.createElement('td'),
//           activoTag = document.createElement('input'),
//           labelTag = document.createElement('label'),
//           spanTag = document.createElement('span');

//         // atributes
//         let checktype = document.createAttribute('type');
//         let checked = document.createAttribute('checked');

//         // values
//         nombreTag.textContent = nombre;
//         idTag.textContent = idAuxiliar;
//         checktype.value = 'checkbox';
//         spanTag.textContent = !estado ? 'Disponible' : 'Ocupado';

//         // set attributes
//         activoTag.setAttributeNode(checktype);
//         if (estado) activoTag.setAttributeNode(checked)

//         // introduction
//         labelTag.appendChild(activoTag);
//         labelTag.appendChild(spanTag);
//         containerTag.appendChild(labelTag);
//         containerTag.appendChild(idTag);
//         containerTag.appendChild(nombreTag);

//         // print
//         dataTable.appendChild(containerTag);

//         // condition
//         activoTag.addEventListener('change', () => {
//           const editStatus = (data) => {
//             fetch(`${server}/assistants/${_id}`, {
//               method: 'PUT',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(data)
//             })
//               .then(res => console.log(res))
//               .catch(err => console.error(err))
//           }

//           if (activoTag.checked !== true) {
//             spanTag.innerHTML = 'Disponible'
//             objetoPrueba[index].estado = false
//             editStatus(objetoPrueba[index])
//             console.log(objetoPrueba[index])
//           } else {
//             spanTag.innerHTML = 'Ocupado'
//             objetoPrueba[index].estado = true
//             editStatus(objetoPrueba[index])
//             console.log(objetoPrueba[index])
//           }

//         })

//       })
//     }
//     printDatos()

//     searchInput.addEventListener('keyup', (e) => {
//       dataTable.innerHTML = ''
//       let value = e.target.value;
//       let busqueda = objetoPrueba.filter(el => el.nombre.toLocaleLowerCase().indexOf(value) !== -1 || el.nombre.indexOf(value) !== -1)
//       objetoFiltrado.push(busqueda)

//       printDatos(objetoFiltrado[objetoFiltrado.length - 1])
//     })
//   })

// const formIsValid = {
//   equipo: false,
// }

// equipo.addEventListener('change', (e) => {
//   console.log(e.target.checked)
//   if (e.target.checked == true) formIsValid.equipo = true
// })

// form.addEventListener('submit', (e) => {
//   e.preventDefault()

//   const data = new FormData(form)

//   checkInputs()

//   const arreglo = [
//     data.get("cLaptop") ? "laptop" : "",
//     data.get("cProyector") ? "proyector" : "",
//     data.get("cSonido") ? "sonido" : "",
//   ].filter(item => item !== "")

//   const payload = {
//     fechaDeUso: data.get("fechaDeUso"),
//     horaInicio: data.get("horaInicio"),
//     horaFinal: data.get("horaFinal"),
//     asignatura: data.get("asignatura"),
//     curso: data.get("curso"),
//     telefono: data.get("telefonoEstudiante"),
//     codigoDocente: data.get("codigoDocente"),
//     matriculaEstudiante: data.get("matricula"),
//     equipos: arreglo
//   }
//   console.log("payload", payload)

//   console.log(JSON.stringify(payload))

//   fetch(`${server}/form`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(payload)
//   })
//     .then(res => console.log(res))
//     .catch(err => console.error(err))
// })

// function pruebaExpresiones(expresion, input) {
//   input.addEventListener('keyup', () => {
//     if (expresion.test(input.value.trim())) console.log('funciona')
//     else console.log('error');
//   })
// }

// const checkInputArray = [
//   {
//     expresion: /^\D*\d{3}$/,
//     input: asignatura
//   },
//   {
//     expresion: /[a-cA-C ]{3}[0-9]{3}/,
//     input: aula
//   },
//   {
//     expresion: /[a-zA-Z ]/,
//     input: nombre_est
//   },
//   {
//     expresion: /^\D*\d{7}$/,
//     input: matricula
//   },
//   {
//     expresion: /[a-zA-Z ]/,
//     input: nombre_doc
//   },
//   {
//     expresion: /[a-zA-Z ]{3}[0-9]{3}/,
//     input: codigo_doc
//   },

// ]
// checkInputArray.map((elemento) => {
//   let { expresion, input } = elemento;

//   function validation(expresion, retornar) {
//     if (expresion.test(retornar)) setSuccessFor(retornar)
//     else setErrorFor(retornar)
//   }

//   input.addEventListener('keyup', () => {
//     toString()
//   })

// })

// function checkInputs() {
//   // remover espacios en blancos
//   const fechaValue = fecha.value.trim();
//   const hora_inicioValue = hora_inicio.value.trim();
//   const hora_finValue = hora_fin.value.trim();
//   const asignaturaValue = asignatura.value.trim();
//   const aulaValue = aula.value.trim();
//   const nombre_estValue = nombre_est.value.trim();
//   const matriculaValue = matricula.value.trim();
//   const emailValue = email.value.trim();
//   const telefonoValue = telefono.value.trim();
//   const nombre_docValue = nombre_doc.value.trim();
//   const codigo_docValue = codigo_doc.value.trim();

//   function validation(expresion, value, retornar) {
//     if (expresion.test(value)) setSuccessFor(retornar);
//     else setErrorFor(retornar);
//   }

//   validation(/[a-zA-Z ]/, asignaturaValue, asignatura);

//   validation(/[a-cA-C ]{3}[0-9]{3}/, aulaValue, aula);

//   validation(/[a-zA-Z ]/, nombre_estValue, nombre_est);

//   validation(/^\D*\d{7}$/, matriculaValue, matricula);

//   validation(/[a-zA-Z ]/, nombre_docValue, nombre_doc);

//   validation(/[a-zA-Z ]{3}[0-9]{3}/, codigo_docValue, codigo_doc);

//   validation(/^\D*\d{10}$/, telefonoValue, telefono);

//   validation(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, emailValue, email);
// }

// function setErrorFor(input, message) {
//   const formControl = input.parentElement;
//   const small = formControl.querySelector('small');
//   formControl.className = 'form-control error';
//   small.innerText = message;
// }

// function setSuccessFor(input) {
//   const formControl = input.parentElement;
//   formControl.className = 'form-control success';
// }

// function isEmail(email) {
//   return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//     email
//   );
// }

/*
 * Modal
 */

// const modal = document.getElementById('modal');
// const modalButton = document.querySelector('.cta');

// modalButton.addEventListener('click', () => {
//   if (typeof modal.showModal === 'function') {
//     modal.showModal();
//   }
// });
import moment from 'moment';
import studentInputs from './templates/studentInputs';
import teacherInputs from './templates/teacherInputs';
import { checklogin } from './utils/auth';
import { getStock } from './utils/updateStock';
/*
 * Form Validation
 */

const form = document.getElementById('form');
//equipos
const equipo = document.getElementById('equipo');
//fecha y hora

const laptops = document.getElementById('laptop');
const proyector = document.getElementById('proyector');
const sonidos = document.getElementById('Sonido');

const stocks = async () => {
  const stocks = await getStock();
  const proyectores = stocks.filter(({ tipo }) => tipo === 'proyector');
  const laptop = stocks.filter(({ tipo }) => tipo === 'laptop');
  const sonido = stocks.filter(({ tipo }) => tipo === 'sonido');
  console.log(stocks);
  return {
    proyectores,
    laptop,
    sonido,
  };
};
const texto = document.getElementById('message');

const server = 'http://localhost:8080/api';

const state = {
  user: {},
  form: [],
};

const insertStockInput = async () => {
  const { laptop, sonido, proyectores } = await stocks();

  const lOptions = laptop.map((item) => {
    const option = document.createElement('option');
    option.value = item._id;
    option.label = item.nombre;
    return option;
  });
  const pOptions = sonido.map((item) => {
    const option = document.createElement('option');
    option.value = item._id;
    option.label = item.nombre;
    return option;
  });
  const sOptions = proyectores.map((item) => {
    const option = document.createElement('option');
    option.value = item._id;
    option.label = item.nombre;
    return option;
  });

  laptops.append(...lOptions);
  proyector.append(...pOptions);
  sonidos.append(...sOptions);
};

window.addEventListener('load', async (ev) => {
  const user = await checklogin();
  if (!user) return;
  state.user = user;
  await insertStockInput();

  if (user.rol === 'docente') {
    form.innerHTML += teacherInputs({ ...user });
  } else {
    form.innerHTML += studentInputs({ ...user });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const nombre = document.getElementById('nombre_est')?.value;
    const matricula = document.getElementById('matricula')?.value;
    const email = document.getElementById('email')?.value;
    const telefono = document.getElementById('telefono')?.value;
    const fecha = document.getElementById('fecha');
    const hora_inicio = document.getElementById('hora_inicio');
    const hora_fin = document.getElementById('hora_fin');
    const laptops = document.getElementById('laptop');
    const proyector = document.getElementById('proyector');
    const sonidos = document.getElementById('Sonido');

    const idl = laptops.options[laptops.selectedIndex].value;
    const idp = proyector.options[proyector.selectedIndex].value;
    const ids = sonidos.options[sonidos.selectedIndex].value;

    let arreglo = [];
    if (idp !== 'default') {
      arreglo = [...arreglo, idp];
      if (ids !== 'default') arreglo = [...arreglo, ids];
    }
    if (idl !== 'default') arreglo = [...arreglo, idl];

    if (idp === 'defailt' && ids !== 'default') {
      alert('Solo si se va a proyectar puede seleccionar sonido');
      sonidos.focus();
      return;
    }
    let payload = {};
    const horaInicio = moment(data.get('horaInicio'));
    const fechaDeUso = horaInicio.format('YYYY-MM-DD');
    if (state.user.rol === 'docente') {
      payload = {
        fechaDeUso,
        horaInicio: data.get('horaInicio'),
        horaFinal: data.get('horaFinal'),
        asignatura: data.get('asignatura'),
        curso: data.get('curso'),
        telefono: telefono,
        codigoDocente: matricula,
        matriculaEstudiante: 'nada',
        equipos: arreglo,
        rol: 'docente',
      };
    } else {
      payload = {
        fechaDeUso,
        horaInicio: data.get('horaInicio'),
        horaFinal: data.get('horaFinal'),
        asignatura: data.get('asignatura'),
        curso: data.get('curso'),
        telefono: telefono,
        codigoDocente: data.get('codigoDocente'),
        matriculaEstudiante: matricula,
        rol: 'estudiante',
        equipos: arreglo,
      };
    }

    fetch(`${server}/form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        alert('Se ha creado una solicitud!');
        hora_fin.value = '';
        hora_inicio.value = '';
        const asignatura = document.getElementById('asignatura');
        const aula = document.getElementById('aula');
        if (user.rol === 'estudiante') {
          const nombre_doc = document.getElementById('nombre_doc');
          const codigo_doc = document.getElementById('codigo_doc');
          nombre_doc.value = '';
          codigo_doc.value = '';
        }
        asignatura.value = '';
        aula.value = '';
        laptops.selectedIndex = 0;
        proyector.selectedIndex = 0;
        sonidos.selectedIndex = 0;
        return res.json();
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  });
});

const formIsValid = {
  equipo: false,
};

function checkInputs() {
  // remover espacios en blancos
  const fecha = document.getElementById('fecha');
  const hora_inicio = document.getElementById('hora_inicio');
  const hora_fin = document.getElementById('hora_fin');
  //especificaciones
  const asignatura = document.getElementById('asignatura');
  console.log(asignatura);
  const aula = document.getElementById('aula');
  //datos del estudiante
  const nombre_est = document.getElementById('nombre_est');
  const matricula = document.getElementById('matricula');
  const email = document.getElementById('email');
  const telefono = document.getElementById('telefono');
  //datos del docente
  const nombre_doc = document.getElementById('nombre_doc');
  const codigo_doc = document.getElementById('codigo_doc');

  const dataTable = document.getElementById('data');
  const searchInput = document.getElementById('search');

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

  function validation(expresion, value, retornar) {
    if (expresion.test(value)) setSuccessFor(retornar);
    else setErrorFor(retornar);
  }

  validation(/[a-zA-Z ]/, asignaturaValue, asignatura);

  validation(/[a-cA-C ]{3}[0-9]{3}/, aulaValue, aula);

  validation(/[a-zA-Z ]/, nombre_estValue, nombre_est);

  validation(/^\D*\d{7}$/, matriculaValue, matricula);

  validation(/[a-zA-Z ]/, nombre_docValue, nombre_doc);

  validation(/^\D*\d{7}$/, codigo_docValue, codigo_doc);

  validation(/^\D*\d{10}$/, telefonoValue, telefono);

  validation(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, emailValue, email);
}

function checkInputsTeacher() {
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
  const codigo_doc = document.getElementById('codigo_doc');

  const dataTable = document.getElementById('data');
  const searchInput = document.getElementById('search');

  // remover espacios en blancos
  const fechaValue = fecha.value.trim();
  const hora_inicioValue = hora_inicio.value.trim();
  const hora_finValue = hora_fin.value.trim();
  const asignaturaValue = asignatura.value.trim();
  const aulaValue = aula.value.trim();
  const emailValue = email.value.trim();
  const telefonoValue = telefono.value.trim();
  const nombre_docValue = nombre_doc.value.trim();
  const codigo_docValue = codigo_doc.value.trim();

  function validation(expresion, value, retornar) {
    if (expresion.test(value)) setSuccessFor(retornar);
    else setErrorFor(retornar);
  }

  validation(/[a-zA-Z ]/, asignaturaValue, asignatura);

  validation(/[a-cA-C ]{3}[0-9]{3}/, aulaValue, aula);

  validation(/[a-zA-Z ]/, nombre_docValue, nombre_doc);

  validation(/[a-zA-Z ]{3}[0-9]{3}/, codigo_docValue, codigo_doc);

  validation(/^\D*\d{10}$/, telefonoValue, telefono);

  validation(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, emailValue, email);
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
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

/*
 * Modal
 */

const modal = document.getElementById('modal');
const modalButton = document.querySelector('.cta');

modalButton.addEventListener('click', () => {
  if (typeof modal.showModal === 'function') {
    modal.showModal();
  }
});
