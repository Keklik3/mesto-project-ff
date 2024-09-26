export function checkInputValid(inputElements) {
  return [...inputElements].every((inputEl) => inputEl.validity.valid);
}

export function buttonState(buttonSubmit, isActive) {
  if (isActive) {
    buttonSubmit.disabled = false;
  } else {
    buttonSubmit.disabled = "disabled";
  }
}

export function SetEvt(popupElement, config) {
  const findInput = popupElement.querySelectorAll(config.inputSelector);
  const buttonSubmit = popupElement.querySelector(config.submitButtonSelector);
  buttonState(buttonSubmit, checkInputValid(findInput));
  [...findInput].forEach(function (inputEl) {
    inputEl.addEventListener("input", function () {
      buttonState(buttonSubmit, checkInputValid(findInput));
    });
  });
  popupElement.addEventListener("submit", function (event) {
    event.preventDefault();
  });
}

export function TurnValidation(config) {
  const PopupForms = document.querySelectorAll(config.formSelector);
  [...PopupForms].forEach(function (popupElement) {
    SetEvt(popupElement, config);
  });
}

export const configForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
};

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
