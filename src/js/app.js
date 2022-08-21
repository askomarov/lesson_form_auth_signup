import 'bootstrap/dist/css/bootstrap.css';
// import './plugins';
// import 'bootstrap/dist/js/bootstrap.min.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';
import '../css/style.css';
import 'bootstrap';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showinputError, removeInputError } from './views/form';
import { login } from './services/auth.service';
import { getNews } from './services/news.service';
import { notify } from './views/notify';

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];

// Events
form.addEventListener('submit', e => {
  e.preventDefault();
  onSubmit();
});

inputs.forEach((input) => {
  input.addEventListener('focus', () => {
    removeInputError(input)
  });
});

// handlers
async function onSubmit() {
  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showinputError(el)
    }
    return isValidInput;
  });
  console.log(isValidForm);
  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value)
    await getNews();
    form.reset();
    // notify({ msg: ' login success!', className: 'alert-danger', timeout: 1000 })
    notify({ msg: ' login success!', className: 'alert-success' })
  } catch (error) {
    notify({ msg: ' login faild!', className: 'alert-danger' })
  }
}
// notify({ msg: ' text', className: 'alert-danger' })
// notify({ msg: ' text 2', className: 'alert-warning' })
// notify({ msg: ' text 3', className: 'alert-info' })

document.addEventListener('DOMContentLoaded', () => {

  const triggerTabList = document.querySelectorAll('#myTab button')

  console.log(triggerTabList);

  triggerTabList.forEach(triggerEl => {
    const tabTrigger = new bootstrap.Tab(triggerEl)

    triggerEl.addEventListener('click', event => {
      event.preventDefault()
      tabTrigger.show()
    })
  })
})
