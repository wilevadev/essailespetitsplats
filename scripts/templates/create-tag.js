import { filterRecipes } from '../algoritms/algorithme-n.js'

export function createTagElement (value) {
  const tagsContainer = document.getElementById('tags-container')

  if (!tagsContainer) {
    console.error("Le conteneur des tags n'a pas été trouvé dans le DOM.")
    return
  }

  if (!tagsContainer.querySelector(`.tag[data-value="${value}"]`)) {
    const tagElement = document.createElement('div')
    tagElement.classList.add('tag')
    tagElement.dataset.value = value
    tagElement.innerText = value

    const removeButton = document.createElement('span')
    removeButton.classList.add('remove-tag')
    removeButton.innerHTML = '<img src="assets/icons/croixtags.svg" alt="Remove tag" width="16" height="16">'
    removeButton.style.cursor = 'pointer'

    removeButton.addEventListener('click', () => {
      tagElement.remove()
      filterRecipes()
    })

    tagElement.appendChild(removeButton)
    tagsContainer.appendChild(tagElement)
  }
}
