const getRandomInteger = (min, max) => {
  if (min < max || min === max && Number.isInteger(min)) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'Wrong range!';
};

const checkMaxLength = (string, maxLength) => string.length <= maxLength;

const getNonRepeatingRandoms = (min, max, count, prohibited) => {
  const nums = [];
  while (nums.length !== count) {
    const newNum = getRandomInteger(min, max);
    if (!nums.includes(newNum) && !prohibited.includes(newNum)) {
      nums.push(newNum);
    }
    else {
      continue;
    }
  }
  return nums;
};

const openModal = (modal, parent) => {
  modal.classList.remove('hidden');
  parent.classList.add('modal-open');
};

const closeModal = (modal, parent) => {
  modal.classList.add('hidden');
  parent.classList.remove('modal-open');
};

export {
  getRandomInteger,
  getNonRepeatingRandoms,
  openModal,
  closeModal,
  checkMaxLength
};
