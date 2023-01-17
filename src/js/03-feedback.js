import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const ref = {
  form: document.querySelector('.feedback-form'),
  outEmai: document.querySelector("[type = 'email']"),
  outMessage: document.querySelector("[name = 'message']"),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';

ref.form.addEventListener('input', throttle(hendleEventForm, 1000));
ref.form.addEventListener('submit', hendleEventSubmit);

fillingFormFromLS();

function hendleEventForm(eve) {
  let localStorageRequer = load(LOCALSTORAGE_KEY);
  localStorageRequer = localStorageRequer ? localStorageRequer : {};
  localStorageRequer[eve.target.name] = eve.target.value;

  save(LOCALSTORAGE_KEY, localStorageRequer);
}

function hendleEventSubmit(eve) {
  eve.preventDefault();
  if (!eve.target.elements.email.value === false) {
    console.log({
      [eve.target.elements.email.name]: eve.target.elements.email.value,
      [eve.target.elements.message.name]: eve.target.elements.message.value,
    });
    eve.target.reset();
    remove(LOCALSTORAGE_KEY);
  }
}

function fillingFormFromLS() {
  const object = load(LOCALSTORAGE_KEY);
  if (object !== undefined) {
    ref.outEmai.value = object.email !== undefined ? object.email : '';
    ref.outMessage.value = object.message !== undefined ? object.message : '';
  }
}
