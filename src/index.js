// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import "./pages/index.css";
import { openModal, closeModal } from "./scripts/modal";
import { createCard, onDelete, handleLike } from "./scripts/card";
import { enableValidation, clearValidation } from "./scripts/validation";
import {
  fetchProfile,
  fetchCards,
  updateProfile,
  postCard,
  deleteCardRequest,
  likeCardRequest,
  unlikeCard,
  avatarRequest,
} from "./scripts/api";

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
const profileImage = document.querySelector(".profile__image");
const formEditProfile = document.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const popups = document.querySelectorAll(".popup");
const profileSettings = {};
const avatarPopup = document.querySelector(".popup__avatar");
const avatarEditButton = avatarPopup.querySelector(".popup__button");
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

Promise.all([fetchProfile(), fetchCards()]).then(([resProfile, resCards]) => {
  profileRender(resProfile);
  renderInitialCards(resCards);
});

function profileRender(profileInfo) {
  profileSettings.id = profileInfo._id;
  profileSettings.title = profileInfo.name;
  profileSettings.about = profileInfo.about;
  profileSettings.avatar = profileInfo.avatar;
  nameInput.textContent = profileSettings.title;
  jobElement.textContent = profileSettings.about;
  profileImage.setAttribute(
    "style",
    `background-image: url(${profileSettings.avatar})`
  );
}

export function renderInitialCards(cardData) {
  Array.from(cardData).forEach((data) => {
    const newCard = createCard(
      data,
      deleteCard,
      onLike,
      onImageClick,
      profileSettings.id
    );
    placesListElement.prepend(newCard);
  });
}

formEditProfile.addEventListener("submit", (evt) => {
  const newName = nameInput.value;
  const newJob = jobInput.value;
  const button = document.querySelector(".popup__button");
  button.textContent = "Сохранение...";
  evt.preventDefault();
  updateProfile(newName, newJob)
    .then((res) => {
      nameInput.textContent = res.name;
      jobInput.textContent = res.about;
      closeModal(popupEditProfileElement);
    })
    .catch((err) => console.log(err))
    .finally(() => (button.textContent = "Сохранить"));
});

popups.forEach((el) => {
  el.classList.add("popup_is-animated");
});

function onImageClick(link, name) {
  imageElement.src = link;
  imageElement.alt = name;
  captionElement.textContent = name;
  openModal(imagePopupElement);
}

cardForm.addEventListener("submit", (evt) => {
  const button = document.querySelector(".popup__button");
  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  button.textContent = "Сохранение...";
  evt.preventDefault();
  postCard(newCardData)
    .then((res) => {
      const newCard = createCard(
        res,
        deleteCard,
        onLike,
        onImageClick,
        profileSettings.id
      );
      placesListElement.prepend(newCard);
      closeModal(popupNewCardElement);
      cardForm.reset();
      clearValidation(document.forms.avatar, validationConfig);
    })
    .catch((err) => console.log(err))
    .finally(() => (button.textContent = "Сохранить"));
});

function deleteCard(evt, cardData) {
  deleteCardRequest(cardData._id)
    .then(() => {
      onDelete(evt);
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
}

function onLike(evt, cardData, userId, likeCounter) {
  const likeHandler = cardData.likes.some((like) => like._id === userId)
    ? unlikeCard(cardData._id)
    : likeCardRequest(cardData._id);
  likeHandler
    .then((res) => {
      cardData.likes = res.likes;
      likeCounter.textContent = res.likes.length;
      handleLike(evt);
    })
    .catch((err) => console.log(err));
}

function changeAvatar(evt) {
  evt.preventDefault();
  const link = document.forms.avatar.link.value;
  const button = document.forms.avatar.button;
  button.textContent = "Сохранение...";
  avatarRequest(link)
    .then((res) => {
      profileImage.setAttribute(
        "style",
        "background-image: url(" + res.avatar + ")"
      );
      closePopup(avatarPopup);
      document.forms.avatar.reset();
      clearValidation(document.forms.avatar, validationConfig);
    })
    .catch((err) => console.log(err))
    .finally(() => (button.textContent = "Сохранить"));
}

profileEditButton.addEventListener("click", () => {
  const nameInput = popupEditProfileElement.querySelector(
    ".popup__input_type_name"
  );
  const jobElement = popupEditProfileElement.querySelector(
    ".popup__input_type_description"
  );
  nameInput.value = nameElement.textContent;
  jobElement.value = jobElement.textContent;
  openModal(popupEditProfileElement);
});

buttonOpenAddCardForm.addEventListener("click", () => {
  openModal(popupNewCardElement);
  clearValidation(cardForm, validationSettings);
});

profileImage.addEventListener("click", () => openModal(avatarPopup));
avatarEditButton.addEventListener("click", (evt) => changeAvatar(evt));

const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popupElement = evt.target.closest(".popup");
    if (popupElement) {
      closeModal(popupElement);
    }
  });
});

enableValidation(validationSettings);
