const notAddButon = document.querySelector('.not-add-button');
const addButon = document.querySelector('.add-button');
const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  localStorage.setItem('@MoveIt:img', input.value);
  window.location.pathname = '/public/index.html';
});

notAddButon.addEventListener('click', () => {
  window.location.pathname = '/public/index.html';
});

// addButon.addEventListener('click', () => {
//   window.location.pathname = '/public/index.html';
// });
