const INITIAL_SCALE_VALUE = 1.0;
const MIN_SCALE_VALUE = 0.25;
const MAX_SCALE_VALUE = 1.0;
const SCALE_CHANGE_STEP = 0.25;
const INITIAL_EFFECT = 'none';
const EFFECT_DICT = {
  chrome: {
    filter: 'grayscale',
    range: {min: 0, max: 1.0},
    step: 0.1,
    measurementUnit: ''},
  sepia: {
    filter: 'sepia',
    range: {min: 0, max: 1.0},
    step: 0.1,
    measurementUnit: ''},
  marvin: {
    filter: 'invert',
    range: {min: 0, max: 100},
    step: 1,
    measurementUnit: '%'},
  phobos: {
    filter: 'blur',
    range: {min: 0, max: 3.0},
    step: 0.1,
    measurementUnit: 'px'},
  heat: {
    filter: 'brightness',
    range: {min: 1, max: 3.0},
    step: 0.1,
    measurementUnit: ''}
};

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

const createEffectSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1.0,
    },
    start: 1.0,
    step: 0.1,
    connect: 'lower',
  });
};

const sliderUpdateHandler = () => {
  if (currentEffect === 'none') {
    picture.style.filter = '';
    return;
  }
  const effect = EFFECT_DICT[currentEffect];
  picture.style.filter = `${effect.filter}(${effectLevelSlider.noUiSlider.get()}${effect.measurementUnit})`;
  effectLevelValue.value = `${effectLevelSlider.noUiSlider.get()}${effect.measurementUnit}`;
};

const changeEffect = (effect) => {
  if ((currentEffect === 'none') !== (effectLevelSlider.classList.contains('hidden'))){
    effectLevelSlider.classList.toggle('hidden');
  }
  if (currentEffect !== 'none') {
    const effectObj = EFFECT_DICT[effect];
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: effectObj.range.min,
        max: effectObj.range.max,
      },
      start: effectObj.range.max,
      step: effectObj.step
    });
  }
  else {
    picture.style.filter = '';
  }
};

const disableButtonsIfNeeded = () => {
  if ((scaleControl.scale === MIN_SCALE_VALUE) !== scaleControl.smaller.hasAttribute('disabled')) {
    scaleControl.smaller.toggleAttribute('disabled');
  }
  if ((scaleControl.scale === MAX_SCALE_VALUE) !== scaleControl.bigger.hasAttribute('disabled')) {
    scaleControl.bigger.toggleAttribute('disabled');
  }
};

const scaleControlClickHandler = (evt) => {
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
  scaleControl.block.addEventListener('click', scaleControlClickHandler);
  disableButtonsIfNeeded();
};

const disnableScaleChanger = () => {
  scaleControl.block.removeEventListener('click', scaleControlClickHandler);
};

const effectRadiosClickHandler = () => {
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
  effectsList.addEventListener('click', effectRadiosClickHandler);
  createEffectSlider();
  changeEffect(currentEffect);
  effectLevelSlider.noUiSlider.set(parseFloat(effectLevelValue.value));
  effectLevelSlider.noUiSlider.on('update', sliderUpdateHandler);
  if (currentEffect === 'none') {
    effectLevelSlider.classList.add('hidden');
  }
};

const disableEffectPreview = () => {
  picture.classList.remove(`effects__preview--${currentEffect}`);
  effectsList.removeEventListener('click', effectRadiosClickHandler);
  effectLevelSlider.noUiSlider.destroy();
};

const resetEffect = () => {
  scaleControl.scale = INITIAL_SCALE_VALUE;
  currentEffect = INITIAL_EFFECT;
  imgUploadForm.reset();
};

export {
  enableScaleChanger,
  disnableScaleChanger,
  enableEffectPreview,
  disableEffectPreview,
  picture,
  resetEffect
};
