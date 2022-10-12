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
  let Nums = [];
  while (Nums.length !== count) {
    let newNum = getRandomInteger(min, max);
    if (!Nums.includes(newNum) && !prohibited.includes(newNum)) {
      Nums.push(newNum);
    }
    else {
      continue
    }
  }
  return Nums;
}

function createCommentText () {
  let commentVariants = [
    'Всё отлично!',
    'В целом всё неплохо.',
    'Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
    'В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают.',
    'Как можно было поймать такой неудачный момент?!',
  ]
  if (getRandomInteger(1, 2) == 1) {
    return commentVariants[getRandomInteger(0, 8)]
  }
  else {
    let sentences = getNonRepeatingRandoms(0, 8, 2, [])
    return commentVariants[sentences[0]] + ' ' + commentVariants[sentences[1]]
  }
}

getComments = (usedIds) => {
  let result = []
  let names = ['Виталий', 'Артём', 'Вася', 'Дмитрий', 'Джон Доу', 'Иван']
  let count = getRandomInteger(1, 3);
  let ids = getNonRepeatingRandoms(1, 20000, count, usedIds)
  for (let i = 0; i < ids.length; i++) {
    usedIds.push(ids[i])
  }
  for (let i = 0; i < count; i++) {
    result.push({
      id: ids[i],
      avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
      message: createCommentText(),
      name: names[getRandomInteger(0, names.length - 1)]
    });
  }
  return result;
}

const createPhotoDescriptions = (number) => {
  let usedIds = []
  let result = []
  for (let i = 1; i <= number; i++) {
    result.push({
      id: i,
      url: 'photos/' + i + '.jpg',
      description: 'Заглушка',
      likes: getRandomInteger(15, 200),
      comments: getComments(usedIds)
    });
  }
  return result;
}

photos = createPhotoDescriptions(25);
