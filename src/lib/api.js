import axios from 'axios';
const apiKey = 'kmTKHAm9YVEs7M80K6Eo3YSj4ei8MvBTltw2iqIW'; // https://api.nasa.gov/#live_example

export function getAPOD(date = '') {
  return axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
}