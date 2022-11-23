import {openModal, closeModal} from './util.js';
import {pristine} from './loader-validation.js';
import { enableScaleChanger, disnableScaleChanger, enableEffectPreview, disableEffectPreview} from './photo-editor.js';

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const closeButton = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionInput = imgUploadForm.querySelector('.text__description');

const closeOverlay = () => {
  closeModal(imgUploadOverlay, body);
  closeButton.removeEventListener('click', closeButtonListener);
  document.removeEventListener('keydown', escListener);
  textHashtagsInput.removeEventListener('keydown', propagationStopper);
  textDescriptionInput.removeEventListener('keydown', propagationStopper);
  disableEffectPreview();
  disnableScaleChanger();
};

function propagationStopper(evt) {
  evt.stopPropagation();
}

function closeButtonListener() {
  closeOverlay();
}

function escListener(evt) {
  if (evt.key === 'Escape') {
    imgUploadForm.reset();
    closeOverlay();
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
    imgUploadForm.submit();
  }
});

uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  renderImageEditor();
});
