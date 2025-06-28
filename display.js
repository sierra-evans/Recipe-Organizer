// This module handles DOM rendering for UI elements like:
// - renderCategoriesDropdown()
// - createRecipeCard()
// - displayRecipeDetails()

export function renderCategoriesDropdown(select, categories) {
    select.innerHTML = '<option value="">Choose one</option>';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option);
    });
  }
  
  export function createRecipeCard(meal) {
    const card = document.createElement('a');
    card.href = `details.html?id=${meal.idMeal}`;
    card.classList.add('recipe-card');
    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h3>${meal.strMeal}</h3>
      <h4>${meal.strCategory}</h4>
      <p>${meal.strInstructions?.substring(0, 120) || ""}...</p>
    `;
    return card;
  }
  
  export function displayRecipeDetails(recipe) {
    document.getElementById('recipe-title').textContent = recipe.title || recipe.strMeal;
    const img = document.getElementById('recipe-image');
    img.src = recipe.image || recipe.strMealThumb || '';
    img.alt = `Image of ${recipe.title || recipe.strMeal}`;
  
    document.getElementById('recipe-category').textContent = recipe.category || '';
  
    const ingredientsList = document.getElementById('recipe-ingredients');
    ingredientsList.innerHTML = '';
    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : recipe.ingredients?.split(',');
    ingredients?.forEach(ing => {
      const li = document.createElement('li');
      li.textContent = ing;
      ingredientsList.appendChild(li);
    });
  
    const instructionsList = document.getElementById('recipe-instructions');
    instructionsList.innerHTML = '';
    const steps = Array.isArray(recipe.instructions)
      ? recipe.instructions
      : recipe.instructions?.split(/\r?\n|\.\s/).filter(s => s.trim());
  
    steps?.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step.trim();
      instructionsList.appendChild(li);
    });
  }  