// ============================================
// This file control the homepage of the Nigerian Recipes website.
// It show recipe cards and region cards and handles the mobile menu,
// makes the active navigation link work, and updates the footer dates.
// Recipe data lives in the shared scripts/data.js file.
// ============================================


// ===== This is the data for popular meals by region ==========
const allRegions = [
    {
        name: "Yoruba",
        meals: ["Ewedu Soup & Amala", "Gbegiri Soup", "Ofada Rice & Ayamase"]
    },
    {
        name: "Igbo",
        meals: ["Ofe Oha", "Ofe Nsala (White Soup)", "Ofe Akwu"]
    },
    {
        name: "Hausa",
        meals: ["Miyan Kuka", "Tuwo Shinkafa", "Dambu Nama"]
    },
    {
        name: "Calabar",
        meals: ["Edikang Ikong", "Afang Soup", "Ekpang Nkukwo"]
    },
    {
        name: "Urhobo & Isoko",
        meals: ["Banga Soup & Starch", "Owo Soup", "Ukodo"]
    },
    {
        name: "Tiv",
        meals: ["Ruam Kumen (Pounded Yam)", "Pocho Soup", "Ashwe Leaf Soup"]
    },
    {
        name: "Esan Benin",
        meals: ["Edo Black Soup (Obe Efinrin)", "Benin Owo Soup", "Omisagba (Groundnut Soup)"]
    },
    {
        name: "Ijaw",
        meals: ["Kekefiyai (Plantain Porridge)", "Fresh Fish Pepper Soup", "Native Jollof Rice"]
    }
];

let showAllRecipes = false;
let showAllRegions = false;

// ======== This section will show the recipe cards on the page ======
// Every card is rendered once; CSS hides the extras on small screens
// and the "show-all" class reveals them (see home.css).
function renderFeatured() {
    const container = document.getElementById('featured-grid');
    if (!container) return;

    container.innerHTML = allRecipes.map((r, index) => {
        const imagePriority = index < 2 ? 'fetchpriority="high"' : 'loading="lazy"';

        let ingredientsHTML = '';
        if (r.ingredients) {
            ingredientsHTML = `
                <div class="ingredients-container">
                    <h4 class="ingredients-title">Core Ingredients</h4>
                    <ul class="ingredients-list">
                        ${Object.entries(r.ingredients).map(([category, items]) => `
                            <li>
                                <span class="category-name">${category}:</span> 
                                <span class="category-items">${items.join(', ')}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        return `
            <div class="recipe-card">
                <img src="${r.img}" alt="${r.title}" ${imagePriority} width="400" height="300">
                <div class="info">
                    <div class="card-header">
                        <h3>${r.title}</h3>
                        <span class="time-badge">⏱️ ${r.time} mins</span>
                    </div>
                    ${ingredientsHTML}
                </div>
            </div>
        `;
    }).join('');
}

// ====== This section will show the region cards on the page ========
function renderRegions() {
    const container = document.getElementById('regions-grid');
    if (!container) return;

    container.innerHTML = allRegions.map(region => `
        <div class="region-card">
            <h3 class="region-title">${region.name}</h3>
            <div class="region-meals-container">
                <span class="meals-label">Popular Dishes:</span>
                <ul class="region-meals-list">
                    ${region.meals.map(meal => `<li>${meal}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// ======= This will go to the main recipes page =======
function goToRecipes() {
    window.location.href = "recipes.html";
}

// ====== This section will show 4 recipes or show all on mobile view =====
// Toggling only flips a CSS class, so the DOM is not rebuilt.
function toggleRecipes() {
    const container = document.getElementById('featured-grid');
    if (!container) return;

    showAllRecipes = container.classList.toggle('show-all');

    const btn = document.querySelector('.featured .view-all-button');
    if (btn) btn.textContent = showAllRecipes ? "Show Less ↑" : "View All Recipes ↓";
}

// ======= This section will show 4 region or show all on mobile view ======
function toggleRegions() {
    const container = document.getElementById('regions-grid');
    if (!container) return;

    showAllRegions = container.classList.toggle('show-all');

    const btn = document.querySelector('.regions .view-all-button');
    if (btn) btn.textContent = showAllRegions ? "Show Less ↑" : "View All Region ↓";
}

// ======= Make the current page link active in the menu =====
function setupActiveNavigation() {
    const navLinks = document.querySelectorAll('.navigation a');
    if (!navLinks.length) return;

    let activeFound = false;
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && window.location.pathname.endsWith(linkPath) && linkPath !== "#") {
            link.classList.add('active');
            activeFound = true;
        } else {
            link.classList.remove('active');
        }
    });

    if (!activeFound && navLinks[0]) {
        navLinks[0].classList.add('active');
    }
}

// ======== Open and close the mobile menu =======
function setupMobileMenu() {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    if (hamButton && navigation) {
        hamButton.addEventListener('click', () => {
            navigation.classList.toggle('open');
            hamButton.classList.toggle('open');
            hamButton.textContent = hamButton.classList.contains('open') ? '✕' : '☰';
        });
    }
}

// ========= This section put the current year and last modified date in the footer ====
function updateFooterDates() {
    const currentYear = document.querySelector("#current-year");
    const lastModified = document.querySelector("#lastModified");
    const today = new Date();

    if (currentYear) currentYear.textContent = today.getFullYear();
    if (lastModified) lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

// ======== This section will start everything when the page finish loading ========
document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
    renderRegions();
    setupMobileMenu();
    setupActiveNavigation();
    updateFooterDates();

    const recipeBtn = document.querySelector('.featured .view-all-button');
    const regionBtn = document.querySelector('.regions .view-all-button');

    if (recipeBtn) recipeBtn.addEventListener('click', toggleRecipes);
    if (regionBtn) regionBtn.addEventListener('click', toggleRegions);
});
