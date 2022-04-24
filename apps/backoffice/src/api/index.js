import axios from 'axios';

import { SERVER_BASE_URL } from '../constant';

export function api(config) {
  return axios.create({ baseURL: SERVER_BASE_URL }).request(config);
}
