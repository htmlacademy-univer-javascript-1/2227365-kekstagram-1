import { renderBigPicture } from './big-picture-render.js';
import { getNonRepeatingRandoms } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const thumbnailsBlock = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');

const compareByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const filters = {
  filterDefault: (photos) => photos,
  filterRandom: (photos) => {
    const result = [];
    let numbers = [];
    if (photos.length >= 10) {
      numbers = getNonRepeatingRandoms(0, photos.length - 1, RANDOM_PHOTOS_COUNT, []);
    }
    else {
      numbers = getNonRepeatingRandoms(0, photos.length - 1, photos.length, []);
    }
    numbers.forEach((number) => {
      result.push(photos[number]);
    });
    return result;
  },
  filterDiscussed: (photos) => photos.sort(compareByComments)
};

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

const clearThumbnails = () => {
  const thumbnails = thumbnailsBlock.querySelectorAll('.picture');
  if (thumbnails.length !== 0) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.remove();
    });
  }
};

const renderThumbnails = (descriptions) => {
  clearThumbnails();
  const filter = imgFilters
    .querySelector('.img-filters__button--active')
    .id
    .replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  const thumbnailsFragment = document.createDocumentFragment();
  filters[filter](descriptions.slice())
    .forEach((description) => {
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

const applyFilters = (callback) => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', (evt) => {
    const current = imgFilters.querySelector('.img-filters__button--active');
    const target = evt.target;
    if (target.tagName !== 'BUTTON' || target === current) {
      return;
    }
    current.classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');
    callback();
  });
};

export {renderThumbnails, renderLoadError, applyFilters};
