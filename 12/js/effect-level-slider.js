import { effectLevelSlider, effectLevelValue, picture, currentEffect} from './photo-editor.js';
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

const sliderConnector = () => {
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

export {
  createEffectSlider,
  sliderConnector,
  changeEffect
};
