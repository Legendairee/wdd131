const allRecipes = [
    {
        title: "Jollof Rice",
        time: "60",
        region: "Every Region",
        img: "./images/jollof-rice.webp",
        ingredients: {
            "Base": ["Tomatoes", "Red bell peppers (tatashe)", "Scotch bonnets (rodo)", "Onions"],
            "Aromatics": ["Garlic", "Ginger", "Curry powder", "Dried thyme", "Bay leaves"],
            "Liquid & Fat": ["Cooking oil", "Rich meat stock (beef, goat, or chicken)"]
        }
    },
    {
        title: "Egusi Soup",
        time: "45",
        region: "Every Region",
        img: "./images/egusi-soup.webp",
        ingredients: {
            "Base": ["Ground egusi (melon seeds)", "Palm oil", "Spinach or bitter leaf", "Onions"],
            "Aromatics": ["Ground crayfish", "Locust beans (iru)", "Bouillon cubes"]
        }
    },
    {
        title: "Ewedu Soup",
        time: "25",
        region: "Yoruba",
        img: "./images/ewedu-soup.webp",
        ingredients: {
            "Base": ["Fresh ewedu leaves (jute leaves)", "Water"],
            "Aromatics & Seasoning": ["Locust beans (iru)", "Ground crayfish", "Bouillon cube", "Salt"],
            "Thickener & Texture": ["Edible potash (kanwa)"]
        }
    },
    {
        title: "Ofe Oha Soup",
        time: "60",
        region: "Igbo",
        img: "./images/ofe-oha.webp",
        ingredients: {
            "Base Leaves": ["Fresh Oha leaves", "Uziza leaves (optional)"],
            "Thickener": ["Cocoyam paste (taro)", "Achi", "Ofo", "Ede"],
            "Aromatics & Seasoning": ["Red palm oil", "Ground crayfish", "Ogiri Igbo", "Yellow pepper", "Bouillon cubes", "Salt"]
        }
    },
    {
        title: "Miyan Kuka",
        time: "35",
        region: "Hausa",
        img: "./images/miyan-kuka.webp",
        ingredients: {
            "Base Leaf": ["Powdered baobab leaves (kuka)"],
            "Aromatics & Seasoning": ["Dawadawa", "Ground crayfish", "Scotch bonnet peppers", "Onions", "Bouillon cubes", "Salt"],
            "Fat": ["Red palm oil or peanut oil"]
        }
    },
    {
        title: "Afang Soup",
        time: "70",
        region: "Calabar",
        img: "./images/afang-soup.webp",
        ingredients: {
            "Base Leaves": ["Fresh Afang leaves (Ukazi)", "Waterleaf"],
            "Fat & Aromatics": ["Red palm oil", "Ground crayfish", "Scotch bonnet peppers", "Bouillon cubes", "Salt"]
        }
    },
    {
        title: "Banga Soup",
        time: "80",
        region: "Urhobo & Isoko",
        img: "./images/banga-soup.webp",
        ingredients: {
            "Base Extract": ["Palm fruit extract (Banga paste)", "Beletete leaves"],
            "Banga Spices": ["Banga spice blend (Taiko)", "Oburunbebe stick", "Orima"],
            "Aromatics & Seasoning": ["Ground crayfish", "Scotch bonnet peppers", "Onions", "Bouillon cubes", "Salt"]
        }
    },
    {
        title: "Black Soup",
        time: "45",
        region: "Esan, Bini",
        img: "./images/black-soup.webp",
        ingredients: {
            "Base Leaves": ["Palm fruit extract", "Fresh scent leaves", "Uziza leaves", "Washed bitter leaf"],
            "Aromatics & Seasoning": ["Red palm oil", "Ground crayfish", "Scotch bonnet peppers", "Onions", "Bouillon cubes", "Salt"]
        }
    }
];

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

function renderFeatured() {
    const container = document.getElementById('featured-grid');
    // Only show ALL cards automatically if width >= 1024px
    const isLargeDesktop = window.innerWidth >= 1024;
    const displayRecipes = (isLargeDesktop || showAllRecipes) ? allRecipes : allRecipes.slice(0, 4);

    container.innerHTML = displayRecipes.map(r => {
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
                <img src="${r.img}" alt="${r.title}" loading="lazy">
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

function renderRegions() {
    const container = document.getElementById('regions-grid');
    // Only show ALL cards automatically if width >= 1024px
    const isLargeDesktop = window.innerWidth >= 1024;
    const displayRegions = (isLargeDesktop || showAllRegions) ? allRegions : allRegions.slice(0, 4);

    container.innerHTML = displayRegions.map(region => `
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

function goToRecipes() {
    window.location.href = "recipes.html";
}

// Toggle Functions (Mobile only)
function toggleRecipes() {
    showAllRecipes = !showAllRecipes;
    renderFeatured();

    const btn = document.querySelector('.featured .btn-view-all');
    if (btn) btn.textContent = showAllRecipes ? "Show Less ↑" : "View All Recipes →";
}

function toggleRegions() {
    showAllRegions = !showAllRegions;
    renderRegions();

    const btn = document.querySelector('.regions .btn-view-all');
    if (btn) btn.textContent = showAllRegions ? "Show Less ↑" : "View All Region →";
}

// Hide "View All" buttons on Desktop
function updateViewAllButtons() {
    const isLargeDesktop = window.innerWidth >= 1024;
    const recipeBtn = document.querySelector('.featured .btn-view-all');
    const regionBtn = document.querySelector('.regions .btn-view-all');

    if (recipeBtn) recipeBtn.style.display = isLargeDesktop ? "none" : "block";
    if (regionBtn) regionBtn.style.display = isLargeDesktop ? "none" : "block";
}

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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
    renderRegions();
    updateViewAllButtons();

    // Attach toggle events (only on mobile)
    const recipeBtn = document.querySelector('.featured .btn-view-all');
    const regionBtn = document.querySelector('.regions .btn-view-all');

    if (recipeBtn) recipeBtn.addEventListener('click', toggleRecipes);
    if (regionBtn) regionBtn.addEventListener('click', toggleRegions);

    // Update on resize
    window.addEventListener('resize', () => {
        renderFeatured();
        renderRegions();
        updateViewAllButtons();
    });
});

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

if (currentYear) currentYear.textContent = today.getFullYear();
if (lastModified) lastModified.innerHTML = `Last Modified: ${document.lastModified}`;
