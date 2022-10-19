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
const sentencesCountRange = {min: 1, max: 2};
const commentsCountRange = {min: 1, max: 3};
const commentIdRange = {min: 1, max: 20000};
const commentAvatarIdRange = {min: 1, max: 6};
const likesRange = {min: 15, max: 200};
const photoDescriptionCount = 25;

export {
  commentVariants,
  names,
  descriptions,
  sentencesCountRange,
  commentsCountRange,
  commentIdRange,
  commentAvatarIdRange as avatarIdRange,
  likesRange,
  photoDescriptionCount};
