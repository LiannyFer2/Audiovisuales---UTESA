import { checklogin, logout } from './utils/auth';
import { getStock, updateStock } from './utils/updateStock';

const state = {
  products: [],
  user: [],
};

const api = import.meta.env.VITE_API_URL;

const dataInventario = document.getElementById('inventarioBody'),
  select = document.getElementById('inputGroupSelect02'),
  selectFilter = document.getElementsByName('btnradio'),
  crearEquipoForm = document.getElementById('crearEquipoForm');

window.addEventListener('load', async (ev) => {
  await inventarioPage();
});

const fetchParams = (method, object) => ({
  method: method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(object),
});

const inventarioRequest = async () => {
  try {
    const products = await updateStock();
    const testProduct = await getStock();
    console.table(testProduct);
    state.products = [...products];
  } catch (error) {
    console.log(error);
  }
};

const inventarioRender = () => {
  dataInventario.innerHTML = '';
  state.products.forEach((product, index) => {
    const dataContainer = document.createElement('tr'),
      indexTag = document.createElement('td'),
      nombreTag = document.createElement('td'),
      tipoTag = document.createElement('td'),
      stockTag = document.createElement('td');

    indexTag.textContent = product._id;
    nombreTag.textContent = product.nombre;
    tipoTag.textContent = product.tipo;
    stockTag.textContent = product.stock;

    const arrayElements = [indexTag, nombreTag, tipoTag, stockTag];
    dataContainer.append(...arrayElements);
    dataInventario.appendChild(dataContainer);
  });
};

const inventarioPage = async () => {
  const user = await checklogin();
  if (!user) return;
  state.user = user;

  await inventarioRequest();
  inventarioRender();
  selectRender();
  inventarioEvents();
};
const selectRender = () => {
  const optionTags = [];
  const existingValues = [];
  state.products.forEach(({ tipo }) => {
    if (!existingValues.includes(tipo.toLowerCase())) {
      const optionTag = document.createElement('option');
      optionTag.value = tipo.toLowerCase();
      optionTag.innerText =
        tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();

      existingValues.push(tipo.toLowerCase());
      optionTags.push(optionTag);
    }
  });
  select.append(...optionTags);
};

const inventarioEvents = () => {
  crearEquipoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const stockElement = e.target[2];
      const tipoElement = e.target[1];
      const nombreElement = e.target[0];

      const nombre = nombreElement.value.trim();
      const stock = +stockElement.value.trim();
      const tipo = tipoElement.value.trim();
      if (nombre.length <= 0) {
        alert('Complete el nombre');
        nombreElement.focus();
        return;
      }
      if (tipo === 'seleccione') {
        alert('seleccione un tipo de producto');
        tipoElement.focus();
        return;
      }
      if (!(stock > 0)) {
        alert('el stock debe ser mayor que 0');
        stockElement.focus();
        return;
      }

      await fetch(
        `${api}/products`,
        fetchParams('POST', {
          nombre,
          tipo,
          stock,
        })
      );
      await inventarioRequest();
      inventarioRender();
    } catch (error) {
      console.log(error);
    }

    document.querySelector('.cerrar_ses').addEventListener('click', () => {
      logout();
    });
  });

  select.addEventListener('change', async (e) => {
    dataInventario.innerHTML = '';
    let value = e.target.value;

    await inventarioRequest();
    if (value === 'todos') inventarioRender();
    else {
      let filtrarTipo = state.products.filter((item) => {
        console.log(item.tipo, value);
        return value === item.tipo;
      });
      state.products = [...filtrarTipo];
      inventarioRender();
    }
  });
};

// fetch(`${server}/products`)
//   .then((res) => res.json())
//   .then((res) => {
//     let products = res.product;
//     function printData(array = products) {
//       array.map((element) => {
//         let dataContainer = document.createElement('tr'),
//           indexTag = document.createElement('td'),
//           nombreTag = document.createElement('td'),
//           tipoTag = document.createElement('td'),
//           stockTag = document.createElement('td');

//         indexTag.textContent = element._id;
//         nombreTag.textContent = element.nombre;
//         tipoTag.textContent = element.tipo;
//         stockTag.textContent = element.stock;

//         let arrayElements = [indexTag, nombreTag, tipoTag, stockTag];
//         arrayElements.map((res) => dataContainer.appendChild(res));
//         if (dataInventario) {
//           dataInventario.appendChild(dataContainer);
//         }

//         stockTag.addEventListener('change', (e) => {
//           let value = e.target.value;
//           let { stock, ...resto } = element;

//           fetch(
//             `${server}/products/${element._id}`,
//             fetchParams('PUT', {
//               ...resto,
//               stock: value,
//             })
//           ).then(console.log);
//         });
//       });
//     }
//     // calls again
//     printData();
//     if (select)
//       select.addEventListener('change', (e) => {
//         dataInventario.innerHTML = '';
//         let value = e.target.value;

//         if (value === 'filtrado') printData();
//         else {
//           let filtrarTipo = products.filter(
//             (res) => res.tipo.toLocaleLowerCase().indexOf(value) !== -1
//           );
//           printData(filtrarTipo);
//         }
//       });
//   });

// if (crearEquipoForm)
//   crearEquipoForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     fetch(
//       `${server}/products`,
//       fetchParams('POST', {
//         nombre: e.target[0].value,
//         tipo: e.target[1].value,
//         stock: e.target[2].value,
//       })
//     )
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res);
//       });
//   });
