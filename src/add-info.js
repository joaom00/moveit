const notAddButon = document.querySelector('.not-add-button');
const addButon = document.querySelector('.add-button');
const form = document.querySelector('form');
const inputName = document.querySelector('.input-name');
const inputLink = document.querySelector('.input-link');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  localStorage.setItem('@MoveIt:name', inputName.value);
  localStorage.setItem('@MoveIt:img', inputLink.value);
  window.location.pathname = '/public/index.html';
});

notAddButon.addEventListener('click', () => {
  window.location.pathname = '/public/index.html';
});
