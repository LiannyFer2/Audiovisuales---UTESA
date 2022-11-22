import moment from 'moment';
import { logout, checklogin } from './utils/auth';

const api = import.meta.env.VITE_API_URL;
const reservationTable = document.getElementById('dataReservaciones');

const actions = { TODOS: 1, VENCER: 2, TIEMPO: 3, CANCELADO: 4 };

const state = {
  principal2: {
    reservations: [],
    toTime: [],
    fewDays: [],
    stock: [],
    total: [],
    finished: [],
    auxiliares: [],
  },
  user: {},
};

const fetchParams = (method, object) => ({
  method: method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(object),
});

window.addEventListener('load', async (ev) => {
  const path = window.location.pathname || '';
  const user = await checklogin();
  if (!user) return;
  switch (path) {
    case '/Principal2.html':
      await Principal2Page();
      break;
    default:
      break;
  }
});

const renderReservationTable = (action = 'TODOS') => {
  reservationTable.innerHTML = '';
  const { fewDays, toTime, reservations, finished, total } = state.principal2;
  console.log(state.principal2);
  let data = [];
  if (action === 'VENCER') {
    data = [...fewDays];
  } else if (action === 'CANCELADO') {
    data = [...finished];
  } else if (action === 'TIEMPO') {
    data = [...toTime];
  } else if (action === 'TODOS') {
    data = [...total];
  } else {
    data = [...reservations];
  }
  data.forEach(({ idForm, ...element }, index) => {
    const containerTag = document.createElement('tr'),
      indexTag = document.createElement('td'),
      fechaTag = document.createElement('td'),
      aulaTag = document.createElement('td'),
      solicitanteTag = document.createElement('td'),
      rolTag = document.createElement('td'),
      inicioTag = document.createElement('td'),
      finTag = document.createElement('td'),
      tipoTag = document.createElement('td'),
      auxiliarTag = document.createElement('td'),
      buttonContainer = document.createElement('td'),
      actionButton = document.createElement('button'),
      auxiliarTagSelector = document.createElement('select'),
      auxiliarTagAlternative = document.createElement('td');

    actionButton.classList.add('btn-action');
    indexTag.textContent = index + 1;
    fechaTag.textContent = idForm.fechaDeUso;
    aulaTag.textContent = idForm.curso;
    inicioTag.textContent = moment(idForm.horaInicio).format('lll');
    finTag.textContent = moment(idForm.horaFinal).format('lll');
    tipoTag.textContent = element.equipos.map((res) => res?.nombre);
    rolTag.textContent = idForm.rol;

    let arrayElements = [
      indexTag,
      fechaTag,
      aulaTag,
      solicitanteTag,
      rolTag,
      inicioTag,
      finTag,
      tipoTag,
      auxiliarTag,
    ];

    if (idForm.rol === 'estudiante') {
      fetch(`${api}/students/${idForm.idEstudiante}`)
        .then((res) => res.json())
        .then((res) => {
          solicitanteTag.textContent = res.student?.nombre;
        });
    } else if (idForm.rol === 'docente') {
      fetch(`${api}/teachers/${idForm.idDocente}`)
        .then((res) => res.json())
        .then((res) => {
          solicitanteTag.textContent = res.teacher?.nombre;
        });
    }
    if (
      element.idAuxiliar &&
      (action === 'CANCELADO' ||
        action === 'TIEMPO' ||
        element._action === 'TIEMPO')
    ) {
      const auxiliar = getAuxiliar(element.idAuxiliar);
      auxiliarTag.textContent = auxiliar.nombre;
    }

    if (
      !element.idAuxiliar &&
      (action === 'CANCELADO' ||
        action === 'TIEMPO' ||
        element._action === 'TIEMPO')
    ) {
      auxiliarTag.textContent = 'NO ATENDIDO';
    }

    if (
      (action === 'TIEMPO' || element._action === 'TIEMPO') &&
      action !== 'CANCELADO'
    ) {
      actionButton.setAttribute('data-action', 'cancelar');
      actionButton.textContent = 'Cancelar';
      buttonContainer.appendChild(actionButton);
      containerTag.setAttribute('data-id', element._id);
      containerTag.setAttribute('data-option', action);
      arrayElements = [...arrayElements, buttonContainer];
    }
    if (
      !element.idAuxiliar &&
      (action === 'VENCER' || element._action === 'VENCER')
    ) {
      const firstOption = document.createElement('option');
      firstOption.textContent = 'Selecciona un Auxiliar';
      firstOption.setAttribute('selected', '');
      const auxs = validAuxiliars();
      const options = auxs.map((aux) => {
        const option = document.createElement('option');
        option.textContent = aux.nombre;
        option.setAttribute('value', aux._id);
        return option;
      });
      auxiliarTagSelector.append(firstOption, ...options);
      auxiliarTag.appendChild(auxiliarTagSelector);

      //create asignar button
      const asignarButton = document.createElement('button');
      asignarButton.textContent = 'asignar';
      buttonContainer.appendChild(asignarButton);
      arrayElements.push(buttonContainer);
      console.log(state.principal2.auxiliares);

      auxiliarTagSelector.addEventListener('change', (e) => {
        asignarButton.addEventListener('click', () => {
          if (e.target.value === 'Selecciona un Auxiliar') {
            auxiliarTagSelector.focus();
            return;
          }
          const auxiliar = getAuxiliar(e.target.value);

          let { _id, nombre } = auxiliar;
          let { estado, idAuxiliar, ...resto } = element;
          console.log(_id);
          fetch(
            `${api}/reservations/${element._id}`,
            fetchParams('PUT', {
              estado: true,
              idAuxiliar: _id,
              ...resto,
              idForm,
            })
          ).catch((err) => console.error(err));

          fetch(
            `${api}/assistants/${_id}`,
            fetchParams('PUT', {
              nombre,
              estado: true,
              _id,
            })
          )
            .then(() => {
              reloadTable()
                .then(() => alert('se ha asignado un auxiliar con exito!'))
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        });
      });
    }
    containerTag.append(...arrayElements);
    reservationTable.appendChild(containerTag);
  });
};

const getPorVencer = (reservations) => {
  const now = moment();

  const fewDate = reservations.filter((item) => {
    return moment(now).isBefore(item.idForm.horaInicio) && !item.idAuxiliar;
  });
  return fewDate;
};
const getPendientes = (reservations) => {
  const inProgress = reservations.filter(({ idAuxiliar, estado }) => {
    return idAuxiliar && estado;
  });
  return inProgress;
};

const getToInProgress = (reservations) => {
  const now = moment();
  const inProgress = reservations.filter(
    ({ idAuxiliar, idForm: { horaFinal, horaInicio }, estado }) => {
      return (
        moment(now).isBetween(moment(horaInicio), moment(horaFinal)) &&
        idAuxiliar &&
        estado
      );
    }
  );
  if (inProgress.length > 0)
    localStorage.setItem('inProgress', JSON.stringify(inProgress));
  return inProgress;
};

const getFinished = (reservations) => {
  const now = moment();

  const finished = reservations.filter(
    ({ idForm: { horaFinal, horaInicio }, idAuxiliar, rol }) => {
      console.log(rol);
      return (
        (moment(now).isSameOrAfter(moment(horaFinal)) ||
          (moment(now).isSameOrAfter(moment(horaInicio)) && !idAuxiliar)) &&
        rol === 'terminado'
      );
    }
  );
  return finished;
};

const reservationsRequest = async () => {
  try {
    const response = await fetch(`${api}/reservations/today`);
    const data = await response.json();

    const fewDays = getPorVencer(data.reservation);
    const toTime = getToInProgress(data.reservation);
    const finished = getFinished(data.reservation);

    state.principal2.reservations = [...data.reservation];
    state.principal2.fewDays = [...fewDays];
    state.principal2.toTime = [...toTime];
    state.principal2.finished = [...finished];
    const decision = [
      ...getPendientes(state.principal2.reservations).map((item) => {
        item._action = 'TIEMPO';
        return item;
      }),
      ...fewDays.map((item) => {
        item._action = 'VENCER';
        return item;
      }),
    ];
    state.principal2.total = [...decision];
  } catch (error) {
    throw new Error(error);
  }
};

const principal2PageEvents = () => {
  //options menu
  document.querySelector('.btn-group').addEventListener('click', (ev) => {
    const clicked = ev.target.closest('input');
    if (clicked?.classList.contains('btn-check')) {
      const value = clicked.getAttribute('value').toUpperCase();
      renderReservationTable(value);
    }
  });

  //table
  reservationTable.addEventListener('click', async (ev) => {
    try {
      const isButtonAction = ev.target.classList.contains('btn-action');
      if (isButtonAction) {
        const value = ev.target.dataset.action;
        const containerTag = ev.target.closest('tr');
        if (value === 'cancelar') {
          const { reservations } = state.principal2;
          const id = containerTag.dataset.id;
          const element = reservations.find(({ _id }) => id === _id);
          await fetch(
            `${api}/reservations/${element._id}`,
            fetchParams('PUT', {
              ...element,
              estado: false,
              rol: 'terminado',
            })
          );
          await reloadTable();
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
  document.querySelector('.cerrar_ses').addEventListener('click', () => {
    logout();
  });
};

const reloadTable = async (action = 'TODOS') => {
  await reservationsRequest();
  renderReservationTable(action);
};

const Principal2Page = async () => {
  try {
    await stockRequest();
    await auxiliarRequest();
    await reloadTable();
    principal2PageEvents();
  } catch (error) {
    // (estado = false),
    //   (condition = false),
    //   (showCancelar = true),
    //   (showAsignar = true);
    console.error(error);
  }
};

const stockRequest = async () => {
  const response = await fetch(`${api}/products`);
  const data = await response.json();

  const stocks = data.product;

  state.principal2.stock = [...stocks];
};
const auxiliarRequest = async () => {
  const response = await fetch(`${api}/assistants`);
  const data = await response.json();

  // const assistants = data.assistant.filter((aux) => aux.estado === false);

  state.principal2.auxiliares = [...data.assistant];
};
const validAuxiliars = () => {
  return state.principal2.auxiliares.filter(({ estado }) => !estado);
};

const getAuxiliar = (id) => {
  return state.principal2.auxiliares.find((aux) => aux._id === id);
};
