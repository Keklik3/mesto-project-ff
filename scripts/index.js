// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const placesList = document.querySelector(".places__list");

function createCard(data, onDelete) {
  const userTemplate = document.querySelector("#card-template").content;
  const userElement = userTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardTitle = userElement.querySelector(".card__title");
  const cardImage = userElement.querySelector(".card__image");
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name; 

  const deleteButton = userElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    onDelete(userElement);
  });
  return userElement;
}

function deleteCard(userElement) {
  userElement.remove();
}

initialCards.forEach(function (cardData) {
  const card = createCard(cardData, deleteCard);
  placesList.appendChild(card);
});
