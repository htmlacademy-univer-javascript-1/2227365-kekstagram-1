let getRandomInteger = function(min, max){
  if (min < max || min == max && Number.isInteger(min)) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'Wrong range!'
}

let checkMaxLength = function(string, maxLength){
  return string.length <= maxLength;
}
