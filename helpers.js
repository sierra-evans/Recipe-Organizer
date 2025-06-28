// This module provides common helper functions:
// - getQueryParam() for reading URL parameters
// - pickRandom() to select a random item from an array
// - getIngredientsFromMeal() to extract ingredients from a MealDB object

export function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  export function pickRandom(arr) {
    return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
  }
  
  export function getIngredientsFromMeal(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredients.push(`${meas} ${ing}`.trim());
      }
    }
    return ingredients;
  }  