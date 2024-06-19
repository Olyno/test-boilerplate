import {
  getActionTypes,
  getCron,
  incrementTime,
  resetCredits,
} from '../database';
import { env } from '../env';
import { eventEmitter } from '../routes/events';

export async function processResetCredit() {
  const cron = await getCron('CREDITS_RESET');

  if (!cron) return;

  const currentTime = Number(cron.time);

  if (currentTime * 1000 >= env.CREDIT_RECALC_INTERVAL) {
    await resetCredits();
    const actionTypes = await getActionTypes();
    eventEmitter.emit('action_types', {
      event: 'actionTypesChanged',
      data: actionTypes,
    });

    console.log('[ cron ] Reset credits');
  }

  await incrementTime('CREDITS_RESET');
}
