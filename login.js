import { checklogin, login } from './utils/auth';

const form = document.querySelector('.form_login');

window.addEventListener('load', async () => {
  try {
    await checklogin();
    await loginEvents();
  } catch (error) {
    console.error(error);
  }
});

const loginEvents = async () => {
  try {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      try {
        const inputs = ev.target;
        const emailInput = inputs[0];
        const passwordInput = inputs[1];
        const checkStudent = inputs[2];
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();

        const rol = checkStudent.checked ? 'estudiante' : 'docente';
        await login({ email, password });
      } catch (error) {
        throw new Error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
