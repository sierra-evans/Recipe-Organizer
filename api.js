// This module handles all API calls to TheMealDB:
// - fetchCategories()
// - fetchRandomMeal()
// - searchMeals()
// - fetchMealById()

export async function fetchCategories() {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
    const data = await res.json();
    return data.meals.map(c => c.strCategory);
  }
  
  export async function fetchRandomMeal() {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  }
  
  export async function searchMeals(searchTerm) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await res.json();
    return data.meals || [];
  }
  
  export async function fetchMealById(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  }  