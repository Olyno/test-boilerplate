import { env } from './env';

export function calculateCredits() {
  return Math.floor((Math.random() * 0.2 + 0.8) * env.MAX_CREDITS);
}

export function takeUniqueOrThrow<T extends any[]>(values: T): T[number] {
  if (values.length !== 1)
    throw new Error('Found non unique or inexistent value');
  return values[0]!;
}

export function takeUnique<T extends any[]>(values: T): T[number] {
  return values[0]!;
}
