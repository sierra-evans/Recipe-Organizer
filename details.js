function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  const id = getQueryParam('id');
  
  if (!id) {
    document.body.innerHTML = '<p>No recipe selected.</p>';
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.meals) {
          document.body.innerHTML = '<p>Recipe not found.</p>';
          return;
        }
  
        const meal = data.meals[0];
        document.getElementById('recipe-title').textContent = meal.strMeal;
        document.getElementById('recipe-image').src = meal.strMealThumb;
        document.getElementById('recipe-image').alt = `Image of ${meal.strMeal}`;
        document.getElementById('recipe-category').textContent = meal.strCategory;
        document.getElementById('recipe-description').textContent = meal.strInstructions;
  
        const ingredientsList = document.getElementById('recipe-ingredients');
        const instructionsList = document.getElementById('recipe-instructions');
  
        ingredientsList.innerHTML = '';
        instructionsList.innerHTML = '';
  
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
  
          if (ingredient && ingredient.trim()) {
            const li = document.createElement('li');
            li.textContent = `${measure} ${ingredient}`;
            ingredientsList.appendChild(li);
          }
        }
  
        const steps = meal.strInstructions.split(/\r?\n|\.\s/).filter(s => s.trim().length);
        steps.forEach(step => {
          const li = document.createElement('li');
          li.textContent = step.trim();
          instructionsList.appendChild(li);
        });
      })
      .catch(() => {
        document.body.innerHTML = '<p>Error loading recipe details.</p>';
      });
  }  