import {openModal, closeModal} from './util.js';
import {pristine} from './loader-validation.js';
import { sendData } from './api.js';
import { picture, enableScaleChanger, disnableScaleChanger, enableEffectPreview, disableEffectPreview, resetEffect} from './photo-editor.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const closeButton = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionInput = imgUploadForm.querySelector('.text__description');
const uploadSubmitButton = imgUploadForm.querySelector('.img-upload__submit');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('section');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('section');

const closeOverlay = () => {
  closeModal(imgUploadOverlay, body);
  closeButton.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', escHandler);
  textHashtagsInput.removeEventListener('keydown', fieldKeydownHandler);
  textDescriptionInput.removeEventListener('keydown', fieldKeydownHandler);
  imgUploadForm.removeEventListener('submit', formSubmitHandler);
  disableEffectPreview();
  disnableScaleChanger();
};

const blockSubmitButton = () => {
  uploadSubmitButton.setAttribute('disabled', 'disabled');
};

const unBlockSubmitButton = () => {
  uploadSubmitButton.removeAttribute('disabled');
};

const showLoadError = () => {
  const message = errorTemplate.cloneNode(true);
  body.appendChild(message);
  document.addEventListener('keydown', documentKeydownHandler);
  message.addEventListener('click', alertClickHandler);
  const closeMessage = () => {
    message.removeEventListener('click', alertClickHandler);
    message.remove();
    document.removeEventListener('keydown', documentKeydownHandler);
  };
  function documentKeydownHandler(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }
  function alertClickHandler(evt) {
    if (evt.target.tagName !== 'DIV' && evt.target.tagName !== 'H2'){
      closeMessage();
    }
  }
};

const showLoadSuccess = () => {
  const message = successTemplate.cloneNode(true);
  body.appendChild(message);
  document.addEventListener('keydown', documentKeydownHandler);
  message.addEventListener('click', alertClickHandler);
  const closeMessage = () => {
    message.removeEventListener('click', alertClickHandler);
    message.remove();
    document.removeEventListener('keydown', documentKeydownHandler);
  };
  function documentKeydownHandler(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }
  function alertClickHandler(evt) {
    if (evt.target.tagName !== 'DIV' && evt.target.tagName !== 'H2'){
      closeMessage();
    }
  }
};

function fieldKeydownHandler(evt) {
  evt.stopPropagation();
}

function closeButtonClickHandler() {
  closeOverlay();
  resetEffect();
}

function escHandler(evt) {
  if (evt.key === 'Escape') {
    closeOverlay();
    resetEffect();
  }
}

const renderImageEditor = () => {
  openModal(imgUploadOverlay, body);
  textHashtagsInput.addEventListener('keydown', fieldKeydownHandler);
  textDescriptionInput.addEventListener('keydown', fieldKeydownHandler);
  closeButton.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', escHandler);
  imgUploadForm.addEventListener('submit', formSubmitHandler);
  enableEffectPreview();
  enableScaleChanger();
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(
      () => {
        unBlockSubmitButton();
        closeOverlay();
        showLoadSuccess();
        resetEffect();
      },
      () => {
        unBlockSubmitButton();
        closeOverlay();
        showLoadError();
        uploadFile.value = '';
      },
      new FormData(imgUploadForm)
    );
  }
}

uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  if (FILE_TYPES.some((type) => fileName.endsWith(type))) {
    picture.src = URL.createObjectURL(file);
    renderImageEditor();
  }
  else {
    showLoadError();
  }
});
