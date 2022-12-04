import { renderBigPicture } from './big-picture-render.js';

const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const thumbnailsBlock = document.querySelector('.pictures');


const createThumbnail = (photoInfo) => {
  const picture = template.cloneNode(true);
  picture.querySelector('.picture__img').src = photoInfo.url;
  picture.querySelector('.picture__img').alt = photoInfo.description;
  const likes = picture.querySelector('.picture__likes');
  const commentsCount = picture.querySelector('.picture__comments');
  likes.textContent = photoInfo.likes;
  commentsCount.textContent = photoInfo.comments.length;
  return picture;
};

const thumbnailDict = new Map();

const renderThumbnails = (descriptions) => {
  const thumbnailsFragment = document.createDocumentFragment();
  descriptions.forEach((description) => {
    const thumbnail = createThumbnail(description);
    thumbnailDict.set(thumbnail, description);
    thumbnailsFragment.appendChild(thumbnail);
  });
  thumbnailsBlock.appendChild(thumbnailsFragment);
};

thumbnailsBlock.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('a');
  if (!thumbnail) {
    return;
  }
  if (!thumbnailsBlock.contains(thumbnail)) {
    return;
  }
  renderBigPicture(thumbnailDict.get(thumbnail));
});

const renderLoadError = (message) => {
  const error = document.createElement('div');
  error.classList.add('error-load');
  error.textContent = message;
  thumbnailsBlock.appendChild(error);
};

export {renderThumbnails, renderLoadError};
