
const data = document.querySelector("#inputData");
const contentItem = document.querySelector("#content");

const addItem = () => {
  if (data.value) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
                 ${data.value}
                 <i class="fa-solid fa-xmark">
            `;
    data.value = "";
    listItem.addEventListener("click", () => {
      listItem.classList.toggle("done");
    });

    listItem.querySelector("i").addEventListener("click", () => {
      listItem.remove();
    });
    contentItem.prepend(listItem);
  }
};