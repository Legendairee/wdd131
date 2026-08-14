// ============================================
// Shared recipe dataset used by multiple pages.
// Loading this file once lets the browser cache
// the data and reuse it on every page.
// ============================================

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
