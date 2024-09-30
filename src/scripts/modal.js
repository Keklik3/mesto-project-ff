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
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}
