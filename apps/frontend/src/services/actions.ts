import { Action } from '@test-boilerplate/shared-types';
import axios from 'axios';

const cache = new Map<string, Action[]>();

export async function getActions() {
  if (cache.has('actions')) {
    return cache.get('actions') as Action[];
  }

  try {
    const response = await axios.get<Action[]>(
      `${import.meta.env.VITE_BACKEND_URL}/actions`
    );
    cache.set('actions', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching actions:', error);
    throw error;
  }
}

export async function addAction(type: string) {
  return axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/actions`, {
      type,
    })
    .then(({ data }) => data);
}
