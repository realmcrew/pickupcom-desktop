import { env } from '@/shared/env';

export const IS_PRODUCTION = env.VITE_APP_MODE === 'production';
