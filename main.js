const yourName = "name";
function display(text) {
    console.log(text);
}
display(yourName);

const button = document.querySelector(".comments__select-button");
const form = document.querySelector(".comments__select-menu");

button.addEventListener("click", () => {
    console.log("Clicked");
    form.classList.toggle("comments__select-menu_state_displayed");
});