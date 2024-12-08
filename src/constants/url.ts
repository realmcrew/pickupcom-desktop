import { IS_PRODUCTION } from '@/shared/helpers/is-production';

export const ESTIMATE_HOME_PAGE_URL = IS_PRODUCTION ? 'https://app.pickupcom.com' : 'http://localhost:3000';
