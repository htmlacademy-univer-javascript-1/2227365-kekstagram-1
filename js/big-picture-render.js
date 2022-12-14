import {openModal, closeModal} from './util.js';

const COMMENTS_PER_LOAD = 5;

const pictureBlock = document.querySelector('.big-picture');
const body = document.querySelector('body');
const picture = pictureBlock.querySelector('.big-picture__preview');
const image = picture.querySelector('.big-picture__img').querySelector('img');
const likes = picture.querySelector('.likes-count');
const shownCount = picture.querySelector('.shown-count');
const commentsLoader = picture.querySelector('.comments-loader');
const comments = picture.querySelector('.social__comments');
const description = picture.querySelector('.social__caption');
const commentsCount = picture.querySelector('.comments-count');
const closeButton = picture.querySelector('.big-picture__cancel');

let shownCommentsCount = 0;
let loaderClickHandler = null;

const prepareComment = (commentInfo) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = commentInfo.avatar;
  avatar.alt = commentInfo.name;
  avatar.style.width = '35px';
  avatar.style.height = '35px';
  comment.appendChild(avatar);

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = commentInfo.message;
  comment.appendChild(text);
  return comment;
};

const showNComments = (number, commentObjs) => {
  const hiddenCount = commentObjs.length - shownCommentsCount;
  const toShowCount = hiddenCount >= number ? number : hiddenCount;
  for (let i = shownCommentsCount; i < shownCommentsCount + toShowCount; i++) {
    comments.appendChild(prepareComment(commentObjs[i]));
  }
  shownCommentsCount += toShowCount;
  if ((shownCommentsCount === commentObjs.length) !== commentsLoader.classList.contains('hidden')) {
    commentsLoader.classList.toggle('hidden');
  }
  shownCount.textContent = shownCommentsCount;
};

const fillModal = (photoInfo) => {
  image.src = photoInfo.url;
  image.alt = photoInfo.description;
  description.textContent = photoInfo.description;
  likes.textContent = photoInfo.likes;
  commentsCount.textContent = photoInfo.comments.length;
  comments.innerHTML = '';
  showNComments(COMMENTS_PER_LOAD, photoInfo.comments);
};

const closeBigPicture = () => {
  closeModal(pictureBlock, body);
  shownCommentsCount = 0;
  commentsLoader.removeEventListener('click', loaderClickHandler);
  closeButton.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', escHandler);
};

function escHandler(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

function closeButtonClickHandler(evt) {
  evt.preventDefault();
  closeBigPicture();
}

const renderBigPicture = (photoInfo) => {
  loaderClickHandler = (evt) => {
    evt.preventDefault();
    showNComments(COMMENTS_PER_LOAD, photoInfo.comments);
  };

  openModal(pictureBlock, body);
  fillModal(photoInfo);

  commentsLoader.addEventListener('click', loaderClickHandler);
  closeButton.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', escHandler);
};

export{renderBigPicture};
