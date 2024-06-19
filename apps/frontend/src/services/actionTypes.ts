import axios from 'axios';

const cache = new Map<number, string>();

export async function getActionTypes() {
  if (cache.size > 0) {
    return Object.fromEntries(cache);
  }

  try {
    const response = await axios.get(`/action_types`);

    response.data.forEach((actionType: any) => {
      cache.set(actionType.id, actionType);
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching action types:', error);
    throw error;
  }
}

export function getActionTypeById(id: number): any {
  return cache.get(id);
}
