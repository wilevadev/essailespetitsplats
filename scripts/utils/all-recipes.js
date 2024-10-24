import { Recipe } from '../templates/create-card.js'

export function displayAllRecipes(recipes) {
  const container = document.getElementById('recipes-container');
  const recipeCountElement = document.getElementById('recipe-count');

  if (!container) {
    console.error("Le conteneur 'recipes-container' n'a pas été trouvé.");
    return;
  }

  container.innerHTML = '';  // Vider le conteneur avant d'afficher les recettes

  if (recipes.length === 0) {
    container.innerHTML = '<p>Aucune recette trouvée</p>';
    recipeCountElement.textContent = '0 recette';
    return;
  }

  recipes.forEach(recipeData => {
    try {
      const recipe = new Recipe(recipeData);
      const recipeCard = recipe.createRecipeCard();
      container.appendChild(recipeCard);  // Ajouter la carte au conteneur
    } catch (error) {
      console.warn(`Recette ignorée : ${error.message}`);
    }
  });

  // Mettre à jour le compteur de recettes
  if (recipeCountElement) {
    recipeCountElement.textContent = `${recipes.length} recette(s)`;
  }
}

