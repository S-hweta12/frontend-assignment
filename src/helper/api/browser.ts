import { setupWorker } from 'msw/browser'
import { apiHandlers } from './';

export const worker = setupWorker(...apiHandlers);