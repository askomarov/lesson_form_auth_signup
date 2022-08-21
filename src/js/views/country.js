// import locations from '../store/locations';

const container = document.querySelector('#counrty-list');
const containerCity = document.querySelector('#city-list');

function getTemplate(key, value) {
  return `
  <option value="${value}" data-index="${key}"></option>
  `;
}

export function renderCounries(list) {
  let fragment = '';
  // Object.entries(list).forEach(([key, value]) => {
  //   console.log(value);
  // });
  list.forEach((item) => {
    // console.log(item);
    Object.entries(item).forEach(([key, value]) => {
      const template = getTemplate(key, value);
      fragment += template;
    });
  });
  container.insertAdjacentHTML('afterbegin', fragment);
}

export function renderCities(list) {
  let fragment = '';
  // Object.entries(list).forEach(([key, value]) => {
  //   console.log(value);
  // });
  list.forEach((item) => {
    // console.log(item);
    Object.entries(item).forEach(([key, value]) => {
      const template = getTemplate(key, value);
      fragment += template;
    });
  });
  containerCity.insertAdjacentHTML('afterbegin', fragment);
}
