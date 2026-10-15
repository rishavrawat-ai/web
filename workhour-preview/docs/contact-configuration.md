# Contact form configuration

- The client-confirmed required fields are email, company name, and message.
- The optional enquiry category is configured in `data/contact-options.ts` and remains hidden while there are no client-approved options.
- No approved recipient or working enquiry endpoint is present in this repository or the untouched `workhour-web` sources. The form validates locally and clearly states that it does not send messages.
- Add a verified recipient and an approved server-side submission integration before enabling enquiry delivery. Do not route submissions to Careers.
- No verified company certification records were found in the supplied frontend content. No certification badges or About certification section are displayed.

## Map data

`data/world-countries.geojson` contains Natural Earth 1:110m country geometry (public domain; [Natural Earth data](https://www.naturalearthdata.com/about/)). `scripts/generate-world-map.mjs` produces the small path table used by the map. Highlighted countries and the accessible country list both come from `data/presence-countries.ts`; every entry is marked provisional planning context.
