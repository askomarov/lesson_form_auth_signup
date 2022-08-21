/* eslint-disable camelcase */
import axios from '../plugins/axios';

/**
 * Function locationCountry. Make login request to API
 * @param {}
 */
function seriializeCountries(countries) {
  console.log(countries);
  const res = Object
    .entries(countries)
    .map((entry) => ({ [entry[0]]: entry[1] }));
  console.log(res);
  return res;
}
