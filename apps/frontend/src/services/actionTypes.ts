import { ActionType } from '@test-boilerplate/shared-types';
import axios from 'axios';

const cache = new Map<number, ActionType>();

export async function getActionTypes() {
  if (cache.size > 0) {
    return Object.fromEntries(cache) as unknown as ActionType[];
  }

  try {
    const response = await axios.get<ActionType[]>(
      `${import.meta.env.VITE_BACKEND_URL}/action_types`
    );

    response.data.forEach((actionType) => {
      cache.set(actionType.id, actionType);
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching action types:', error);
    throw error;
  }
}

export function getActionTypeById(id: number) {
  return cache.get(id);
}
