import i18n from "sveltekit-i18n";

const config = ({
      loaders: [
            {
                  locale: "en",
                  key: "common",
                  loader: async () => (
                        await import('./translations/en.json')
                  ).default,
            },
            {
                  locale: "et",
                  key: "common",
                  loader: async () => (
                        await import('./translations/et.json')
                  ).default,
            }
      ]
})

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);