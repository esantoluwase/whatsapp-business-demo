// Change these details for each business before sharing the demo.
const BUSINESS = {
  name: "Your Kitchen Name",
  city: "Ikeja",
  headline: "Home-style cooking, fresh every morning in Ikeja",
  about: "We started cooking for neighbours who kept coming back. We still cook the same way, just more of it.",
  currency: "₦",
  phoneDisplay: "CHANGE_ME_PHONE",
  whatsappNumber: "CHANGE_ME_WA_NUMBER", // digits only, include country code e.g. 2348012345678
  address: "CHANGE_ME_VERIFIED_ADDRESS",
  mapQuery: "CHANGE_ME_VERIFIED_ADDRESS",
  instagramUrl: "CHANGE_ME_INSTAGRAM_URL",
  hours: [
    ["Monday–Friday", "8:00 AM – 8:00 PM"],
    ["Saturday", "9:00 AM – 6:00 PM"],
    ["Sunday", "Closed"]
  ],
  menu: [
    { name: "Grilled chicken, rice and salad", price: 4500, description: "Juicy grilled chicken with rice and fresh salad.", image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=75" },
    { name: "Smoky beef burger with fries", price: 3800, description: "A smoky beef burger served with golden fries.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=75" },
    { name: "Peppered beef skewers", price: 3000, description: "Three tender beef skewers with pepper sauce.", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=700&q=75" },
    { name: "Pasta in tomato and basil", price: 3200, description: "Pasta tossed in a fresh tomato and basil sauce.", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=75" },
    { name: "Beans and fried plantain", price: 2200, description: "Comforting beans served with sweet fried plantain.", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=75" },
    { name: "Chocolate cake", price: 1800, description: "A rich slice of soft chocolate cake.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=75" }
  ],
  // Add only genuine customer reviews. Leave empty to hide the reviews section.
  reviews: []
};

function formatPrice(amount) {
  return `${BUSINESS.currency}${amount.toLocaleString("en-NG")}`;
}
