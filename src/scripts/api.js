function handleResponse(res, err) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(err);
}

const fetchProfile = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-24/users/me", {
    method: "GET",
    headers: {
      authorization: "f8686eac-6955-4da2-a5e8-dda653563f6c",
      "Content-Type": "application/json",
    },
  }).then((res) => handleResponse(res, `Ошибка: ${res.status}`));
};

const fetchCards = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-24/cards", {
    method: "GET",
    headers: {
      authorization: "f8686eac-6955-4da2-a5e8-dda653563f6c",
      "Content-Type": "application/json",
    },
  }).then((res) => handleResponse(res, `Ошибка: ${res.status}`));
};

const updateProfile = (name, about) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-24/users/me", {
    method: "PATCH",
    headers: {
      authorization: "f8686eac-6955-4da2-a5e8-dda653563f6c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => handleResponse(res, `Ошибка: ${res.status}`));
};

const postCard = (cardData) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-24/cards", {
    method: "POST",
    headers: {
      authorization: "f8686eac-6955-4da2-a5e8-dda653563f6c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  }).then((res) => handleResponse(res, `Ошибка: ${res.status}`));
};

const deleteCardRequest = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-24/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "f8686eac-6955-4da2-a5e8-dda653563f6c",
      "Content-Type": "application/json",
    },
  }).then((res) => handleResponse(res, `Ошибка: ${res.status}`));
};

const likeCardRequest = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-24/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "f8686eac-6955-4da2-a5e8-dda653563f6c",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => handleResponse(res, `Ошибка: ${res.status}`));
};

const unlikeCard = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-24/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "f8686eac-6955-4da2-a5e8-dda653563f6c",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => handleResponse(res, `Ошибка: ${res.status}`));
};

const avatarRequest = (link) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-24/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "f8686eac-6955-4da2-a5e8-dda653563f6c",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => handleResponse(res, `Ошибка: ${res.status}`));
};

export {
  fetchProfile,
  fetchCards,
  updateProfile,
  postCard,
  deleteCardRequest,
  likeCardRequest,
  unlikeCard,
  avatarRequest,
};
