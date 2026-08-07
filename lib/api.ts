import axios from 'axios';

export const directServer = axios.create({
  baseURL: 'https://campers-api.goit.study',
});
