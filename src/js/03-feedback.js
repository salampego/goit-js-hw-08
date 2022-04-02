const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const emailForm = document.querySelector('.feedback-form input');
const textArea = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';

let fromData = {};

form.addEventListener('submit', onFormSubmit);
populateEmailForm();

form.addEventListener('input', throttle(detectForm, 500));

function detectForm(e) {
  fromData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fromData));
}
function onFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  formData.forEach((key, value) => console.log(`${value}: ${key}`));
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateEmailForm() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    emailForm.value = savedMessage.email;
    textArea.value = savedMessage.message;
    formData = savedMessage;
  }
}
