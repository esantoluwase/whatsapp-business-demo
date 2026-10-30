# Haven & Co. — Luxury Real Estate Demo

A responsive, static luxury real-estate agency website for an Australian (Melbourne/VIC) demo.

## Files
- `index.html` — page structure
- `style.css` — responsive styling
- `data.js` — sample property listings
- `script.js` — search, filters, sorting, six-photo property gallery and email enquiry form

## Run locally
Because the JavaScript uses ES modules, serve the folder with a local web server (for example, VS Code Live Server) rather than opening `index.html` directly.

## Customise before using for a real agency
1. In `script.js`, replace `AGENCY_EMAIL` with the agency's real enquiry email address.
2. Replace the fictional listings in `data.js` with accurate, authorised property information and approved photos. Each listing supports six gallery images.
3. Update the agency email, address and branding in `index.html`.
4. Replace all `.example` email references. The enquiry form opens the visitor's default email app; it does not send or store enquiries on a server.
5. Confirm property price advertising complies with the relevant Australian state or territory rules. These listings are demo content only and are not real offers for sale.

## Publish
Upload the four website files to the root of your GitHub repository. Enable GitHub Pages in repository Settings → Pages and select the main branch/root folder.
