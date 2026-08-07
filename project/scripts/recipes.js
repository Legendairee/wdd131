
//   Nigerian Recipes Application
//   Manage a collection of traditional Nigerian recipes with filtering,
//   meal planning, favorites, and local storage.
//   Supports responsive display and limit cards on mobile and dynamic rendering.
 
const allRecipes = [
    {
        id: 1,
        title: "Jollof Rice",
        time: "60",
        region: "Nigeria",
        img: "./images/jollof-rice.webp",
        ingredients: {
            "Base": ["Tomatoes", "Red bell peppers (tatashe)", "Scotch bonnets (rodo)", "Onions"],
            "Aromatics": ["Garlic", "Ginger", "Curry powder", "Dried thyme", "Bay leaves"],
            "Liquid & Fat": ["Cooking oil", "Tomato paste", "Rich meat stock (beef, goat, or chicken)"],
            "Grain": ["Long-grain parboiled rice or basmati rice"]
        },
        instructions: [
            "Blend tomatoes, bell peppers, scotch bonnets, and onions into a smooth puree.",
            "Heat cooking oil in a large pot and fry tomato paste with chopped onions for 5-7 minutes until deep red.",
            "Pour in the blended pepper mix and cook down until oil separates from the stew base.",
            "Add curry powder, thyme, bay leaves, garlic, ginger, salt, and meat stock. Bring to a rapid simmer.",
            "Wash rice thoroughly until water runs clear, then stir into the simmering tomato base.",
            "Cover tightly with foil and a lid; steam on low heat for 30 minutes until soft and smoked."
        ]
    },
    {
        id: 2,
        title: "Egusi Soup",
        time: "45",
        region: "Nigeria",
        img: "./images/egusi-soup.webp",
        ingredients: {
            "Base": ["Ground egusi (melon seeds)", "Palm oil", "Spinach or bitter leaf", "Onions"],
            "Aromatics": ["Ground crayfish", "Locust beans (iru)", "Bouillon cubes"],
            "Protein & Stock": ["Beef", "Stockfish", "Dry fish", "Meat stock"]
        },
        instructions: [
            "Boil meats, stockfish, and dry fish with seasoned stock until tender; set stock aside.",
            "Mix ground egusi with onion paste and a splash of water to form thick lumps or paste.",
            "Heat palm oil in a pot, add iru, and fry egusi paste lumps until firm and well toasted.",
            "Pour in reserved meat stock, crayfish, and seasonings; simmer for 15-20 minutes.",
            "Stir in chopped spinach or bitter leaf and cook uncovered for 3-5 minutes before serving."
        ]
    },
    {
        id: 3,
        title: "Ewedu Soup",
        time: "25",
        region: "Yoruba",
        img: "./images/ewedu-soup.webp",
        ingredients: {
            "Base": ["Fresh ewedu leaves (jute leaves)", "Water"],
            "Aromatics & Seasoning": ["Locust beans (iru)", "Ground crayfish", "Bouillon cube", "Salt"],
            "Thickener & Texture": ["Edible potash (kanwa) or baking soda (optional)"]
        },
        instructions: [
            "Pick and wash fresh ewedu leaves thoroughly in clean water.",
            "Boil 1 cup of water, add a tiny pinch of potash or baking soda, then add leaves.",
            "Cook for 5 minutes, then blend briefly with a whisk (ijabe) or blender until smooth.",
            "Return to pot, add iru, ground crayfish, bouillon cube, and salt; simmer for 2 minutes."
        ]
    },
    {
        id: 4,
        title: "Ofe Oha Soup",
        time: "60",
        region: "Igbo",
        img: "./images/ofe-oha.webp",
        ingredients: {
            "Base Leaves": ["Fresh Oha leaves", "Uziza leaves (optional)"],
            "Thickener": ["Cocoyam paste (taro)", "Achi", "Ofo", "Ede"],
            "Protein & Stock": ["Assorted meats (beef, goat)", "Shaki (tripe)", "Stockfish", "Dry fish"],
            "Aromatics & Seasoning": ["Red palm oil", "Ground crayfish", "Ogiri Igbo", "Yellow pepper", "Bouillon cubes", "Salt"]
        },
        instructions: [
            "Boil cocoyam bulbs until soft, peel, and pound into a smooth paste thickener.",
            "Season and boil meats, tripe, stockfish, and dry fish until tender.",
            "Add palm oil, yellow pepper, ground crayfish, and ogiri to the boiling stock.",
            "Add small lumps of cocoyam paste and allow to dissolve completely to thicken the soup.",
            "Shred Oha leaves by hand (do not cut with a knife) and stir into soup; simmer for 3 minutes."
        ]
    },
    {
        id: 5,
        title: "Miyan Kuka",
        time: "35",
        region: "Hausa",
        img: "./images/miyan-kuka.webp",
        ingredients: {
            "Base Leaf": ["Powdered baobab leaves (kuka)"],
            "Protein & Stock": ["Beef, goat meat, or dried fish", "Cow tripe (shaki)", "Rich meat stock"],
            "Aromatics & Seasoning": ["Dawadawa", "Ground crayfish", "Scotch bonnet peppers", "Onions", "Bouillon cubes", "Salt"],
            "Fat": ["Red palm oil or peanut oil"]
        },
        instructions: [
            "Boil meat, tripe, and dried fish with onions and seasoning till cooked through.",
            "Add dawadawa, crayfish, ground scotch bonnets, and palm oil to the broth.",
            "Reduce heat to low and gradually whisk in powdered kuka to avoid lumps.",
            "Simmer continuously for 5-7 minutes until smooth and viscous."
        ]
    },
    {
        id: 6,
        title: "Afang Soup",
        time: "70",
        region: "Calabar",
        img: "./images/afang-soup.webp",
        ingredients: {
            "Base Leaves": ["Fresh Afang leaves (Ukazi)", "Waterleaf"],
            "Protein & Stock": ["Assorted meats", "Shaki", "Stockfish head", "Dry fish", "Periwinkles"],
            "Fat & Aromatics": ["Red palm oil", "Ground crayfish", "Scotch bonnet peppers", "Bouillon cubes", "Salt"]
        },
        instructions: [
            "Pound or finely grind dried afang leaves; finely slice fresh waterleaves.",
            "Boil meats, stockfish head, dry fish, and periwinkles with season cubes until tender.",
            "Add waterleaf to stock without extra water and let cook for 5 minutes until soft.",
            "Pour in red palm oil, ground crayfish, and peppers; simmer for 3 minutes.",
            "Add ground afang leaves, stir thoroughly, and simmer on low heat for 3-5 minutes."
        ]
    },
    {
        id: 7,
        title: "Banga Soup",
        time: "80",
        region: "Urhobo & Isoko",
        img: "./images/banga-soup.webp",
        ingredients: {
            "Base Extract": ["Palm fruit extract (Banga paste)", "Beletete leaves"],
            "Banga Spices": ["Banga spice blend (Taiko)", "Oburunbebe stick", "Orima"],
            "Protein & Stock": ["Fresh catfish", "Dried fish", "Stockfish", "Assorted meats", "Periwinkles"],
            "Aromatics & Seasoning": ["Ground crayfish", "Scotch bonnet peppers", "Onions", "Bouillon cubes", "Salt"]
        },
        instructions: [
            "Boil palm fruit extract with water until thick and oil starts rising to the surface.",
            "Add banga spice blend, oburunbebe stick, crayfish, and scotch bonnet peppers.",
            "Stir in pre-cooked meats, stockfish, dried fish, and periwinkles.",
            "Add fresh catfish gently and simmer for 10–15 minutes until fish is cooked.",
            "Crush beletete leaves into soup and cook for 3 minutes before taking off heat."
        ]
    },
    {
        id: 8,
        title: "Black Soup",
        time: "45",
        region: "Esan Benin",
        img: "./images/black-soup.webp",
        ingredients: {
            "Base Leaves": ["Palm fruit extract", "Fresh scent leaves", "Uziza leaves", "Washed bitter leaf"],
            "Protein & Stock": ["Assorted meats", "Dry fish", "Stockfish", "Rich meat stock"],
            "Aromatics & Seasoning": ["Red palm oil", "Ground crayfish", "Scotch bonnet peppers", "Onions", "Bouillon cubes", "Salt"]
        },
        instructions: [
            "Blend scent leaves, uziza leaves, and bitter leaf together with minimal water into a paste.",
            "Boil meats, stockfish, and dry fish with seasonings until tender.",
            "Add palm oil, crayfish, and ground peppers to the meat broth.",
            "Stir in the blended dark herbal paste and palm fruit extract.",
            "Simmer for 10-12 minutes until thick and aromatic."
        ]
    }
];

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

// ======== This is going to render full recipe cards ==========
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

    const isDesktop = window.innerWidth >= 768;
    const displayRecipes = (isDesktop || showAllRecipes) ? recipes : recipes.slice(0, 4);

    if (toggleBtn) {
        if (!isDesktop && recipes.length > 4) {
            toggleBtn.style.display = 'block';
            toggleBtn.textContent = showAllRecipes ? "Show Less ⇧" : "View All Recipes ⇩";
        } else {
            toggleBtn.style.display = 'none';
        }
    }

    container.innerHTML = displayRecipes.map(r => {
        const isInPlan = mealPlan.some(item => item.id === r.id);
        const isSaved = favorites.some(item => item.id === r.id);  // ← New correct line

        let ingredientsHTML = '';
        if (r.ingredients) {
            ingredientsHTML = `
                <div class="ingredients-container hidden" id="ingredients-${r.id}">
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

        let instructionsHTML = '';
        if (r.instructions) {
            instructionsHTML = `
                <div class="instructions-container">
                    <h4 class="instructions-title">Preparation Steps</h4>
                    <ol class="instructions-list">
                        ${r.instructions.map(step => `<li>${step}</li>`).join('')}
                    </ol>
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

    //======== Event Listener for Plan, favorite, and ingredients toggle=======
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            toggleMealPlan(Number(e.target.dataset.id));
        });
    });

    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            toggleFavorite(Number(e.target.dataset.id));
        });
    });

    document.querySelectorAll('.toggle-ingredients-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const recipeId = e.target.dataset.id;
            const targetContainer = document.getElementById(`ingredients-${recipeId}`);
            if (targetContainer) {
                targetContainer.classList.toggle('hidden');
                e.target.textContent = targetContainer.classList.contains('hidden')
                    ? 'Show Ingredients'
                    : 'Hide Ingredients';
            }
        });
    });
}


// ===== This will render the submitted recipes ========
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

    // ===== This will delete submitted recipe =======
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



// ======== This is the toggle function (mobile) ==========
function toggleRecipes() {
    showAllRecipes = !showAllRecipes;
    renderRecipes(currentFiltered);
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

    const search = document.getElementById('search').value.toLowerCase().trim();
    const region = document.getElementById('region').value;
    const maxTime = document.getElementById('time').value;

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
    renderRecipes(allRecipes);
    setupActiveNavigation();

    const form = document.getElementById('filter-form');
    if (form) form.addEventListener('submit', filterRecipes);

    const searchInput = document.getElementById('search');
    if (searchInput) searchInput.addEventListener('input', filterRecipes);

    const toggleBtn = document.getElementById('toggle-recipes-btn');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleRecipes);

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            showAllRecipes = false;
        }
        renderRecipes(currentFiltered);
    });
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
if (lastModified) lastModified.innerHTML = `Last Modified: ${document.lastModified}`;