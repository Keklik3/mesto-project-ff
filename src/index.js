// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { initialCards } from "./scripts/cards";
import "./pages/index.css";
import { TurnValidation, configForm } from "./scripts/modal";

TurnValidation(configForm);

const placesList = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
const imageElement = imagePopup.querySelector(".popup__image");
const captionElement = imagePopup.querySelector(".popup__caption");

export function createCard(data, onDelete, onLike, onImageClick) {
  const userTemplate = document.querySelector("#card-template").content;
  const userElement = userTemplate
    .querySelector(".places__item")
    .cloneNode(true);
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

function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function openImagePopup(link, name) {
  imageElement.src = link;
  imageElement.alt = name;
  captionElement.textContent = name;
  imagePopup.classList.add("popup_is-opened");
}

function addCard(data, onDelete, onLike, onImageClick) {
  const newCard = createCard(data, onDelete, onLike, onImageClick);
  placesList.prepend(newCard);
}

initialCards.forEach((cardData) => {
  addCard(cardData, deleteCard, handleLike, openImagePopup);
});

const profileEditButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const cardForm = popupNewCard.querySelector(".popup__form");
const placeNameInput = cardForm.querySelector(".popup__input_type_card-name");
const linkInput = cardForm.querySelector(".popup__input_type_url");

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  addCard(newCardData, deleteCard, handleLike, openImagePopup);
  popupNewCard.classList.remove("popup_is-opened");
  cardForm.reset();
});

profileEditButton.addEventListener("click", () => {
  popup.classList.add("popup_is-opened");
});

popup.addEventListener("click", (evt) => {
  if (evt.target === popup) {
    popup.classList.remove("popup_is-opened");
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    popup.classList.remove("popup_is-opened");
    popupNewCard.classList.remove("popup_is-opened");
    imagePopup.classList.remove("popup_is-opened");
  }
});

addButton.addEventListener("click", () => {
  popupNewCard.classList.add("popup_is-opened");
});

popupNewCard.addEventListener("click", (evt) => {
  if (evt.target === popupNewCard) {
    popupNewCard.classList.remove("popup_is-opened");
  }
});

imagePopup.addEventListener("click", (evt) => {
  if (evt.target === imagePopup) {
    imagePopup.classList.remove("popup_is-opened");
  }
});

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    if (popup) {
      popup.classList.remove("popup_is-opened");
    }
  });
});
