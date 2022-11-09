const prepareComment = function (commentInfo) {
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

const renderBigPicture = function (photoInfo, thumbnailLikes, likeStatus) {
  pictureBlock.classList.remove('hidden');
  body.classList.add('modal-open');

  image.src = photoInfo.url;
  image.alt = photoInfo.description;
  description.textContent = photoInfo.description;
  likes.textContent = photoInfo.likes;
  commentsCount.textContent = photoInfo.comments.length;

  picture.querySelector('.social__comment-count').classList.add('hidden');
  picture.querySelector('.comments-loader').classList.add('hidden');

  comments.innerHTML = '';
  photoInfo.comments.forEach((comment) => {
    comments.appendChild(prepareComment(comment));
  });

  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    body.classList.remove('modal-open');
    pictureBlock.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      body.classList.remove('modal-open');
      pictureBlock.classList.add('hidden');
    }
  });

  const likeListener = () => {
    if (!likeStatus.value()) {
      photoInfo.likes += 1;
      likeStatus.switchLike();
    }
    else {
      photoInfo.likes -= 1;
      likeStatus.switchLike();
    }
    likes.textContent = photoInfo.likes;
    thumbnailLikes.textContent = photoInfo.likes;
  };

  if (typeof likes.onclick === 'function') {
    likes.removeAttribute('onclick');
  }
  likes.onclick = likeListener;
};

export{renderBigPicture};
