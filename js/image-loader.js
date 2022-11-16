import {openModal, closeModal} from './util.js';
import {pristine} from './loader-validation.js';

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const closeButton = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionInput = imgUploadForm.querySelector('.text__description');

let escListener = null;
let closeButtonListener = null;
let submitListener = null;
let propagationStopper = null;

const closeOverlay = () => {
  closeModal(imgUploadOverlay, body);
  closeButton.removeEventListener('click', closeButtonListener);
  document.removeEventListener('keydown', escListener);
  textHashtagsInput.removeEventListener('keydown', propagationStopper);
  textDescriptionInput.removeEventListener('keydown', propagationStopper);
};

propagationStopper = (evt) => {
  evt.stopPropagation();
};

closeButtonListener = function () {
  closeOverlay();
};

escListener = function (evt) {
  if (evt.key === 'Escape') {
    imgUploadForm.reset();
    closeOverlay();
  }
};

submitListener = function (evt) {
  {
    evt.preventDefault();
    if (pristine.validate()) {
      imgUploadForm.submit();
    }
  }
};

const renderImageEditor = () => {
  openModal(imgUploadOverlay, body);
  textHashtagsInput.addEventListener('keydown', propagationStopper);
  textDescriptionInput.addEventListener('keydown', propagationStopper);
  closeButton.addEventListener('click', closeButtonListener);
  document.addEventListener('keydown', escListener);
  imgUploadForm.addEventListener('submit', submitListener);
};

uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  renderImageEditor();
});
