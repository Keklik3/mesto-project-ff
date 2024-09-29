// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { initialCards } from "./scripts/cards";
import "./pages/index.css";
import { openModal, closeModal } from "./scripts/modal";
import { createCard, deleteCard, handleLike } from "./scripts/card";

const placesListElement = document.querySelector(".places__list");
const imagePopupElement = document.querySelector(".popup_type_image");
const imageElement = imagePopupElement.querySelector(".popup__image");
const captionElement = imagePopupElement.querySelector(".popup__caption");
const popupEditProfileElement = document.querySelector(".popup_type_edit");
const popupNewCardElement = document.querySelector(".popup_type_new-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardForm = popupNewCardElement.querySelector(".popup__form");
const placeNameInput = cardForm.querySelector(".popup__input_type_card-name");
const linkInput = cardForm.querySelector(".popup__input_type_url");

function openImagePopup(link, name) {
  imageElement.src = link;
  imageElement.alt = name;
  captionElement.textContent = name;
  openModal(imagePopupElement);
}

function addCard(data, onDelete, onLike, onImageClick) {
  const newCard = createCard(data, onDelete, onLike, onImageClick);
  placesListElement.prepend(newCard);
}

initialCards.forEach((cardData) => {
  addCard(cardData, deleteCard, handleLike, openImagePopup);
});

profileEditButton.addEventListener("click", () => {
  openModal(popupEditProfileElement);
});

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  addCard(newCardData, deleteCard, handleLike, openImagePopup);
  closeModal(popupNewCardElement);
  cardForm.reset();
});

addButton.addEventListener("click", () => {
  openModal(popupNewCardElement);
});

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  const nameElement = document.querySelector(".profile__title");
  const jobElement = document.querySelector(".profile__description");
  nameElement.textContent = newName;
  jobElement.textContent = newJob;
  const popupElement = document.querySelector(".popup_type_edit");
  popupElement.classList.remove("popup_is-opened");
}

formElement.addEventListener("submit", handleFormSubmit);
