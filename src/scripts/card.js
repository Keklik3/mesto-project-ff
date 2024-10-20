export function createCard(data, deleteCard, onLike, onImageClick, userId) {
  const userTemplate = document.querySelector("#card-template").content;
  const userElement = userTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardTitle = userElement.querySelector(".card__title");
  const cardImage = userElement.querySelector(".card__image");
  const deleteButton = userElement.querySelector(".card__delete-button");
  const likeButton = userElement.querySelector(".card__like-button");
  const likeCounter = userElement.querySelector(".card__likes-count");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  likeCounter.textContent = data.likes.length;

  if (data.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", (evt) => deleteCard(evt, data));
  }

  if (data.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => {
    onImageClick(data.link, data.name);
  });

  likeButton.addEventListener("click", (evt) =>
    onLike(evt, data, userId, likeCounter)
  );

  return userElement;
}

export function onDelete(userElement) {
  userElement.target.closest(".places__item").remove();
}

export function handleLike(userElement) {
  if (userElement.target.classList.contains("card__like-button")) {
    userElement.target.classList.toggle("card__like-button_is-active");
  }
}
