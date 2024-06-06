import { executeAction, getNextAction } from '../database';
import { Action } from '../database/schema';
import { env } from '../env';
import { eventEmitter } from '../routes/events';

let nextAction: Action | null = null;

export async function processAction() {
  const now = Date.now();
  if (!nextAction) nextAction = await getNextAction();
  if (!nextAction) return;

  const addedAt = Number(nextAction.added_at);

  if (now - addedAt >= env.EXECUTION_INTERVAL) {
    await executeAction(nextAction);
    eventEmitter.emit('action', {
      event: 'actionExecuted',
      data: nextAction,
    });
    nextAction = null;
  }
}
