const COMMENT_VARIANTS = [
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
const NAMES = ['Виталий', 'Артём', 'Вася', 'Дмитрий', 'Джон Доу', 'Иван'];
const DESCRIPTIONS = ['Фото', 'Фото. Ну типа.', 'Потом придумаю', 'Шедевр'];
const SENTENCES_COUNT_RANGE = {min: 1, max: 2};
const COMMENTS_COUNT_RANGE = {min: 1, max: 3};
const COMMENT_ID_RANGE = {min: 1, max: 20000};
const COMMENT_AVATAR_ID_RANGE = {min: 1, max: 6};
const LIKES_RANGE = {min: 15, max: 200};
const PHOTO_DESCRIPTION_COUNT = 25;

export {
  COMMENT_VARIANTS,
  NAMES,
  DESCRIPTIONS,
  SENTENCES_COUNT_RANGE,
  COMMENTS_COUNT_RANGE,
  COMMENT_ID_RANGE,
  COMMENT_AVATAR_ID_RANGE,
  LIKES_RANGE,
  PHOTO_DESCRIPTION_COUNT
};
