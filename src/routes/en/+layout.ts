import { loadTranslations } from '$lib/translations';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ url }) => {
  let initLocale = 'en';
  await loadTranslations(initLocale)
  return {
    initLocale
  };
}