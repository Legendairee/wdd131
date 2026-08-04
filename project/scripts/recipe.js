const allRecipes = [
    {
        id: 1,
        title: "Jollof Rice",
        time: 60,
        region: "Every Region",
        img: "./images/jollof-rice.webp",
        ingredients: {
            "Base": ["Tomatoes", "Red bell peppers (tatashe)", "Scotch bonnets (rodo)", "Onions"],
            "Aromatics": ["Garlic", "Ginger", "Curry powder", "Dried thyme", "Bay leaves"],
            "Liquid & Fat": ["Cooking oil", "Tomato paste", "Rich meat stock (beef, goat, or chicken)"],
            "Grain": ["Long-grain parboiled rice or basmati rice"]
        }
    },
    {
        id: 2,
        title: "Egusi Soup",
        time: 45,
        region: "Every Region",
        img: "./images/egusi-soup.webp",
        ingredients: {
            "Base": ["Ground egusi (melon seeds)", "Palm oil", "Spinach or bitter leaf", "Onions"],
            "Aromatics": ["Ground crayfish", "Locust beans (iru)", "Bouillon cubes"],
            "Protein & Stock": ["Beef", "Stockfish", "Dry fish", "Meat stock"]
        }
    },
    {
        id: 3,
        title: "Ewedu Soup",
        time: 25,
        region: "Yoruba",
        img: "./images/ewedu-soup.webp",
        ingredients: {
            "Base": ["Fresh ewedu leaves (jute leaves)", "Water"],
            "Aromatics & Seasoning": ["Locust beans (iru)", "Ground crayfish", "Bouillon cube", "Salt"],
            "Thickener & Texture": ["Edible potash (kanwa) or baking soda (optional)"]
        }
    },
    {
        id: 4,
        title: "Ofe Oha Soup",
        time: 60,
        region: "Igbo",
        img: "./images/ofe-oha.webp",
        ingredients: {
            "Base Leaves": ["Fresh Oha leaves", "Uziza leaves (optional)"],
            "Thickener": ["Cocoyam paste (taro)", "Achi", "Ofo", "Ede"],
            "Protein & Stock": ["Assorted meats (beef, goat)", "Shaki (tripe)", "Stockfish", "Dry fish"],
            "Aromatics & Seasoning": ["Red palm oil", "Ground crayfish", "Ogiri Igbo", "Yellow pepper", "Bouillon cubes", "Salt"]
        }
    },
    {
        id: 5,
        title: "Miyan Kuka",
        time: 35,
        region: "Hausa",
        img: "./images/miyan-kuka.webp",
        ingredients: {
            "Base Leaf": ["Powdered baobab leaves (kuka)"],
            "Protein & Stock": ["Beef, goat meat, or dried fish", "Cow tripe (shaki)", "Rich meat stock"],
            "Aromatics & Seasoning": ["Dawadawa", "Ground crayfish", "Scotch bonnet peppers", "Onions", "Bouillon cubes", "Salt"],
            "Fat": ["Red palm oil or peanut oil"]
        }
    },
    {
        id: 6,
        title: "Afang Soup",
        time: 70,
        region: "Calabar",
        img: "./images/afang-soup.webp",
        ingredients: {
            "Base Leaves": ["Fresh Afang leaves (Ukazi)", "Waterleaf"],
            "Protein & Stock": ["Assorted meats", "Shaki", "Stockfish head", "Dry fish", "Periwinkles"],
            "Fat & Aromatics": ["Red palm oil", "Ground crayfish", "Scotch bonnet peppers", "Bouillon cubes", "Salt"]
        }
    },
    {
        id: 7,
        title: "Banga Soup",
        time: 80,
        region: "Urhobo / Isoko",
        img: "./images/banga-soup.webp",
        ingredients: {
            "Base Extract": ["Palm fruit extract (Banga paste)", "Beletete leaves"],
            "Banga Spices": ["Banga spice blend (Taiko)", "Oburunbebe stick", "Orima"],
            "Protein & Stock": ["Fresh catfish", "Dried fish", "Stockfish", "Assorted meats", "Periwinkles"],
            "Aromatics & Seasoning": ["Ground crayfish", "Scotch bonnet peppers", "Onions", "Bouillon cubes", "Salt"]
        }
    },
    {
        id: 8,
        title: "Black Soup",
        time: 45,
        region: "Esan, Bini",
        img: "./images/black-soup.webp",
        ingredients: {
            "Base Leaves": ["Palm fruit extract", "Fresh scent leaves", "Uziza leaves", "Washed bitter leaf"],
            "Protein & Stock": ["Assorted meats", "Dry fish", "Stockfish", "Rich meat stock"],
            "Aromatics & Seasoning": ["Red palm oil", "Ground crayfish", "Scotch bonnet peppers", "Onions", "Bouillon cubes", "Salt"]
        }
    }
];

// ==============  Recipe Page  ==================

let showAllRecipes = false; // State flag for toggling view on mobile

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

function saveFavorites(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs));
}

// ========== RENDER FULL RECIPE CARDS ==========
function renderRecipes(recipes) {
    const container = document.getElementById('recipes-grid');
    const noResults = document.getElementById('no-results');
    const toggleBtn = document.getElementById('toggle-recipes-btn');
    const mealPlan = getMealPlan();
    const favorites = getFavorites();

    if (recipes.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        if (toggleBtn) toggleBtn.style.display = 'none';
        return;
    }

    noResults.style.display = 'none';

    // Determine if on mobile screen and slice recipes accordingly
    const isDesktop = window.innerWidth >= 768;
    const displayRecipes = (isDesktop || showAllRecipes) ? recipes : recipes.slice(0, 4);

    // Show/hide toggle button on mobile only if there are more than 4 recipes
    if (toggleBtn) {
        if (!isDesktop && recipes.length > 4) {
            toggleBtn.style.display = 'block';
            toggleBtn.textContent = showAllRecipes ? "Show Less ↑" : "View All Recipes →";
        } else {
            toggleBtn.style.display = 'none';
        }
    }

    container.innerHTML = displayRecipes.map(r => {
        const isInPlan = mealPlan.some(item => item.id === r.id);
        const isSaved = favorites.includes(r.id);

        let ingredientsHTML = '';
        if (r.ingredients) {
            ingredientsHTML = `
                <div class="ingredients-container">
                    <h4 class="ingredients-title">Complete Ingredients</h4>
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
                <img src="${r.img}" alt="${r.title}" loading="lazy">
                <div class="info">
                    <div class="card-header">
                        <h3>${r.title}</h3>
                        <span class="time-badge">⏱️ ${r.time} mins</span>
                    </div>
                    <p><strong>Region:</strong> ${r.region}</p>
                    
                    ${ingredientsHTML}

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

    // Attach card event listeners
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.dataset.id);
            toggleMealPlan(id);
        });
    });

    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.dataset.id);
            toggleFavorite(id);
        });
    });
}

// ========== TOGGLE FUNCTION (Mobile) ==========
function toggleRecipes() {
    showAllRecipes = !showAllRecipes;
    renderRecipes(currentFiltered);
}

// ========== PLAN MY MEAL ==========
function toggleMealPlan(id) {
    let mealPlan = getMealPlan();
    const recipe = allRecipes.find(r => r.id === id);

    if (!recipe) return;

    const exists = mealPlan.some(item => item.id === id);

    if (exists) {
        mealPlan = mealPlan.filter(item => item.id !== id);
    } else {
        mealPlan.push({
            id: recipe.id,
            title: recipe.title,
            time: recipe.time,
            region: recipe.region,
            img: recipe.img,
            ingredients: recipe.ingredients
        });
    }

    saveMealPlan(mealPlan);
    renderRecipes(currentFiltered);
}

// ========== FAVORITES ==========
function toggleFavorite(id) {
    let favorites = getFavorites();
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    saveFavorites(favorites);
    renderRecipes(currentFiltered);
}

// ========== FILTER ==========
let currentFiltered = [...allRecipes];

function filterRecipes(e) {
    if (e) e.preventDefault();

    const search = document.getElementById('search').value.toLowerCase().trim();
    const region = document.getElementById('region').value;
    const maxTime = document.getElementById('time').value;

    currentFiltered = allRecipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(search);
        const matchesRegion = region === 'all' || recipe.region === region;
        const matchesTime = maxTime === 'all' || recipe.time <= Number(maxTime);

        return matchesSearch && matchesRegion && matchesTime;
    });

    // Reset toggle when filter changes
    showAllRecipes = false;
    renderRecipes(currentFiltered);
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    renderRecipes(allRecipes);

    const form = document.getElementById('filter-form');
    if (form) form.addEventListener('submit', filterRecipes);

    const searchInput = document.getElementById('search');
    if (searchInput) searchInput.addEventListener('input', filterRecipes);

    // View All button event listener
    const toggleBtn = document.getElementById('toggle-recipes-btn');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleRecipes);

    // Screen resize event listener
    window.addEventListener('resize', () => {
        const isDesktop = window.innerWidth >= 768;
        if (isDesktop) {
            showAllRecipes = false; // Reset state when switching back to desktop
        }
        renderRecipes(currentFiltered);
    });
});

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

if (hamButton && navigation) {
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');

        if (hamButton.classList.contains('open')) {
            hamButton.textContent = '✕';
        } else {
            hamButton.textContent = '☰';
        }
    });
}

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

if (currentYear) currentYear.textContent = today.getFullYear();
if (lastModified) lastModified.innerHTML = `Last Modified: ${document.lastModified}`;

