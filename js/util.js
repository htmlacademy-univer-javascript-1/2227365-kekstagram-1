function getRandomInteger(min, max){
  if (min < max || min === max && Number.isInteger(min)) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'Wrong range!';
}

function checkMaxLength(string, maxLength){
  return string.length <= maxLength;
}

function getNonRepeatingRandoms(min, max, count, prohibited) {
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
}

function openModal(modal, parent) {
  modal.classList.remove('hidden');
  parent.classList.add('modal-open');
}

function  closeModal(modal, parent) {
  modal.classList.add('hidden');
  parent.classList.remove('modal-open');
}

checkMaxLength('abc', 3);

export {
  getRandomInteger,
  getNonRepeatingRandoms,
  openModal,
  closeModal,
  checkMaxLength
};
