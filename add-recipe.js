// Used on add-recipe.html:
// - Loads categories into the <select> from API
// - Handles form submission and saves new recipe to localStorage

import { fetchCategories } from './api.js';
import { saveLocalRecipe } from './localStorage.js';
import { renderCategoriesDropdown } from './display.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('recipe-form');
  const categorySelect = document.getElementById('category');

  try {
    const categories = await fetchCategories();
    renderCategoriesDropdown(categorySelect, categories);
  } catch {
    categorySelect.innerHTML = '<option value="">Failed to load</option>';
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const image = document.getElementById('image').value.trim();
    const category = categorySelect.value;
    const ingredients = document.getElementById('ingredients').value.trim().split(',');
    const instructions = document.getElementById('instructions').value.trim().split('|');

    const recipe = {
      id: 'local-' + title.replace(/\s+/g, '-').toLowerCase(),
      title,
      image,
      category,
      ingredients,
      instructions
    };

    saveLocalRecipe(recipe);
    form.reset();
    alert('Recipe saved!');
  });
});