import throttle from 'lodash.throttle';

const ref = {
  form: document.querySelector('.feedback-form'),
  outEmai: document.querySelector("[type = 'email']"),
  outMessage: document.querySelector("[name = 'message']"),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';
const fieldValue = {};

ref.form.addEventListener('input', throttle(hendleEventForm, 1000));
ref.form.addEventListener('submit', hendleEventSubmit);

fillingFildFromStorage();

function fillingFildFromStorage() {
  const getMessage = localStorage.getItem(LOCALSTORAGE_KEY);

  if (getMessage) {
    const object = JSON.parse(getMessage);

    ref.outEmai.value = object.email !== undefined ? object.email : '';
    ref.outMessage.value = object.message !== undefined ? object.message : '';
  }
}

function hendleEventForm(eve) {
  fieldValue[eve.target.name] = eve.target.value;
  saveInLocalStorage(fieldValue);
}

function hendleEventSubmit(eve) {
  eve.preventDefault();
  if (!eve.target.elements.email.value === false) {
    console.log({
      [eve.target.elements.email.name]: eve.target.elements.email.value,
      [eve.target.elements.message.name]: eve.target.elements.message.value,
    });
    eve.target.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }
}

function saveInLocalStorage(fieldValue) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(fieldValue));
}
