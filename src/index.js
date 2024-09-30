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
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");
const cardForm = popupNewCardElement.querySelector(".popup__form");
const placeNameInput = cardForm.querySelector(".popup__input_type_card-name");
const linkInput = cardForm.querySelector(".popup__input_type_url");
const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");

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
  const nameInput = popupEditProfileElement.querySelector(
    ".popup__input_type_name"
  );
  const descriptionInput = popupEditProfileElement.querySelector(
    ".popup__input_type_description"
  );
  nameInput.value = nameElement.textContent;
  descriptionInput.value = jobElement.textContent;
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

buttonOpenAddCardForm.addEventListener("click", () => {
  openModal(popupNewCardElement);
});

const formEditProfile = document.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);

function submitEditProfileForm(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  nameElement.textContent = newName;
  jobElement.textContent = newJob;
  closeModal(popupEditProfileElement);
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popupElement = evt.target.closest(".popup");
    if (popupElement) {
      closeModal(popupElement);
    }
  });
});
