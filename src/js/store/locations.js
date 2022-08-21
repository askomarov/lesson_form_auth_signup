/* eslint-disable class-methods-use-this */
import axios from '../plugins/axios';

class Locations {
  constructor() {
    this.countries = null;
  }

  seriializeCountries(countries) {
    const res = Object
      .entries(countries)
      .map((entry) => ({ [entry[0]]: entry[1] }));
    return res;
  }

  getObjFromArrayObj() {
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  async getData() {
    try {
      const response = await axios.get('/location/get-countries');
      const countries = this.seriializeCountries(response);
      this.countries = countries;
      return this.countries;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async getDataCities(index) {
    try {
      const response = await axios.get(`/location/get-cities/${index}`);
      const countries = this.seriializeCountries(response);
      this.countries = countries;
      return this.countries;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

const locations = new Locations();

export default locations;
