import axios from '../plugins/axios';

export async function getNews() {
  try {
    const response = await axios.get('/news');
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
