// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { initialCards } from "./scripts/cards";
import "./pages/index.css";
import { TurnValidation, configForm } from "./scripts/modal";
import { createCard, deleteCard, handleLike } from "./scripts/card";

TurnValidation(configForm);

const placesList = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
const imageElement = imagePopup.querySelector(".popup__image");
const captionElement = imagePopup.querySelector(".popup__caption");

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
