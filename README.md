# Arun Kumar — Transformation Coach

React + Vite + Tailwind CSS single-page site.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview
```

## Structure

```
index.html
public/images/          client photos (faces blurred) + hero
src/
  main.jsx
  App.jsx               section order
  index.css             Tailwind layers + reusable component classes
  data.js               all copy: transformations, programs, FAQs, testimonials
  lib/config.js         WhatsApp number, Instagram, email, phone + wa() helper
  hooks/useReveal.js    scroll reveal + count-up
  components/
    Chrome.jsx          logo, preloader, nav
    Sections.jsx        hero through footer
    Interactive.jsx     quiz, application form, FAQ accordion
    BeforeAfter.jsx     draggable before/after comparison
tailwind.config.js      Nocturne palette, radii, shadows, keyframes
```

## Editing content

Almost everything is in `src/data.js`. To change contact details, edit
`src/lib/config.js` — every WhatsApp CTA is generated from `WHATSAPP_NUMBER`
with its own pre-filled message.

## Still to supply

- Real testimonial quotes (currently marked as placeholders in `data.js`).
- Confirmed names, durations and before/after pairings for clients 02–05.
