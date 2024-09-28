export function createCard(data, onDelete, onLike, onImageClick) {
    const userTemplate = document.querySelector("#card-template").content;
    const userElement = userTemplate.querySelector(".places__item").cloneNode(true);
    const cardTitle = userElement.querySelector(".card__title");
    const cardImage = userElement.querySelector(".card__image");
    const likeButton = userElement.querySelector(".card__like-button");
  
    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name; 
  
    
    cardImage.addEventListener("click", () => {
      onImageClick(data.link, data.name); 
    });
  
  
    likeButton.addEventListener("click", () => {
      onLike(likeButton);
    });
  
    const deleteButton = userElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      onDelete(userElement);
    });
  
    return userElement;
  }
  
  export function deleteCard(userElement) {
    userElement.remove();
  }
  
 
  export function handleLike(likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
  }