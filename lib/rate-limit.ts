// Rate limiter in-memory, per singola istanza del processo.
// TODO(API-004): sostituire con uno store condiviso (es. Redis) prima del
// deploy multi-istanza/serverless, dove questa Map non è condivisa tra
// invocazioni e viene azzerata a ogni cold start.

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const requestLog = new Map<string, number[]>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(identifier) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(identifier, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(identifier, timestamps);
  return false;
}
