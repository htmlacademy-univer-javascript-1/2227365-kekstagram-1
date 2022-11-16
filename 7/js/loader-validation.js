const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionInput = imgUploadForm.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

const validateDescription = function (value) {
  return value.length <= 140;
};

const validateHashtags = (value) => {
  let correct = true;
  if (value === '') {
    return true;
  }
  const hashtags = value.split(' ');
  if (hashtags.length > 5) {
    return false;
  }

  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  hashtags.forEach((hashtag) => {
    if (!re.test(hashtag)) {
      correct = false;
    }
  });
  return correct;
};

pristine.addValidator(
  textDescriptionInput,
  validateDescription,
  'Не более 140 символов'
);

pristine.addValidator(
  textHashtagsInput,
  validateHashtags,
  'Верный формат: #hashtag (не более 20 симв.), хэштеги разделены пробелами, не более 5 хэштегов'
);

export {pristine};
