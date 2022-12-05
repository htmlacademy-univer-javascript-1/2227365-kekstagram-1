import {openModal, closeModal} from './util.js';
import {pristine} from './loader-validation.js';
import { sendData } from './api.js';
import { enableScaleChanger, disnableScaleChanger, enableEffectPreview, disableEffectPreview, resetEffect} from './photo-editor.js';

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
  closeButton.removeEventListener('click', closeButtonListener);
  document.removeEventListener('keydown', escListener);
  textHashtagsInput.removeEventListener('keydown', propagationStopper);
  textDescriptionInput.removeEventListener('keydown', propagationStopper);
  disableEffectPreview();
  disnableScaleChanger();
};

const blockSubmitButton = () => {
  uploadSubmitButton.setAttribute('disabled', 'disabled');
};

const unBlockSubmitButton = () => {
  uploadSubmitButton.removeAttribute('disabled', 'disabled');
};

const showLoadError = () => {
  const message = errorTemplate.cloneNode(true);
  body.appendChild(message);
  document.addEventListener('keydown', closeByEsc);
  const closeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', closeByEsc);
  };
  message.addEventListener('click', (evt) => {
    if (evt.target.tagName !== 'DIV' && evt.target.tagName !== 'H2'){
      closeMessage();
    }
  });
  function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }
};

const showLoadSuccess = () => {
  const message = successTemplate.cloneNode(true);
  body.appendChild(message);
  document.addEventListener('keydown', closeByEsc);
  const closeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', closeByEsc);
  };
  message.addEventListener('click', (evt) => {
    if (evt.target.tagName !== 'DIV' && evt.target.tagName !== 'H2'){
      closeMessage();
    }
  });
  function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }
};

function propagationStopper(evt) {
  evt.stopPropagation();
}

function closeButtonListener() {
  closeOverlay();
  resetEffect();
}

function escListener(evt) {
  if (evt.key === 'Escape') {
    closeOverlay();
    resetEffect();
  }
}

const renderImageEditor = () => {
  openModal(imgUploadOverlay, body);
  textHashtagsInput.addEventListener('keydown', propagationStopper);
  textDescriptionInput.addEventListener('keydown', propagationStopper);
  closeButton.addEventListener('click', closeButtonListener);
  document.addEventListener('keydown', escListener);
  enableEffectPreview();
  enableScaleChanger();
};

imgUploadForm.addEventListener('submit', (evt) => {
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
});

uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  renderImageEditor();
});
