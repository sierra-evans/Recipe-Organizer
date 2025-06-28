const categorySelect = document.getElementById('category-selection');
const searchForm = document.getElementById('search-form');
const resultsDiv = document.getElementById('search-results');

fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
  .then(res => res.json())
  .then(data => {
    data.meals.forEach(category => {
      const option = document.createElement('option');
      option.value = category.strCategory;
      option.textContent = category.strCategory;
      categorySelect.appendChild(option);
    });
  })
  .catch(console.error);

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const searchTerm = document.getElementById('search-input').value.trim();
  const selectedCategory = categorySelect.value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      resultsDiv.innerHTML = '';

      if (!data.meals) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
      }

      const filtered = selectedCategory
        ? data.meals.filter(meal => meal.strCategory === selectedCategory)
        : data.meals;

      if (filtered.length === 0) {
        resultsDiv.innerHTML = '<p>No meals matched your category selection.</p>';
        return;
      }

      filtered.forEach(meal => {
        const card = document.createElement('a');
        card.href = `details.html?id=${meal.idMeal}`;
        card.classList.add('recipe-card');
        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <h3>${meal.strMeal}</h3>
          <h4>${meal.strCategory}</h4>
          <p>${meal.strInstructions.substring(0, 120)}...</p>
        `;
        resultsDiv.appendChild(card);
      });
    })
    .catch(() => {
      resultsDiv.innerHTML = '<p>Error loading results.</p>';
    });
});