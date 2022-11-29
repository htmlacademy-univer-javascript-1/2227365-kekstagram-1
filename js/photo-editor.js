import { changeEffect, createEffectSlider, sliderConnector } from './effect-level-slider.js';

const INITIAL_SCALE_VALUE = 1.0;
const MIN_SCALE_VALUE = 0.25;
const MAX_SCALE_VALUE = 1.0;
const SCALE_CHANGE_STEP = 0.25;
const INITIAL_EFFECT = 'none';

const imgUploadForm = document.querySelector('.img-upload__form');
const picture = imgUploadForm.querySelector('.img-upload__preview img');
const scaleControlBlock = imgUploadForm.querySelector('.img-upload__scale');
const scaleControl = {
  block: scaleControlBlock,
  smaller: scaleControlBlock.querySelector('.scale__control--smaller'),
  text: scaleControlBlock.querySelector('.scale__control--value'),
  bigger: scaleControlBlock.querySelector('.scale__control--bigger'),
  scale: INITIAL_SCALE_VALUE
};
const effectsList = imgUploadForm.querySelector('.effects__list');
const buttons = effectsList.querySelectorAll('.effects__radio');
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
let currentEffect = INITIAL_EFFECT;


const disableButtonsIfNeeded = () => {
  if ((scaleControl.scale === MIN_SCALE_VALUE) !== scaleControl.smaller.hasAttribute('disabled')) {
    scaleControl.smaller.toggleAttribute('disabled');
  }
  if ((scaleControl.scale === MAX_SCALE_VALUE) !== scaleControl.bigger.hasAttribute('disabled')) {
    scaleControl.bigger.toggleAttribute('disabled');
  }
};

const scaleControlListener = (evt) => {
  evt.preventDefault();
  const target = evt.target;
  if (target.tagName !== 'BUTTON') {
    return;
  }
  else {
    if (target === scaleControl.smaller) {
      scaleControl.scale -= SCALE_CHANGE_STEP;
    }
    if (target === scaleControl.bigger) {
      scaleControl.scale += SCALE_CHANGE_STEP;
    }
  }
  scaleControl.text.value = `${Math.round(scaleControl.scale * 100)}%`;
  picture.style.transform = `scale(${scaleControl.scale})`;
  disableButtonsIfNeeded();
};

const enableScaleChanger = () => {
  scaleControl.text.value = `${Math.round(scaleControl.scale * 100)}%`;
  picture.style.transform = `scale(${scaleControl.scale})`;
  scaleControl.block.addEventListener('click', scaleControlListener);
  disableButtonsIfNeeded();
};

const disnableScaleChanger = () => {
  scaleControl.block.removeEventListener('click', scaleControlListener);
  scaleControl.scale = INITIAL_SCALE_VALUE;
};

const effectRadiosListener = () => {
  picture.classList.remove(`effects__preview--${currentEffect}`);
  buttons.forEach((button) => {
    if (button.checked) {
      currentEffect = button.value;
      changeEffect(currentEffect);
    }
  });
  picture.classList.add(`effects__preview--${currentEffect}`);
};

const enableEffectPreview = () => {
  effectsList.addEventListener('click', effectRadiosListener);
  createEffectSlider();
  effectLevelSlider.noUiSlider.on('update', sliderConnector);
  effectLevelSlider.classList.add('hidden');
};

const disableEffectPreview = () => {
  picture.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = INITIAL_EFFECT;
  effectsList.removeEventListener('click', effectRadiosListener);
  effectLevelSlider.noUiSlider.destroy();
};

export {
  enableScaleChanger,
  disnableScaleChanger,
  enableEffectPreview,
  disableEffectPreview,
  effectLevelSlider,
  effectLevelValue,
  picture,
  currentEffect
};
