const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const createThumbnail = function(description) {
  const picture = template.cloneNode(true);
  picture.querySelector('.picture__img').src = description.url;
  const info = picture.querySelector('.picture__info');
  info.querySelector('.picture__likes').textContent = description.likes;
  info.querySelector('.picture__comments').textContent = description.comments.length;
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
