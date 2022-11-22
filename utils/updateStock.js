import moment from 'moment';

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

export const getStock = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
  const data = await response.json();
  return data.product;
};

const getReservations = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/reservations/today`
  );
  const data = await response.json();
  return data.reservation;
};
const setStock = async (stock, reservations) => {
  const newStock = stock.map((item) => {
    reservations.forEach(({ equipos }) => {
      const equipo = equipos.find(({ _id }) => {
        return _id === item._id;
      });
      if (equipo) item.stock--;
    });
    return item;
  });
  return newStock;
};

export const updateStock = async () => {
  const stock = await getStock();

  const reservations = await getReservations();
  const validReservations = getToInProgress(reservations);
  const newStock = await setStock(stock, validReservations);

  return newStock;
};
