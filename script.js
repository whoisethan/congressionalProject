const appId = '3990a2fc';
const apiKey = 'e9a327dba4ad4c8609f4b251b002dec6';

function searchRecipes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const ingredientInput = Array.from(checkboxes).map(checkbox => checkbox.value).join('%2C');

  const recipeResults = document.getElementById('recipeResults');
  recipeResults.innerHTML = '<p>Loading recipes...</p>';

  fetch(`https://api.edamam.com/search?q=${ingredientInput}&app_id=${appId}&app_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const recipes = data.hits.map(hit => ({
        label: hit.recipe.label,
        url: hit.recipe.url,
        image: hit.recipe.image
      }));
      displayRecipes(recipes);
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
      recipeResults.innerHTML = '<p>Failed to fetch recipes. Please try again later.</p>';
    });
}

function displayRecipes(recipesData) {
  const recipeResults = document.getElementById('recipeResults');
  recipeResults.innerHTML = '';

  if (recipesData.length === 0) {
    recipeResults.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
    return;
  }

  const ul = document.createElement('ul');
  recipesData.forEach(recipe => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = recipe.url;
    link.target = '_blank';

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    const image = document.createElement('img');
    image.src = recipe.image;
    image.alt = 'Recipe Image';

    const title = document.createElement('h3');
    title.textContent = recipe.label;

    recipeCard.appendChild(image);
    recipeCard.appendChild(title);

    link.appendChild(recipeCard);
    li.appendChild(link);
    ul.appendChild(li);
  });

  recipeResults.appendChild(ul);
}
