export class Recipe {
  constructor(recipe) {
    // On vérifie si les propriétés nécessaires sont présentes avant de les utiliser
    if (!recipe || !recipe.id || !recipe.name || !recipe.image) {
      throw new Error('Les informations de la recette sont incomplètes.');
    }
    
    this._id = recipe.id;
    this._image = `../assets/images/LesPetitsPlats/${recipe.image}`;
    this._name = recipe.name;
    this._appliance = recipe.appliance;
    this._description = recipe.description;
    this._ingredients = recipe.ingredients || [];
    this._servings = recipe.servings;
    this._time = recipe.time;
    this._ustensils = recipe.ustensils || [];
  }

  createRecipeCard() {
    // Gestion d'erreur supplémentaire
    try {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('aria-labelledby', `recipe-${this._id}`);

      const cardHeader = document.createElement('div');
      cardHeader.classList.add('card-header');

      const recipeImage = document.createElement('img');
      recipeImage.id = 'recipe-image';
      recipeImage.src = this._image;
      recipeImage.alt = this._name || 'Image non disponible';
      recipeImage.loading = 'lazy'; // lazy load
      recipeImage.width = 380;
      recipeImage.height = 253;

      const recipeTime = document.createElement('span');
      recipeTime.id = `recipe-time-${this._id}`;
      recipeTime.textContent = `${this._time} min`;

      cardHeader.appendChild(recipeImage);
      cardHeader.appendChild(recipeTime);

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const recipeName = document.createElement('h2');
      recipeName.id = `recipe-${this._id}`;
      recipeName.textContent = this._name;

      const recipeDescription = document.createElement('p');
      recipeDescription.id = 'recipe-description';
      recipeDescription.textContent = this._description;

      const ingredientsTitle = document.createElement('h3');
      ingredientsTitle.textContent = 'Ingrédients';

      const ingredientsList = document.createElement('ul');
      ingredientsList.id = 'recipe-ingredients';

      // Ajout d'une vérification pour éviter les erreurs sur les ingrédients manquants
      this._ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        const ingredientName = document.createElement('span');
        const quantityAndUnit = document.createElement('span');

        ingredientName.textContent = ingredient.ingredient || 'Ingrédient inconnu';
        ingredientName.classList.add('ingredient-name');

        quantityAndUnit.textContent = `${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}`;
        quantityAndUnit.classList.add('quantity-unit');

        listItem.appendChild(ingredientName);
        listItem.appendChild(quantityAndUnit);
        ingredientsList.appendChild(listItem);
      });

      cardBody.appendChild(recipeName);
      cardBody.appendChild(recipeDescription);
      cardBody.appendChild(ingredientsTitle);
      cardBody.appendChild(ingredientsList);

      card.appendChild(cardHeader);
      card.appendChild(cardBody);

      return card;
    } catch (error) {
      console.error(`Erreur lors de la création de la carte recette : ${error.message}`);
      return null; // retourne null si la création échoue
    }
  }
}

