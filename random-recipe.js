// Used on index.html:
// - Loads a random recipe from localStorage or TheMealDB
// - Displays it in the "Recipe of the Day" section

import { getLocalRecipes } from './localStorage.js';
import { fetchRandomMeal } from './api.js';
import { pickRandom } from './helpers.js';

document.addEventListener('DOMContentLoaded', async () => {
  const localRecipes = getLocalRecipes().map(r => ({
    idMeal: r.id,
    strMeal: r.title,
    strMealThumb: r.image || 'https://placehold.co/512x384?text=No+Image',
    strCategory: r.category,
    strInstructions: Array.isArray(r.instructions) ? r.instructions.join(' ') : r.instructions
  }));

  const apiRecipe = await fetchRandomMeal();
  const combined = [...localRecipes];
  if (apiRecipe) combined.push(apiRecipe);

  const recipe = pickRandom(combined);
  if (!recipe) return;

  const card = document.getElementById('recipe-card');
  card.href = `details.html?id=${recipe.idMeal}`;

  document.getElementById('recipe-image').src = recipe.strMealThumb;
  document.getElementById('recipe-image').alt = `Image of ${recipe.strMeal}`;
  document.getElementById('recipe-title').textContent = recipe.strMeal;
  document.getElementById('recipe-category').textContent = recipe.strCategory;
  document.getElementById('recipe-instructions').textContent = recipe.strInstructions.substring(0, 120) + '...';
});