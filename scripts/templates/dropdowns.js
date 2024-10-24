const dropDowns = document.querySelectorAll('.dropDown');
const masques = document.querySelectorAll("[id^='masque']");

// Fonction pour gérer le filtrage des recettes en fonction du dropdown sélectionné
function filterRecipesByDropdown(selectedValue) {
  const filteredRecipes = allRecipes.filter(recipe => {
    return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedValue.toLowerCase()));
  });

  // Afficher les recettes filtrées
  displayAllRecipes(filteredRecipes);
}

// Ajout des événements sur les dropdowns
function addDropdownEventListeners (dropDown) {
  const input = dropDown.querySelector('.recherche');
  
  if (input) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    input.parentNode.insertBefore(errorContainer, input.nextSibling);

    input.addEventListener('input', debounce((e) => {
      const searchValue = e.target.value.trim().toLowerCase();
      dropDown.dataset.searchValue = searchValue;
      filterRecipesByDropdown(searchValue);  // Filtrer les recettes selon l'entrée du dropdown
      filterDropdownOptions(dropDown, searchValue, errorContainer);
    }, 300));

    dropDown.addEventListener('toggle', () => {
      if (dropDown.open) {
        input.value = dropDown.dataset.searchValue || '';
        filterDropdownOptions(dropDown, input.value, errorContainer);
      }
    });
  }
}

// Fonction pour filtrer les options dans le dropdown en fonction de la recherche
function filterDropdownOptions (dropdown, query, errorContainer) {
  const options = dropdown.querySelectorAll('.option');
  if (!options.length) {
    console.error('Aucune option trouvée dans le dropdown');
    return;
  }

  let found = false;
  options.forEach(option => {
    const text = option.innerText.toLowerCase();
    if (text.includes(query.toLowerCase())) {
      option.style.display = '';
      found = true;
    } else {
      option.style.display = 'none';
    }
  });

  errorContainer.textContent = found ? '' : `Aucun mot-clé ne correspond à "${query}".`;
}

// Fonction de debounce pour limiter les appels répétitifs
function debounce (func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Appliquer les écouteurs sur chaque dropdown et masque
dropDowns.forEach(addDropdownEventListeners);

masques.forEach((masque, index) => {
  masque.addEventListener('click', (e) => {
    e.stopPropagation();
    dropDowns[index].open = false;
  });
});

document.querySelectorAll('.dropDown > .options > *').forEach(option => {
  option.addEventListener('click', (e) => {
    e.stopPropagation();
    const parentDropDown = e.target.closest('.dropDown');
    parentDropDown.open = true;
  });
});

document.querySelectorAll('.option-search').forEach(optionSearchInput => {
  optionSearchInput.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

