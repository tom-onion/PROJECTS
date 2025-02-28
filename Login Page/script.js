
const form = document.querySelector("form"),
  eField = form.querySelector(".email"),
  eInput = eField.querySelector("input"),
  pField = form.querySelector(".password"),
  pInput = pField.querySelector("input");

form.onsubmit = (e) => {
  e.preventDefault();

  if (eInput.value === "") {
    setError(eField, "Email can't be blank");
  } else {
    checkEmail();
  }

  if (pInput.value === "") {
    setError(pField, "Password can't be blank");
  }

  setTimeout(() => {
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 500);

  function checkEmail() {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!eInput.value.match(pattern)) {
      setError(eField, "Enter a valid email address");
    } else {
      removeError(eField);
    }
  }

  pInput.onkeyup = () => {
    if (pInput.value === "") {
      setError(pField, "Password can't be blank");
    } else {
      removeError(pField);
    }
  };

  if (
    !eField.classList.contains("error") &&
    !pField.classList.contains("error")
  ) {
    window.location.href = "#";
  }
};

function setError(field, message) {
  field.classList.add("shake", "error");
  let errorTxt = field.querySelector(".error-txt");
  errorTxt.innerText = message;
}

function removeError(field) {
  field.classList.remove("shake", "error");
  let errorTxt = field.querySelector(".error-txt");
  errorTxt.innerText = "";
}
