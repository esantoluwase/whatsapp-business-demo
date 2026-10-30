import properties from "./data.js";

// Demo agency email. Replace this with the real agency enquiry address.
const AGENCY_EMAIL = "hello@havenandco.example";

const grid = document.querySelector("#propertyGrid");
const locationSearch = document.querySelector("#locationSearch");
const typeFilter = document.querySelector("#typeFilter");
const bedFilter = document.querySelector("#bedFilter");
const priceFilter = document.querySelector("#priceFilter");
const sortFilter = document.querySelector("#sortFilter");
const resultsCount = document.querySelector("#resultsCount");
const noResults = document.querySelector("#noResults");
const modal = document.querySelector("#propertyModal");
let activeProperty = null;

const aud = new Intl.NumberFormat("en-AU", {
  style: "currency", currency: "AUD", maximumFractionDigits: 0
});

function propertyCard(property) {
  return `
    <article class="property-card">
      <button class="property-image-button" data-details="${property.id}" aria-label="View ${property.title}">
        <img class="property-image" src="${property.image}" alt="${property.title}" loading="lazy">
        <span class="property-tag">${property.featured ? "FEATURED" : property.type.toUpperCase()}</span>
        <span class="image-arrow">↗</span>
      </button>
      <div class="property-info">
        <p class="property-location">${property.suburb}, ${property.state}</p>
        <h3><button class="title-button" data-details="${property.id}">${property.title}</button></h3>
        <p class="property-price">${aud.format(property.price)}</p>
        <div class="property-bottom">
          <div class="property-stats"><span>${property.beds} bed</span><i></i><span>${property.baths} bath</span><i></i><span>${property.parking} car</span></div>
          <button class="enquire-link" data-details="${property.id}">View property ↗</button>
        </div>
      </div>
    </article>`;
}

function getFilteredProperties() {
  const location = locationSearch.value.trim().toLowerCase();
  const type = typeFilter.value;
  const beds = Number(bedFilter.value || 0);
  const maxPrice = Number(priceFilter.value || Infinity);
  let filtered = properties.filter(p => {
    const searchable = `${p.suburb} ${p.state} ${p.postcode} ${p.title}`.toLowerCase();
    return (!location || searchable.includes(location)) && (!type || p.type === type) && p.beds >= beds && p.price <= maxPrice;
  });
  if (sortFilter.value === "low") filtered.sort((a,b) => a.price - b.price);
  if (sortFilter.value === "high") filtered.sort((a,b) => b.price - a.price);
  if (sortFilter.value === "featured") filtered.sort((a,b) => Number(b.featured) - Number(a.featured));
  return filtered;
}

function renderProperties() {
  const filtered = getFilteredProperties();
  grid.innerHTML = filtered.map(propertyCard).join("");
  resultsCount.textContent = `${filtered.length} ${filtered.length === 1 ? "property" : "properties"} to explore`;
  noResults.hidden = filtered.length !== 0;
}

function selectGalleryImage(src, alt) {
  const main = document.querySelector("#modalImage");
  main.src = src;
  main.alt = alt;
  document.querySelectorAll(".gallery-thumb").forEach(button => {
    button.classList.toggle("active", button.dataset.image === src);
  });
}

function openDetails(id) {
  const p = properties.find(item => item.id === id);
  if (!p) return;
  activeProperty = p;
  document.querySelector("#modalSuburb").textContent = `${p.suburb}, ${p.state} ${p.postcode}`;
  document.querySelector("#modalTitle").textContent = p.title;
  document.querySelector("#modalPrice").textContent = aud.format(p.price);
  document.querySelector("#modalStats").innerHTML = `<span>${p.beds} bedrooms</span><span>${p.baths} bathrooms</span><span>${p.parking} car space${p.parking === 1 ? "" : "s"}</span><span>${p.type}</span>`;
  document.querySelector("#modalDescription").textContent = p.description;
  document.querySelector("#modalFeatures").innerHTML = p.features.map(feature => `<li>${feature}</li>`).join("");
  const thumbnails = document.querySelector("#galleryThumbnails");
  thumbnails.innerHTML = p.gallery.map((src, index) => `
    <button class="gallery-thumb ${index === 0 ? "active" : ""}" type="button" data-image="${src}" aria-label="View property photo ${index + 1}">
      <img src="${src}" alt="${p.title} — photo ${index + 1}" loading="lazy">
    </button>`).join("");
  selectGalleryImage(p.gallery[0], p.title);
  document.querySelector("#enquiryMessage").value = `I'd like to know more about ${p.title} in ${p.suburb} and arrange an inspection.`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  document.querySelector("#modalClose").focus();
}

function closeDetails() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  activeProperty = null;
}

grid.addEventListener("click", e => {
  const trigger = e.target.closest("[data-details]");
  if (trigger) openDetails(trigger.dataset.details);
});

document.querySelector("#galleryThumbnails").addEventListener("click", e => {
  const button = e.target.closest("[data-image]");
  if (button && activeProperty) selectGalleryImage(button.dataset.image, activeProperty.title);
});

document.querySelector("#propertyEnquiryForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!activeProperty) return;
  const form = new FormData(e.currentTarget);
  const subject = `Property enquiry: ${activeProperty.title} — ${activeProperty.suburb}`;
  const body = [
    `Property: ${activeProperty.title}`,
    `Location: ${activeProperty.suburb}, ${activeProperty.state} ${activeProperty.postcode}`,
    `Price guide: ${aud.format(activeProperty.price)}`,
    "",
    `Name: ${form.get("name")}`,
    `Email: ${form.get("email")}`,
    `Phone: ${form.get("phone") || "Not provided"}`,
    "",
    `Message: ${form.get("message")}`
  ].join("\n");
  window.location.href = `mailto:${AGENCY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector("#searchButton").addEventListener("click", renderProperties);
[typeFilter, bedFilter, priceFilter, sortFilter].forEach(el => el.addEventListener("change", renderProperties));
locationSearch.addEventListener("keydown", e => { if (e.key === "Enter") renderProperties(); });
locationSearch.addEventListener("input", renderProperties);
document.querySelector("#modalClose").addEventListener("click", closeDetails);
modal.addEventListener("click", e => { if (e.target.hasAttribute("data-close")) closeDetails(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDetails(); });

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.querySelector("#year").textContent = new Date().getFullYear();
renderProperties();
