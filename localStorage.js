// This module manages saving, loading, and searching recipes in localStorage:
// - getLocalRecipes()
// - saveLocalRecipe()
// - findLocalRecipeById()
// - searchLocalRecipes()

const STORAGE_KEY = 'recipes';

export function getLocalRecipes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveLocalRecipe(recipe) {
  const recipes = getLocalRecipes();
  recipes.push(recipe);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export function findLocalRecipeById(id) {
  return getLocalRecipes().find(r => r.id === id);
}

export function searchLocalRecipes(searchTerm, category) {
  const term = searchTerm.toLowerCase();
  return getLocalRecipes().filter(r =>
    r.title.toLowerCase().includes(term) &&
    (!category || r.category === category)
  );
}