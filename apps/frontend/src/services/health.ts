import axios from 'axios';

export async function getBackendHealth() {
  return axios.get(`/`);
}
