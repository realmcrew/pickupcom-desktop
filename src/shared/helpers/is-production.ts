import { env } from '../env';

export const IS_PRODUCTION = env.VITE_APP_MODE === 'production';
