import { checklogin, logout } from './utils/auth';

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
const codigo_doc = document.getElementById('codigo_doc');

const dataTable = document.getElementById('data');
const searchInput = document.getElementById('search');

const texto = document.getElementById('message');

const api = import.meta.env.VITE_API_URL;
const state = {
  user: {},
};

window.addEventListener('load', async () => {
  try {
    const user = await checklogin();
    if (!user) return;
    state.user = user;
  } catch (error) {
    console.log(error);
  }
});

document.querySelector('.cerrar_ses').addEventListener('click', () => {
  logout();
});

fetch(`${api}/assistants`)
  .then((res) => res.json())
  .then((res) => {
    const objetoFiltrado = [];
    const objetoPrueba = [];

    objetoPrueba.push(...res.assistant);

    function printDatos(objeto = objetoPrueba) {
      objeto.map((element, index) => {
        let { nombre, _id, estado } = element;

        // tag
        let containerTag = document.createElement('tr'),
          nombreTag = document.createElement('td'),
          idTag = document.createElement('td'),
          activoTag = document.createElement('input'),
          labelTag = document.createElement('label'),
          spanTag = document.createElement('span');

        // atributes
        let checktype = document.createAttribute('type');
        let checked = document.createAttribute('checked');

        // values
        nombreTag.textContent = nombre;
        idTag.textContent = _id;
        checktype.value = 'checkbox';
        spanTag.textContent = !estado ? 'Disponible' : 'Ocupado';

        // set attributes
        activoTag.setAttributeNode(checktype);
        if (estado) activoTag.setAttributeNode(checked);

        // introduction
        labelTag.appendChild(activoTag);
        labelTag.appendChild(spanTag);
        containerTag.appendChild(labelTag);
        containerTag.appendChild(idTag);
        containerTag.appendChild(nombreTag);

        // print
        dataTable.appendChild(containerTag);

        // condition
        activoTag.addEventListener('change', () => {
          const editStatus = (data) => {
            fetch(`${api}/assistants/${_id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
              .then((res) => console.log(res))
              .catch((err) => console.error(err));
          };

          if (activoTag.checked !== true) {
            spanTag.innerHTML = 'Disponible';
            objetoPrueba[index].estado = false;
            editStatus(objetoPrueba[index]);
            console.log(objetoPrueba[index]);
          } else {
            spanTag.innerHTML = 'Ocupado';
            objetoPrueba[index].estado = true;
            editStatus(objetoPrueba[index]);
            console.log(objetoPrueba[index]);
          }
        });
      });
    }
    printDatos();

    searchInput.addEventListener('keyup', (e) => {
      dataTable.innerHTML = '';
      let value = e.target.value;
      let busqueda = objetoPrueba.filter(
        (el) =>
          el.nombre.toLocaleLowerCase().indexOf(value) !== -1 ||
          el.nombre.indexOf(value) !== -1
      );
      objetoFiltrado.push(busqueda);

      printDatos(objetoFiltrado[objetoFiltrado.length - 1]);
    });
  });

// const formIsValid = {
//   equipo: false,
// };

// equipo.addEventListener('change', (e) => {
//   console.log(e.target.checked);
//   if (e.target.checked == true) formIsValid.equipo = true;
// });

// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const data = new FormData(form);

//   checkInputs();

//   const arreglo = [
//     data.get('cLaptop') ? 'laptop' : '',
//     data.get('cProyector') ? 'proyector' : '',
//     data.get('cSonido') ? 'sonido' : '',
//   ].filter((item) => item !== '');

//   const payload = {
//     fechaDeUso: data.get('fechaDeUso'),
//     horaInicio: data.get('horaInicio'),
//     horaFinal: data.get('horaFinal'),
//     asignatura: data.get('asignatura'),
//     curso: data.get('curso'),
//     telefono: data.get('telefonoEstudiante'),
//     codigoDocente: data.get('codigoDocente'),
//     matriculaEstudiante: data.get('matricula'),
//     rol: 'estudiante',
//     equipos: arreglo,
//   };

//   console.log('payload', payload);

//   fetch(`${api}/form`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((res) => res.json())
//     .then((res) => (texto.innerHTML = res.message))
//     .catch((err) => console.log(err));
// });
