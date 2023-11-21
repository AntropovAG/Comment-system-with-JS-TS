interface commentsData {
  userImg: string;
  userName: string;
  commentText: string;
  commentDate: number;
}

class SubmitForm {

  constructor(
    public formId: string,
    public mainCommentContainerId: string,
    public commentElement: string = "",
    public userImg: string = "",
    public userName: string = "",
    public commentText: string = "",
    public commentDate: number = 0,
    public comments: commentsData[] = [],
    public commentElements: string = "",
  ) {
    this.formId = formId;
    this.mainCommentContainerId = mainCommentContainerId;
    this.commentElement = commentElement;
    this.userImg = userImg;
    this.userName = userName;
    this.commentText = commentText;
    this.commentDate = commentDate;
    this.comments = comments;
    this.commentElements = commentElements
  }

  getData() {
    const mainSubmitForm: HTMLFormElement = document.getElementById(this.formId) as HTMLFormElement;
    const imageElement: HTMLImageElement = mainSubmitForm.querySelector(".comments__user-img") as HTMLImageElement;
    const userNameElement: HTMLElement = mainSubmitForm.querySelector(".comments__user-name") as HTMLElement;
    const textsreaElement: HTMLTextAreaElement = mainSubmitForm.querySelector(".comments__add-comment-textarea") as HTMLTextAreaElement; 

    this.userImg = imageElement.src;
    this.userName = userNameElement.textContent!;
    this.commentText = textsreaElement.value;
    this.commentDate = Math.floor(Date.now() / 100);

    const comment = {
      userImg: this.userImg,
      userName: this.userName,
      commentText: this.commentText,
      commentDate: this.commentDate
    }
    this.comments.unshift(comment);
    return this.comments
  }
  
  addEvent() {
    const mainSubmitForm = document.getElementById(this.formId);
    const submitButton: HTMLButtonElement = mainSubmitForm?.querySelector(".comments__add-comment-button") as HTMLButtonElement;
    submitButton.addEventListener('click', () => {
      this.getData();
      this.postComment();
      this.commentElements = "";})

  }

  postComment() {
    const  mainCommentContainer: HTMLElement = document.querySelector(this.mainCommentContainerId) as HTMLElement;
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
      </div>`
      this.commentElements += commentElement;
    })
    return this.commentElements
  }

}

const mainCommentsForm = new SubmitForm("addCommentForm", ".comments__display-container");
mainCommentsForm.addEvent();


const button: HTMLButtonElement | null = document.querySelector('.comments__select-button');
const form: HTMLFormElement | null = document.querySelector('.comments__select-menu');

if (button != null && form != null) {
  button.addEventListener('click', () => {
    console.log('Clicked');
    form.classList.toggle('comments__select-menu_state_displayed');
  });
}

function autoExpand(textarea: HTMLTextAreaElement) {
  const button_1: HTMLButtonElement = document.querySelector('.comments__add-comment-button') as HTMLButtonElement;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
  console.log(textarea.value);
  if (textarea.value.length > 0) {
    button_1.classList.remove('comments__add-comment-button_type_disabled');
    button_1.removeAttribute('disabled');
    button_1.classList.add('comments__add-comment-button_type_enabled');
  } else if (textarea.value.length === 0 || textarea.value.length > 1000) {
    button_1.classList.remove('comments__add-comment-button_type_enabled');
    button_1.setAttribute('disabled', '');
    button_1.classList.add('comments__add-comment-button_type_disabled');
  }
}
const addCommentForm: HTMLFormElement = document.getElementById('addCommentForm') as HTMLFormElement;
const addCommentTextarea: HTMLTextAreaElement = addCommentForm.querySelector(".comments__add-comment-textarea") as HTMLTextAreaElement;

addCommentTextarea.addEventListener('input', function () {
  autoExpand(addCommentTextarea);
});

