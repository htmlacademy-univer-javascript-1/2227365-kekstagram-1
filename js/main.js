const commentVariants = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];
const names = ['Виталий', 'Артём', 'Вася', 'Дмитрий', 'Джон Доу', 'Иван'];
const descriptions = ['Фото', 'Фото. Ну типа.', 'Потом придумаю', 'Шедевр'];

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

checkMaxLength('abc', 3);

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

function createCommentText () {
  const sentencesCountRange = {min: 1, max: 2};
  const sentencesCount = getRandomInteger(sentencesCountRange.min, sentencesCountRange.max);
  const chosenSentencesIndexes = getNonRepeatingRandoms(0, commentVariants.length - 1, sentencesCount, []);
  let result = '';
  for (let i = 0; i < sentencesCount; i++)
  {
    result += commentVariants[chosenSentencesIndexes[i]];
  }
  return result;
}

const createComments = (usedIds) => {
  const commentsCountRange = {min: 1, max: 3};
  const commentIdRange = {min: 1, max: 20000};
  const avatarIdRange = {min: 1, max: 6};
  const result = [];
  const count = getRandomInteger(commentsCountRange.min, commentsCountRange.max);
  const ids = getNonRepeatingRandoms(commentIdRange.min, commentIdRange.max, count, usedIds);
  for (let i = 0; i < ids.length; i++) {
    usedIds.push(ids[i]);
  }
  for (let i = 0; i < count; i++) {
    result.push({
      id: ids[i],
      avatar: `img/avatar-${getRandomInteger(avatarIdRange.min, avatarIdRange.max)}.svg`,
      message: createCommentText(),
      name: names[getRandomInteger(0, names.length - 1)]
    });
  }
  return result;
};

const createPhotoDescriptions = (number) => {
  const likesRange = {min: 15, max: 200};
  const usedIds = [];
  const result = [];
  for (let i = 1; i <= number; i++) {
    result.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: descriptions[getRandomInteger(0, descriptions.length - 1)],
      likes: getRandomInteger(likesRange.min, likesRange.max),
      comments: createComments(usedIds)
    });
  }
  return result;
};

const photoDescriptionCount = 25;
createPhotoDescriptions(photoDescriptionCount);

