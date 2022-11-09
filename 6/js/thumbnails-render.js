import { renderBigPicture } from './big-picture-render.js';

const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const createThumbnail = function(photoInfo) {
  const picture = template.cloneNode(true);
  picture.querySelector('.picture__img').src = photoInfo.url;
  picture.querySelector('.picture__img').alt = photoInfo.description;
  const likes = picture.querySelector('.picture__likes');
  const commentsCount = picture.querySelector('.picture__comments');
  likes.textContent = photoInfo.likes;
  commentsCount.textContent = photoInfo.comments.length;
  const LikeStatus = (function() {
    let isLiked = false;
    function switchLike() {
      if (isLiked) {
        isLiked = false;
      }
      else {
        isLiked = true;
      }
    }
    return {
      switchLike: () => {
        switchLike();
      },
      value: () => isLiked
    };
  });
  const likeStatus = LikeStatus();
  picture.onclick = function() {
    renderBigPicture(photoInfo, likes, likeStatus);
  };
  return picture;
};

const renderThumbnails = function(descriptions) {
  const thumbnailsBlock = document.querySelector('.pictures');
  const thumbnailsFragment = document.createDocumentFragment();
  descriptions.forEach((description) => {
    thumbnailsFragment.appendChild(createThumbnail(description));
  });
  thumbnailsBlock.appendChild(thumbnailsFragment);
};

export {renderThumbnails};
