import {openModal, closeModal} from './util.js';

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

const pictureBlock = document.querySelector('.big-picture');
const body = document.querySelector('body');
const picture = pictureBlock.querySelector('.big-picture__preview');
const image = picture.querySelector('.big-picture__img').querySelector('img');
const likes = picture.querySelector('.likes-count');
const comments = picture.querySelector('.social__comments');
const description = picture.querySelector('.social__caption');
const commentsCount = picture.querySelector('.comments-count');
const closeButton = picture.querySelector('.big-picture__cancel');

const fillModal = (photoInfo) => {
  image.src = photoInfo.url;
  image.alt = photoInfo.description;
  description.textContent = photoInfo.description;
  likes.textContent = photoInfo.likes;
  commentsCount.textContent = photoInfo.comments.length;
  comments.innerHTML = '';
  photoInfo.comments.forEach((comment) => {
    comments.appendChild(prepareComment(comment));
  });
};

const closeBigPicture = () => {
  closeModal(pictureBlock, body);
  closeButton.removeEventListener('click', closeButtonListener);
  document.removeEventListener('keydown', escListener);
};

function escListener(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

function closeButtonListener(evt) {
  evt.preventDefault();
  closeBigPicture();
}

const renderBigPicture = (photoInfo) => {
  openModal(pictureBlock, body);
  fillModal(photoInfo);

  picture.querySelector('.social__comment-count').classList.add('hidden');
  picture.querySelector('.comments-loader').classList.add('hidden');

  closeButton.addEventListener('click', closeButtonListener);
  document.addEventListener('keydown', escListener);
};

export{renderBigPicture};
