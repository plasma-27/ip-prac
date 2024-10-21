// src/eight/recipe.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './recipe.css';

const RecipeCatalog = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const { id } = useParams(); // Get recipe ID from URL params

    // Fetch all recipes from the backend
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:5002/api/recipes');
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    // Fetch individual recipe when an ID is provided
    useEffect(() => {
        const fetchRecipe = async () => {
            if (id) {
                try {
                    const response = await fetch(`http://localhost:5002/api/recipes/${id}`);
                    if (!response.ok) throw new Error('Recipe not found');
                    const data = await response.json();
                    setSelectedRecipe(data);
                } catch (error) {
                    console.error('Error fetching recipe:', error);
                }
            }
        };
        fetchRecipe();
    }, [id]);

    return (
        <div className="recipe-catalog-container">
            {!id ? (
                <>
                    <h1>Popular Dishes</h1>
                    <div className="recipes">
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className="recipe-card">
                                <h2>{recipe.title}</h2>
                                <Link to={`/recipes/${recipe.id}`}>
                                    <button className="view-recipe-button">View Recipe</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                selectedRecipe && (
                    <div className="recipe-detail">
                        <h1>{selectedRecipe.title}</h1>
                        <h3>Time to Make: {selectedRecipe.timeToMake}</h3> {/* Added time to make display */}
                        <h3>Ingredients:</h3>
                        <ul>
                            {selectedRecipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <h3>Instructions:</h3>
                        <p>{selectedRecipe.instructions}</p>
                        <Link to="/recipe">
                            <button className="back-button">Back to Recipes</button>
                        </Link>
                    </div>
                )
            )}
        </div>
    );
};

export default RecipeCatalog;
