// Used on details.html:
// - Reads the `id` from URL
// - Loads recipe from localStorage or TheMealDB API based on ID format
// - Displays full recipe details in the page

import { getQueryParam, getIngredientsFromMeal } from './helpers.js';
import { fetchMealById } from './api.js';
import { findLocalRecipeById } from './localStorage.js';
import { displayRecipeDetails } from './display.js';

document.addEventListener('DOMContentLoaded', async () => {
  const id = getQueryParam('id');

  if (!id) {
    document.body.innerHTML = '<p>No recipe selected.</p>';
    return;
  }

  if (id.startsWith('local-')) {
    const recipe = findLocalRecipeById(id);
    if (!recipe) {
      document.body.innerHTML = '<p>Recipe not found in local storage.</p>';
    } else {
      displayRecipeDetails(recipe);
    }
  } else {
    try {
      const meal = await fetchMealById(id);
      if (!meal) {
        document.body.innerHTML = '<p>Recipe not found.</p>';
        return;
      }

      displayRecipeDetails({
        title: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory,
        ingredients: getIngredientsFromMeal(meal),
        instructions: meal.strInstructions
      });
    } catch {
      document.body.innerHTML = '<p>Error loading recipe.</p>';
    }
  }
});