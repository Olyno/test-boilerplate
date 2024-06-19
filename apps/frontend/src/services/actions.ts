import axios from 'axios';

const cache = new Map<string, any>();

export async function getActions() {
  if (cache.has('actions')) {
    return cache.get('actions');
  }

  try {
    const response = await axios.get(`/actions`);
    cache.set('actions', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching actions:', error);
    throw error;
  }
}

export async function addAction(type: string) {
  return axios
    .post(`/actions`, {
      type,
    })
    .then(({ data }) => data);
}
