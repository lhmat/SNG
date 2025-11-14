const instruments = [
  {
    code: "420179",
    name: "Hot Shears™ (Monopolar Curved Scissors)",
    diameter: "8 мм",
    category: "Monopolar Cautery",
    uses: "10 uses",
    image: "images/instruments/420179.jpg"
  },
  {
    code: "420293",
    name: "Fenestrated Bipolar Forceps",
    diameter: "8 мм",
    category: "Bipolar Forceps",
    uses: "10 uses",
    image: "images/instruments/420293.jpg"
  },
  {
    code: "400179",
    name: "Mega Needle Driver",
    diameter: "8 мм",
    category: "Needle Driver",
    uses: "10 uses",
    image: "images/instruments/400179.jpg"
  },
  {
    code: "400321",
    name: "Large SutureCut™ Needle Driver",
    diameter: "8 мм",
    category: "Needle Driver",
    uses: "10 uses",
    image: "images/instruments/400321.jpg"
  },
  {
    code: "420006",
    name: "ProGrasp™ Forceps",
    diameter: "8 мм",
    category: "Grasper",
    uses: "10 uses",
    image: "images/instruments/420006.jpg"
  }
];

const catalogGrid = document.getElementById("catalogGrid");
const catalogSearch = document.getElementById("catalogSearch");
const catalogCategory = document.getElementById("catalogCategory");
const navToggle = document.querySelector(".nav-toggle");
const navList = document.getElementById("navList");
const requestInput = document.getElementById("instrumentRequest");
const detailsField = document.getElementById("details");
const yearEl = document.getElementById("year");

function populateCategories() {
  const categories = Array.from(new Set(instruments.map((item) => item.category))).sort();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    catalogCategory.appendChild(option);
  });
}

function createCard(instrument) {
  const article = document.createElement("article");
  article.innerHTML = `
    <img src="${instrument.image}" alt="${instrument.name}">
    <h3>${instrument.name}</h3>
    <div class="card-meta">
      <span><strong>Артикул:</strong> ${instrument.code}</span>
      <span><strong>Диаметр:</strong> ${instrument.diameter}</span>
      <span><strong>Категория:</strong> ${instrument.category}</span>
      <span><strong>Ресурс:</strong> ${instrument.uses}</span>
    </div>
    <button class="btn primary full" data-code="${instrument.code}" data-name="${instrument.name}">Заказать</button>
  `;
  return article;
}

function renderCatalog(list) {
  catalogGrid.innerHTML = "";
  if (!list.length) {
    catalogGrid.innerHTML = "<p>По вашему запросу ничего не найдено. Попробуйте изменить фильтры.</p>";
    return;
  }
  const fragment = document.createDocumentFragment();
  list.forEach((instrument) => fragment.appendChild(createCard(instrument)));
  catalogGrid.appendChild(fragment);
}

function filterCatalog() {
  const query = catalogSearch.value.trim().toLowerCase();
  const category = catalogCategory.value;

  const filtered = instruments.filter((instrument) => {
    const matchesQuery = [instrument.name, instrument.code]
      .some((value) => value.toLowerCase().includes(query));
    const matchesCategory = category === "all" || instrument.category === category;
    return matchesQuery && matchesCategory;
  });

  renderCatalog(filtered);
}

function handleCatalogClick(event) {
  const button = event.target.closest("button[data-code]");
  if (!button) return;
  const code = button.dataset.code;
  const name = button.dataset.name;
  const message = `Запрос на поставку: ${name} (арт. ${code})`;
  requestInput.value = message;
  if (detailsField && !detailsField.value.includes(code)) {
    detailsField.value = `${message}\n${detailsField.value}`.trim();
  }
  document.getElementById("request").scrollIntoView({ behavior: "smooth" });
}

function initNavToggle() {
  if (!navToggle) return;
  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initForm() {
  const form = document.querySelector(".request-form form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // TODO: Замените console.log на отправку формы в ваш backend или почтовый сервис
    console.log("Form payload", Object.fromEntries(new FormData(form)));
    form.reset();
    requestInput.value = "";
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
  });
}

function initYear() {
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function init() {
  populateCategories();
  renderCatalog(instruments);
  catalogSearch?.addEventListener("input", filterCatalog);
  catalogCategory?.addEventListener("change", filterCatalog);
  catalogGrid?.addEventListener("click", handleCatalogClick);
  initNavToggle();
  initForm();
  initYear();
}

document.addEventListener("DOMContentLoaded", init);
