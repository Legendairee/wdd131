//   Nigerian Recipes Application
//   Manage a collection of traditional Nigerian recipes with filtering,
//   meal planning, favorites, and local storage.
//   Supports responsive display and limit cards on mobile and dynamic rendering.
//   Recipe data lives in the shared scripts/data.js file.

let showAllRecipes = false;
let currentFiltered = [...allRecipes];

// ======== This is local storage helper ==========
function getMealPlan() {
    return JSON.parse(localStorage.getItem('mealPlan')) || [];
}

function saveMealPlan(plan) {
    localStorage.setItem('mealPlan', JSON.stringify(plan));
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs));
}

// ========  Delays function execution until events stop ==========
function debounce(func, wait = 200) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ======== This is going to render full recipe cards ==========
function renderRecipes(recipes) {
    const container = document.getElementById('recipes-grid');
    const noResults = document.getElementById('no-results');

    if (!container) return;

    if (recipes.length === 0) {
        container.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        applyShowAllState(recipes);
        return;
    }

    if (noResults) noResults.style.display = 'none';

    const mealPlan = getMealPlan();
    const favorites = getFavorites();

    container.innerHTML = recipes.map((r, index) => {
        const isInPlan = mealPlan.some(item => item.id === r.id);
        const isSaved = favorites.some(item => item.id === r.id);
        const imageAttr = index < 2 ? 'fetchpriority="high"' : 'loading="lazy"';

        let ingredientsHTML = '';
        if (r.ingredients) {
            ingredientsHTML = `
                <div class="ingredients-container hidden" id="ingredients-${r.id}">
                    <h3 class="ingredients-title">Complete Ingredients</h3>
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

        let instructionsHTML = '';
        if (r.instructions) {
            instructionsHTML = `
                <div class="instructions-container">
                    <h3 class="instructions-title">Preparation Steps</h3>
                    <ol class="instructions-list">
                        ${r.instructions.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            `;
        }

        return `
            <div class="recipe-card">
                <img src="${r.img}" alt="${r.title}" ${imageAttr} width="400" height="300">
                <div class="info">
                    <div class="card-header">
                        <h2>${r.title}</h2>
                        <span class="time-badge">⏱️ ${r.time} mins</span>
                    </div>
                    <p class="recipe-region"><strong>Region:</strong> ${r.region}</p>
                    
                    <button type="button" class="toggle-ingredients-btn" data-id="${r.id}">
                        Show Ingredients
                    </button>

                    ${ingredientsHTML}
                    ${instructionsHTML}

                    <div class="card-actions">
                        <button class="plan-btn ${isInPlan ? 'added' : ''}" data-id="${r.id}">
                            ${isInPlan ? '✓ Added to Meal Plan' : '+ Plan My Meal'}
                        </button>
                        <button class="favorite-btn ${isSaved ? 'saved' : ''}" data-id="${r.id}">
                            ${isSaved ? '♥ Saved' : '♡ Save'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    applyShowAllState(recipes);
}

// ====== Keeps the "show all" CSS class and the toggle button in sync ======
// Cards beyond the 4th are hidden by CSS on small screens; the class reveals them.
function applyShowAllState(recipes = currentFiltered) {
    const container = document.getElementById('recipes-grid');
    if (container) container.classList.toggle('show-all', showAllRecipes);

    const toggleBtn = document.getElementById('toggle-recipes-btn');
    if (!toggleBtn) return;

    const isDesktop = window.innerWidth >= 768;
    if (isDesktop || recipes.length <= 4) {
        toggleBtn.style.display = 'none';
    } else {
        toggleBtn.style.display = 'block';
        toggleBtn.textContent = showAllRecipes ? "Show Less ↑" : "View All Recipes ↓";
    }
}

// ======== Event delegation handling for card action ==========
function setupCardDelegation() {
    const container = document.getElementById('recipes-grid');
    if (!container || container.dataset.delegated) return;

    container.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('plan-btn')) {
            toggleMealPlan(Number(target.dataset.id));
        } else if (target.classList.contains('favorite-btn')) {
            toggleFavorite(Number(target.dataset.id));
        } else if (target.classList.contains('toggle-ingredients-btn')) {
            const recipeId = target.dataset.id;
            const targetContainer = document.getElementById(`ingredients-${recipeId}`);
            if (targetContainer) {
                targetContainer.classList.toggle('hidden');
                target.textContent = targetContainer.classList.contains('hidden')
                    ? 'Show Ingredients'
                    : 'Hide Ingredients';
            }
        }
    });

    container.dataset.delegated = "true";
}

// ======== This is the toggle function (mobile) ==========
// Only flips a CSS class; the DOM is not rebuilt.
function toggleRecipes() {
    showAllRecipes = !showAllRecipes;
    applyShowAllState();
}

//====== Make the current page link active in the menu =======
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

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ======= This is plan my meal section =========
function toggleMealPlan(id) {
    let mealPlan = getMealPlan();
    const recipe = allRecipes.find(r => r.id === id);

    if (!recipe) return;

    const exists = mealPlan.some(item => item.id === id);

    if (exists) {
        mealPlan = mealPlan.filter(item => item.id !== id);
    } else {
        mealPlan.push(recipe);
    }

    saveMealPlan(mealPlan);
    renderRecipes(currentFiltered);
}

// ====== This is favorite section (store full recipe) ========
function toggleFavorite(id) {
    let favorites = getFavorites();
    const recipe = allRecipes.find(r => r.id === id);

    if (!recipe) return;

    const exists = favorites.some(item => item.id === id);

    if (exists) {
        favorites = favorites.filter(item => item.id !== id);
    } else {
        favorites.push(recipe);
    }

    saveFavorites(favorites);
    renderRecipes(currentFiltered);
}

// ======== This is the filter function =========
function filterRecipes(e) {
    if (e) e.preventDefault();

    const searchInput = document.getElementById('search');
    const regionSelect = document.getElementById('region');
    const timeSelect = document.getElementById('time');

    const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const region = regionSelect ? regionSelect.value : 'all';
    const maxTime = timeSelect ? timeSelect.value : 'all';

    currentFiltered = allRecipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(search);
        const matchesRegion = region === 'all' || recipe.region === region;
        const matchesTime = maxTime === 'all' || Number(recipe.time) <= Number(maxTime);

        return matchesSearch && matchesRegion && matchesTime;
    });

    showAllRecipes = false;
    renderRecipes(currentFiltered);
}

// ========= This will Render initial recipes and bind filter, toggle and listener =========
document.addEventListener('DOMContentLoaded', () => {
    setupCardDelegation();
    renderRecipes(allRecipes);
    setupActiveNavigation();

    const form = document.getElementById('filter-form');
    if (form) form.addEventListener('submit', filterRecipes);

    const searchInput = document.getElementById('search');
    if (searchInput) searchInput.addEventListener('input', debounce(filterRecipes, 150));

    const toggleBtn = document.getElementById('toggle-recipes-btn');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleRecipes);

    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth >= 768) {
            showAllRecipes = false;
        }
        applyShowAllState();
    }, 200));
});

// ===== This is mobile navigation menu ======
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

if (hamButton && navigation) {
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
        hamButton.textContent = hamButton.classList.contains('open') ? '✕' : '☰';
    });
}

// ===== footer current year and last modified date =====
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastModified");

if (currentYear) currentYear.textContent = new Date().getFullYear();
if (lastModified) lastModified.textContent = `Last Modified: ${document.lastModified}`;
