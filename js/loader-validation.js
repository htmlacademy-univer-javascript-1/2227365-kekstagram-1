import {checkMaxLength} from './util.js';
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 5;
const REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

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

const validateDescription = (value) => checkMaxLength(value, MAX_DESCRIPTION_LENGTH);

const validateHashtagLength = (value) => value.split(' ').length <= MAX_HASHTAG_LENGTH;

const validateHashtagUninqueness = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagFormat = (value) => {
  if (value === '') {
    return true;
  }
  else {
    return value.split(' ').every((hashtag) => REGEX.test(hashtag));
  }
};

pristine.addValidator(
  textDescriptionInput,
  validateDescription,
  'Не более 140 символов'
);

pristine.addValidator(
  textHashtagsInput,
  validateHashtagLength,
  'Не больше 5 хэштегов'
);

pristine.addValidator(
  textHashtagsInput,
  validateHashtagUninqueness,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  textHashtagsInput,
  validateHashtagFormat,
  'Формат: #hashtag, длина не больше 20 символов, хэштеги разделены пробелами'
);

export {pristine};
