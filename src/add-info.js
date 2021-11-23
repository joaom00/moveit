const notAddButon = document.querySelector(".not-add-button");
const form = document.querySelector("form");
const inputName = document.querySelector(".input-name");
const inputLink = document.querySelector(".input-link");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  localStorage.setItem("@MoveIt:name", inputName.value);
  localStorage.setItem("@MoveIt:img", inputLink.value);
  if (window.location.origin === "https://joaom00.github.io") {
    window.location.href = "https://joaom00.github.io/moveit/";
  } else {
    window.location.pathname = "/index.html";
  }
});

notAddButon.addEventListener("click", () => {
  if (window.location.origin === "https://joaom00.github.io") {
    window.location.href = "https://joaom00.github.io/moveit/";
  } else {
    window.location.pathname = "/index.html";
  }
});
