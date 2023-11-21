class SubmitForm {
    constructor(formId, mainCommentContainerId, commentElement = "", userImg = "", userName = "", commentText = "", commentDate = 0, comments = [], commentElements = "") {
        this.formId = formId;
        this.mainCommentContainerId = mainCommentContainerId;
        this.commentElement = commentElement;
        this.userImg = userImg;
        this.userName = userName;
        this.commentText = commentText;
        this.commentDate = commentDate;
        this.comments = comments;
        this.commentElements = commentElements;
        this.formId = formId;
        this.mainCommentContainerId = mainCommentContainerId;
        this.commentElement = commentElement;
        this.userImg = userImg;
        this.userName = userName;
        this.commentText = commentText;
        this.commentDate = commentDate;
        this.comments = comments;
        this.commentElements = commentElements;
    }
    getData() {
        const mainSubmitForm = document.getElementById(this.formId);
        const imageElement = mainSubmitForm.querySelector(".comments__user-img");
        const userNameElement = mainSubmitForm.querySelector(".comments__user-name");
        const textsreaElement = mainSubmitForm.querySelector(".comments__add-comment-textarea");
        this.userImg = imageElement.src;
        this.userName = userNameElement.textContent;
        this.commentText = textsreaElement.value;
        this.commentDate = Math.floor(Date.now() / 100);
        const comment = {
            userImg: this.userImg,
            userName: this.userName,
            commentText: this.commentText,
            commentDate: this.commentDate
        };
        this.comments.unshift(comment);
        return this.comments;
    }
    addEvent() {
        const mainSubmitForm = document.getElementById(this.formId);
        const submitButton = mainSubmitForm === null || mainSubmitForm === void 0 ? void 0 : mainSubmitForm.querySelector(".comments__add-comment-button");
        submitButton.addEventListener('click', () => {
            this.getData();
            this.postComment();
            this.commentElements = "";
        });
    }
    postComment() {
        const mainCommentContainer = document.querySelector(this.mainCommentContainerId);
        this._fillElements();
        mainCommentContainer.innerHTML = this.commentElements;
    }
    _fillElements() {
        this.comments.forEach((comment) => {
            const commentElement = `<div class="comments__main-comment">
      <img class="comments__user-img" src="${comment.userImg}" alt="фото пользователя">
      <p class="comments__user-name">${comment.userName}</p>
      <p class="comments__date">${comment.commentDate}</p>
      <p class="comments__comment-txt">${comment.commentText}</p>
      <div class="comments__comment-panel">
        <button class="comments__comment-btn" type="button">
          <img class="comments__comment-reply-img" src="./Images/reply_button.png" alt="кнопка ответа на главный комментарий">
          Ответить
        </button>
        <button class="comments__comment-btn" type="button">
          <img class="comments__comment-fav-img" src="./Images/fav_button_unselected.png" alt="в избранное">
          В избранное
        </button>
        <div class="comments__likes-container">
          <button class="comments__likes-btn">
            <img class="comments__likes-btn-img" src="./Images/minus_img.png" alt="">
          </button>
          <p class="comments__likes-number">6</p>
          <button class="comments__likes-btn">
            <img class="comments__likes-btn-img" src="./Images/plus_img.png" alt="">
          </button>
        </div>
      </div>
      </div>`;
            this.commentElements += commentElement;
        });
        return this.commentElements;
    }
}
const mainCommentsForm = new SubmitForm("addCommentForm", ".comments__display-container");
mainCommentsForm.addEvent();
const button = document.querySelector('.comments__select-button');
const form = document.querySelector('.comments__select-menu');
if (button != null && form != null) {
    button.addEventListener('click', () => {
        console.log('Clicked');
        form.classList.toggle('comments__select-menu_state_displayed');
    });
}
function autoExpand(textarea) {
    const button_1 = document.querySelector('.comments__add-comment-button');
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    console.log(textarea.value);
    if (textarea.value.length > 0) {
        button_1.classList.remove('comments__add-comment-button_type_disabled');
        button_1.removeAttribute('disabled');
        button_1.classList.add('comments__add-comment-button_type_enabled');
    }
    else if (textarea.value.length === 0 || textarea.value.length > 1000) {
        button_1.classList.remove('comments__add-comment-button_type_enabled');
        button_1.setAttribute('disabled', '');
        button_1.classList.add('comments__add-comment-button_type_disabled');
    }
}
const addCommentForm = document.getElementById('addCommentForm');
const addCommentTextarea = addCommentForm.querySelector(".comments__add-comment-textarea");
addCommentTextarea.addEventListener('input', function () {
    autoExpand(addCommentTextarea);
});
//export {};
//# sourceMappingURL=main.js.map