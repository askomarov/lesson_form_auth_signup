import 'bootstrap/dist/css/bootstrap.css';
import './plugins';
// import 'bootstrap/dist/js/bootstrap.min.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import * as bootstrap from 'bootstrap';
import '../css/style.css';
import locations from './store/locations';
import { renderCounries, renderCities } from './views/country';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showinputError, removeInputError } from './views/form';
import login from './services/auth.service';
import signup from './services/signup.service';

import { getNews } from './services/news.service';
import { notify } from './views/notify';

const {
  form, inputEmail, inputPassword, signupForm, regInputEmail, regInputPassword, regInputFirstName, regInputLastname, regInputNickname, regInputPhone, inputCountry, inputCity, inputBirthdate,
} = UI;
const inputs = [inputEmail, inputPassword];
const signupInputs = [regInputEmail, regInputPassword, regInputFirstName, regInputLastname, regInputNickname, regInputPhone, inputCountry, inputCity];

// handlers
async function initApp() {
  const response = await locations.getData();
  console.log(response);
  renderCounries(response);
}

async function getCities(index) {
  const response = await locations.getDataCities(index);
  console.log(response);
  renderCities(response);
}

async function onSubmit() {
  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showinputError(el);
    }
    return isValidInput;
  });

  console.log(isValidForm);

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    form.reset();
    // notify({ msg: ' login success!', className: 'alert-danger', timeout: 1000 })
    notify({ msg: ' login success!', className: 'alert-success' });
  } catch (error) {
    notify({ msg: ' login faild!', className: 'alert-danger' });
  }
}

function getGenderValue() {
  return document.querySelector('input[name="gender_orientation"]:checked').value;
}

async function onSignFormSubmit() {
  const isValidForm = signupInputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showinputError(el);
    }
    return isValidInput;
  });
  if (!isValidForm) return;

  const dateValueString = inputBirthdate.value.split('-');
  const birthYear = dateValueString[0];
  const birthMonth = dateValueString[1];
  const birthDay = dateValueString[2];

  const genderValue = getGenderValue();

  try {
    await signup(regInputEmail.value, regInputPassword.value, regInputNickname.value, regInputFirstName.value, regInputLastname.value, regInputPhone.value, genderValue, inputCity.value, inputCountry.value, birthDay, birthMonth, birthYear);
    signupForm.reset();
    notify({ msg: ' login success!', className: 'alert-success' });
  } catch (error) {
    notify({ msg: ' login faild!', className: 'alert-danger' });
  }
}

// Events
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  onSignFormSubmit();
});

function getOptionIndexByValue(options, value) {
  let index = '';
  options.forEach((option) => {
    if (option.value === value) {
      index = option.dataset.index;
    }
  });
  return index;
}

inputCountry.addEventListener('change', () => {
  if (inputCountry.value) {
    inputCity.removeAttribute('disabled');
    const countryOptions = document.querySelectorAll('#counrty-list option');
    const index = getOptionIndexByValue(countryOptions, inputCountry.value);
    getCities(index);
  } else {
    inputCity.value = '';
    inputCity.setAttribute('disabled', true);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmit();
});

inputs.forEach((input) => {
  input.addEventListener('focus', () => {
    removeInputError(input);
  });
});

signupInputs.forEach((input) => {
  input.addEventListener('focus', () => {
    removeInputError(input);
  });
});
// notify({ msg: ' text', className: 'alert-danger' })
// notify({ msg: ' text 2', className: 'alert-warning' })

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  notify({ msg: ' Hello new user!', className: 'alert-info' });
});
