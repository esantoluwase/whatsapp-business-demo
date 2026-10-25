# WhatsApp-First Small Business Website Demo

A reusable, responsive single-page website for restaurants, salons, barbershops, boutiques and other small businesses. The main goal is to help customers contact the business through WhatsApp.

## Seven sections
1. Sticky header with business name and WhatsApp CTA
2. Hero photo, name, tagline, order button and menu link
3. Responsive menu/product grid
4. Short owner-focused About section
5. Opening hours, address, phone, map and directions
6. Up to three genuine customer reviews (hidden when the list is empty)
7. Footer with Instagram, WhatsApp and address

## Customise
Edit the `BUSINESS` object near the top of `index.html`. Replace the name, tagline, accent, contact details, address/map search, photos, about text, hours, menu and reviews.

- WhatsApp number must use international format with digits only, e.g. `2348012345678`.
- Replace all sample details and photos before using the site for a real client.
- Do not invent reviews. Leave `reviews: []` until genuine, approved quotes are provided.
- Confirm prices, opening hours and address with the owner.

## Publish with GitHub Pages
1. Create a public repository such as `whatsapp-business-demo`.
2. Upload `index.html` and `README.md` to the repository root (not just the ZIP).
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then save.
6. Wait for deployment and open the URL displayed on the Pages settings screen.

## Performance notes
No framework, package installation, animation, carousel, cookie banner or third-party JavaScript library. Menu and owner images load lazily; the hero image is prioritised. External image hosting and the Google Maps iframe still depend on network conditions, so use compressed client photos and test on a slow mobile connection. The sample business details are placeholders; customise and test before production use.
