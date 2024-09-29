export function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleEscClose);
  popupElement.addEventListener("click", handleOverlayClose);
}

export function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscClose);
  popupElement.removeEventListener("click", handleOverlayClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popupElement = evt.target.closest(".popup");
    if (popupElement) {
      closeModal(popupElement);
    }
  });
});
