// ============================================
// My Kitchen Page Script
// Manages meal plans, shopping lists, favorite recipes,
// custom recipe submissions, and saved items using local storage.
// ============================================

// ==== These functions for reading and writing to Local Storage ======
function getMealPlan() {
    return JSON.parse(localStorage.getItem('mealPlan')) || [];
}

function saveMealPlan(plan) {
    localStorage.setItem('mealPlan', JSON.stringify(plan));
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function getSubmittedRecipes() {
    return JSON.parse(localStorage.getItem('submittedRecipes')) || [];
}

function saveSubmittedRecipes(recipes) {
    localStorage.setItem('submittedRecipes', JSON.stringify(recipes));
}

// ====== Make the current page link active in the menu =======
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

// ======= This section handle meal plan grid and removal functionality ======
function renderMealPlan() {
    const container = document.getElementById('meal-plan-grid');
    const emptyMsg = document.getElementById('empty-meal-plan');
    if (!container) return;

    const mealPlan = getMealPlan();

    if (mealPlan.length === 0) {
        container.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    container.innerHTML = mealPlan.map((r, index) => {
        const imgPriority = index < 2 ? 'fetchpriority="high"' : 'loading="lazy"';
        return `
            <div class="recipe-card">
                <img src="${r.img}" alt="${r.title}" ${imgPriority} width="400" height="300">
                <div class="info">
                    <div class="card-header">
                        <h3>${r.title}</h3>
                        <span class="time-badge">⏱️ ${r.time} mins</span>
                    </div>
                    <p class="recipe-region"><strong>Region:</strong> ${r.region}</p>
                    <div class="card-actions">
                        <button class="plan-btn added" data-id="${r.id}">
                            Remove from Meal Plan
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ====== This section compiles unique ingredients from active meal plans =======
function renderShoppingList() {
    const container = document.getElementById('shopping-list');
    const emptyMsg = document.getElementById('empty-shopping');
    if (!container) return;

    const mealPlan = getMealPlan();

    if (mealPlan.length === 0) {
        container.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    const allIngredients = new Set();
    mealPlan.forEach(recipe => {
        if (recipe.ingredients) {
            Object.values(recipe.ingredients).forEach(items => {
                items.forEach(item => allIngredients.add(item));
            });
        }
    });

    const sorted = Array.from(allIngredients).sort();

    container.innerHTML = `
        <p class="shopping-hint">Click any ingredient to add it to the form below ↓</p>
        <ul>
            ${sorted.map(item => `
                <li class="shopping-item" data-ingredient="${item}">
                    ${item}
                </li>
            `).join('')}
        </ul>
    `;
}

function addIngredientToTextarea(ingredient) {
    const textarea = document.getElementById('recipe-ingredients');
    if (!textarea) return;

    let current = textarea.value.trim();
    const existing = current
        .split(',')
        .map(i => i.trim().toLowerCase())
        .filter(i => i !== '');

    if (existing.includes(ingredient.toLowerCase())) {
        textarea.style.borderColor = '#e67e22';
        setTimeout(() => textarea.style.borderColor = '#ddd', 800);
        return;
    }

    if (current === '') {
        textarea.value = ingredient;
    } else {
        textarea.value = current + ', ' + ingredient;
    }

    textarea.focus();
    textarea.style.borderColor = '#27ae60';
    setTimeout(() => textarea.style.borderColor = '#ddd', 2000);
}

// ===== This section handles bookmarked favorite recipes =======
function renderFavorites() {
    const container = document.getElementById('favorites-grid');
    const emptyMsg = document.getElementById('empty-favorites');
    if (!container) return;

    const favorites = getFavorites();

    if (favorites.length === 0) {
        container.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    container.innerHTML = favorites.map((r, index) => {
        const imgPriority = index < 2 ? 'fetchpriority="high"' : 'loading="lazy"';
        return `
            <div class="recipe-card">
                <img src="${r.img}" alt="${r.title}" ${imgPriority} width="400" height="300">
                <div class="info">
                    <div class="card-header">
                        <h3>${r.title}</h3>
                        <span class="time-badge">⏱️ ${r.time} mins</span>
                    </div>
                    <p class="recipe-region"><strong>Region:</strong> ${r.region}</p>
                    <div class="card-actions">
                        <button class="favorite-btn saved" data-id="${r.id}">
                            ♥ Remove Favorite
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==== Renders user created recipes with instructions, ingredients and deletion control =====
function renderSubmittedRecipes() {
    const container = document.getElementById('submitted-grid');
    const emptyMsg = document.getElementById('empty-submitted');
    if (!container) return;

    const submitted = getSubmittedRecipes();

    if (submitted.length === 0) {
        container.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    container.innerHTML = submitted.map((r, index) => {
        const imgPriority = index < 2 ? 'fetchpriority="high"' : 'loading="lazy"';
        return `
            <div class="recipe-card">
                <img src="${r.img}" alt="${r.title}" ${imgPriority} width="400" height="300">
                <div class="info">
                    <div class="card-header">
                        <h3>${r.title}</h3>
                        <span class="time-badge">⏱️ ${r.time} mins</span>
                    </div>
                    <p class="recipe-region"><strong>Region:</strong> ${r.region}</p>

                    <div class="ingredients-container">
                        <h4 class="ingredients-title">Ingredients</h4>
                        <ul class="ingredients-list">
                            ${Object.entries(r.ingredients).map(([category, items]) => `
                                <li>
                                    <span class="category-name">${category}:</span>
                                    <span class="category-items">${items.join(', ')}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    ${r.instructions && r.instructions.length > 0 ? `
                        <div class="instructions-container">
                            <h4 class="instructions-title">Instructions</h4>
                            <ol class="instructions-list">
                                ${r.instructions.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        </div>
                    ` : ''}

                    <div class="card-actions">
                        <button class="delete-item-button" data-id="${r.id}">
                            Delete Recipe
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ====== This section is One main click listener for all kitchen actions ========
function setupDelegatedEventListeners() {
    const mealGrid = document.getElementById('meal-plan-grid');
    if (mealGrid) {
        mealGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('plan-btn')) {
                const id = Number(e.target.dataset.id);
                const updated = getMealPlan().filter(item => item.id !== id);
                saveMealPlan(updated);
                renderMealPlan();
                renderShoppingList();
            }
        });
    }

    const shoppingList = document.getElementById('shopping-list');
    if (shoppingList) {
        shoppingList.addEventListener('click', (e) => {
            const item = e.target.closest('.shopping-item');
            if (item) {
                addIngredientToTextarea(item.dataset.ingredient);
            }
        });
    }

    const favoritesGrid = document.getElementById('favorites-grid');
    if (favoritesGrid) {
        favoritesGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('favorite-btn')) {
                const id = Number(e.target.dataset.id);
                const updated = getFavorites().filter(item => item.id !== id);
                localStorage.setItem('favorites', JSON.stringify(updated));
                renderFavorites();
            }
        });
    }

    const submittedGrid = document.getElementById('submitted-grid');
    if (submittedGrid) {
        submittedGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-item-button')) {
                const id = Number(e.target.dataset.id);
                if (confirm('Are you sure you want to delete this recipe?')) {
                    const updated = getSubmittedRecipes().filter(item => item.id !== id);
                    saveSubmittedRecipes(updated);
                    renderSubmittedRecipes();
                }
            }
        });
    }
}

// ======== This processes new recipe creation and storage ========
function handleSubmitRecipe(e) {
    e.preventDefault();

    const title = document.getElementById('recipe-title').value.trim();
    const region = document.getElementById('recipe-region').value;
    const time = document.getElementById('recipe-time').value;
    const ingredientsText = document.getElementById('recipe-ingredients').value.trim();
    const instructionsText = document.getElementById('recipe-instructions').value.trim();

    if (!title || !time || !ingredientsText) {
        alert('Please fill in the required fields.');
        return;
    }

    const newRecipe = {
        id: Date.now(),
        title,
        region,
        time,
        ingredients: {
            "Main Ingredients": ingredientsText.split(',').map(i => i.trim())
        },
        instructions: instructionsText ? instructionsText.split('\n').filter(s => s.trim()) : [],
        img: "./images/mobile-recipe-hero.webp"
    };

    const submitted = getSubmittedRecipes();
    submitted.push(newRecipe);
    saveSubmittedRecipes(submitted);

    const mealPlan = getMealPlan();
    mealPlan.push(newRecipe);
    saveMealPlan(mealPlan);

    e.target.reset();
    const successMsg = document.getElementById('form-success');
    if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 4000);
    }

    renderMealPlan();
    renderShoppingList();
    renderSubmittedRecipes();
}

// ==== This section is for initialization and event listener =====
document.addEventListener('DOMContentLoaded', () => {
    setupDelegatedEventListeners();
    renderMealPlan();
    renderShoppingList();
    renderFavorites();
    renderSubmittedRecipes();
    setupActiveNavigation();

    const form = document.getElementById('submit-recipe-form');
    if (form) form.addEventListener('submit', handleSubmitRecipe);
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