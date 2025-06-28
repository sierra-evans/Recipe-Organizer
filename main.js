// Used on archive.html:
// - Loads categories from API
// - Performs search using localStorage and API recipes
// - Displays results using createRecipeCard()

import { fetchCategories, searchMeals } from './api.js';
import { searchLocalRecipes } from './localStorage.js';
import { renderCategoriesDropdown, createRecipeCard } from './display.js';

document.addEventListener('DOMContentLoaded', async () => {
  const searchForm = document.getElementById('search-form');
  const categorySelect = document.getElementById('category-selection');
  const resultsDiv = document.getElementById('search-results');

  const categories = await fetchCategories();
  renderCategoriesDropdown(categorySelect, categories);

  searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    const term = document.getElementById('search-input').value.trim().toLowerCase();
    const category = categorySelect.value;

    const localResults = searchLocalRecipes(term, category).map(r => ({
      idMeal: r.id,
      strMeal: r.title,
      strMealThumb: r.image || 'https://placehold.co/300x200?text=No+Image',
      strCategory: r.category,
      strInstructions: Array.isArray(r.instructions) ? r.instructions.join(' ') : r.instructions
    }));

    const apiResults = await searchMeals(term);
    const filteredApi = apiResults.filter(m => !category || m.strCategory === category);

    const allResults = [...localResults, ...filteredApi];
    resultsDiv.innerHTML = allResults.length === 0
      ? '<p>No results found.</p>'
      : '';

    allResults.forEach(meal => {
      resultsDiv.appendChild(createRecipeCard(meal));
    });
  });
});