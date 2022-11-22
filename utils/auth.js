const getUser = async (userEmail = '') => {
  const path = window.location.pathname || '';
  try {
    const users = await (
      await fetch(`${import.meta.env.VITE_API_URL}/usuarios`)
    ).json();

    const user = users.find(({ correo }) => userEmail === correo);
    if (user) return user;
    if (path !== '/login.html') {
      window.location.href = 'login.html';
      localStorage.removeItem('user');
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const checklogin = async () => {
  //todo fetch api
  try {
    const userLogged = localStorage.getItem('user');
    const path = window.location.pathname || '';
    if (userLogged) {
      const user = await getUser(userLogged);
      if (user && path !== '/login.html') {
        return user;
      }
      window.location.href = 'index.html';
    }
    if (path !== '/login.html') {
      window.location.href = 'login.html';
    }
    return;
  } catch (error) {
    console.error(error);
  }
};

export const login = async ({ email, password }) => {
  try {
    const users = await (
      await fetch(`${import.meta.env.VITE_API_URL}/usuarios`)
    ).json();
    const user = users.find(
      (user) => user.correo === email && user.password === password
    );
    if (user) {
      window.location.href = 'index.html';
      localStorage.setItem('user', user.correo);
      return;
    }
    alert('Usuario no registrado, favor revisar el email o contraseña');
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  window.location.href = 'https://www.utesa.edu/home/';
};
