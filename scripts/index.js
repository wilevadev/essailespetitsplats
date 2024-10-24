import { recipes } from '../data/recipes.js';  // Importation de recipes
import { displayAllRecipes } from './utils/all-recipes.js';  // Importation pour afficher toutes les recettes
import { initUseCase } from './algoritms/algorithme-pf.js';  // Importation pour gérer les recherches et filtres

document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si recipes est bien un tableau
  if (Array.isArray(recipes)) {
    try {
      displayAllRecipes(recipes);  // Affiche les recettes à l'initialisation
      initUseCase(recipes);  // Initialise la recherche et le filtrage
    } catch (error) {
      console.error("Erreur lors de l'initialisation des recettes :", error.message);
    }
  } else {
    console.error("La variable 'recipes' n'est pas définie ou n'est pas un tableau.");
  }
});

