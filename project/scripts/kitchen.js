// ========== LOCAL STORAGE HELPERS ==========
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

// ========== RENDER MEAL PLAN ==========
function renderMealPlan() {
    const container = document.getElementById('meal-plan-grid');
    const emptyMsg = document.getElementById('empty-meal-plan');
    const mealPlan = getMealPlan();

    if (mealPlan.length === 0) {
        container.innerHTML = '';
        emptyMsg.style.display = 'block';
        return;
    }

    emptyMsg.style.display = 'none';

    container.innerHTML = mealPlan.map(r => `
        <div class="recipe-card">
            <img src="${r.img}" alt="${r.title}" loading="lazy">
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
    `).join('');

    // Remove from Meal Plan
    document.querySelectorAll('#meal-plan-grid .plan-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.dataset.id);
            const updated = getMealPlan().filter(item => item.id !== id);
            saveMealPlan(updated);
            renderMealPlan();
            renderShoppingList();
        });
    });
}

// ========== SHOPPING LIST ==========
function renderShoppingList() {
    const container = document.getElementById('shopping-list');
    const emptyMsg = document.getElementById('empty-shopping');
    const mealPlan = getMealPlan();

    if (mealPlan.length === 0) {
        container.innerHTML = '';
        emptyMsg.style.display = 'block';
        return;
    }

    emptyMsg.style.display = 'none';

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

    // Make ingredients clickable
    document.querySelectorAll('.shopping-item').forEach(item => {
        item.addEventListener('click', () => {
            addIngredientToTextarea(item.dataset.ingredient);
        });
    });
}

// ========== ADD INGREDIENT TO TEXTAREA ==========
function addIngredientToTextarea(ingredient) {
    const textarea = document.getElementById('recipe-ingredients');
    if (!textarea) return;

    let current = textarea.value.trim();
    const existing = current
        .split(',')
        .map(i => i.trim().toLowerCase())
        .filter(i => i !== '');

    // Prevent duplicates
    if (existing.includes(ingredient.toLowerCase())) {
        textarea.style.borderColor = '#e67e22';
        setTimeout(() => textarea.style.borderColor = '#ddd', 800);
        return;
    }

    // Add with comma
    if (current === '') {
        textarea.value = ingredient;
    } else {
        textarea.value = current + ', ' + ingredient;
    }

    // Visual feedback
    textarea.focus();
    textarea.style.borderColor = '#27ae60';
    setTimeout(() => textarea.style.borderColor = '#ddd', 1000);
}

// ========== FAVORITES ==========
function renderFavorites() {
    const container = document.getElementById('favorites-grid');
    const emptyMsg = document.getElementById('empty-favorites');
    const favorites = getFavorites();

    if (favorites.length === 0) {
        container.innerHTML = '';
        emptyMsg.style.display = 'block';
        return;
    }

    emptyMsg.style.display = 'none';

    container.innerHTML = favorites.map(r => `
        <div class="recipe-card">
            <img src="${r.img}" alt="${r.title}" loading="lazy">
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
    `).join('');

    // Remove Favorite
    document.querySelectorAll('#favorites-grid .favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.dataset.id);
            const updated = getFavorites().filter(item => item.id !== id);
            localStorage.setItem('favorites', JSON.stringify(updated));
            renderFavorites();
        });
    });
}

// ========== RENDER SUBMITTED RECIPES ==========
function renderSubmittedRecipes() {
    const container = document.getElementById('submitted-grid');
    const emptyMsg = document.getElementById('empty-submitted');
    const submitted = getSubmittedRecipes();

    if (submitted.length === 0) {
        container.innerHTML = '';
        emptyMsg.style.display = 'block';
        return;
    }

    emptyMsg.style.display = 'none';

    container.innerHTML = submitted.map(r => `
        <div class="recipe-card">
            <img src="${r.img}" alt="${r.title}" loading="lazy">
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
                    <button class="delete-btn" data-id="${r.id}">
                        Delete Recipe
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Delete functionality
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.dataset.id);
            if (confirm('Are you sure you want to delete this recipe?')) {
                const updated = getSubmittedRecipes().filter(item => item.id !== id);
                saveSubmittedRecipes(updated);
                renderSubmittedRecipes();
            }
        });
    });
}

// ========== SUBMIT NEW RECIPE ==========
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

    // Save submitted recipes
    const submitted = getSubmittedRecipes();
    submitted.push(newRecipe);
    saveSubmittedRecipes(submitted);

    // Also add to meal plan
    const mealPlan = getMealPlan();
    mealPlan.push(newRecipe);
    saveMealPlan(mealPlan);

    // Reset form & show success
    e.target.reset();
    document.getElementById('form-success').style.display = 'block';

    setTimeout(() => {
        document.getElementById('form-success').style.display = 'none';
    }, 4000);

    // Refresh all sections
    renderMealPlan();
    renderShoppingList();
    renderSubmittedRecipes();
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    renderMealPlan();
    renderShoppingList();
    renderFavorites();
    renderSubmittedRecipes();

    const form = document.getElementById('submit-recipe-form');
    if (form) form.addEventListener('submit', handleSubmitRecipe);

});

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

if (hamButton && navigation) {
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
        hamButton.textContent = hamButton.classList.contains('open') ? '✕' : '☰';
    });
}

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastModified");

if (currentYear) currentYear.textContent = new Date().getFullYear();
if (lastModified) lastModified.innerHTML = `Last Modified: ${document.lastModified}`;