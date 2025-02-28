

const getColor = () => {
  const randomNumber = Math.floor(Math.random() * 16777215);
  const randomCode = "#" + randomNumber.toString(16);
  document.body.style.backgroundColor = randomCode;
  document.getElementById("color_code").innerText = randomCode;

  const icon = document.getElementById("icon");
  if (icon.classList.contains("fas")) {
    icon.classList.replace("fas", "far");
  }
};

const copyColor = () => {
  const colorCode = document.getElementById("color_code").innerText;
  navigator.clipboard.writeText(colorCode).then(() => {
    const icon = document.getElementById("icon");
    if (icon.classList.contains("far")) {
      icon.classList.replace("far", "fas");
    }
  });
};

document.getElementById("btn").addEventListener("click", getColor);
document.getElementById("icon").addEventListener("click", copyColor);

getColor();

