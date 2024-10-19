// server8.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5002;

// Enable CORS
app.use(cors());

// Sample recipe data
const recipes = [
    {
        id: 1,
        title: 'Spaghetti Carbonara',
        ingredients: ['spaghetti', 'eggs', 'parmesan cheese', 'pancetta', 'black pepper'],
        instructions: 'Cook spaghetti. In a bowl, beat eggs and mix with cheese. Fry pancetta. Combine all with pepper.'
    },
    {
        id: 2,
        title: 'Chicken Curry',
        ingredients: ['chicken', 'curry powder', 'coconut milk', 'onion', 'garlic'],
        instructions: 'Sauté onion and garlic. Add chicken and cook. Stir in curry powder and coconut milk.'
    },
    {
        id: 3,
        title: 'Caesar Salad',
        ingredients: ['romaine lettuce', 'croutons', 'parmesan cheese', 'Caesar dressing'],
        instructions: 'Chop lettuce. Toss with croutons and Caesar dressing. Top with parmesan cheese.'
    }
];

// Get all recipes
app.get('/api/recipes', (req, res) => {
    res.json(recipes);
});

// Get recipe by ID
app.get('/api/recipes/:id', (req, res) => {
    const recipeId = parseInt(req.params.id);
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
