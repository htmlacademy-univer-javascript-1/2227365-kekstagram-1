import { getRandomInteger, getNonRepeatingRandoms } from './util.js';
import {
  COMMENT_VARIANTS,
  NAMES,
  DESCRIPTIONS,
  SENTENCES_COUNT_RANGE,
  COMMENTS_COUNT_RANGE,
  COMMENT_ID_RANGE,
  COMMENT_AVATAR_ID_RANGE,
  LIKES_RANGE
} from './generation-config.js';

function createCommentText () {
  const sentencesCount = getRandomInteger(SENTENCES_COUNT_RANGE.min, SENTENCES_COUNT_RANGE.max);
  const chosenSentencesIndexes = getNonRepeatingRandoms(0, COMMENT_VARIANTS.length - 1, sentencesCount, []);
  let result = '';
  for (let i = 0; i < sentencesCount; i++)
  {
    result += COMMENT_VARIANTS[chosenSentencesIndexes[i]];
  }
  return result;
}

const createComments = (usedIds) => {
  const result = [];
  const count = getRandomInteger(COMMENTS_COUNT_RANGE.min, COMMENTS_COUNT_RANGE.max);
  const ids = getNonRepeatingRandoms(COMMENT_ID_RANGE.min, COMMENT_ID_RANGE.max, count, usedIds);
  for (let i = 0; i < ids.length; i++) {
    usedIds.push(ids[i]);
  }
  for (let i = 0; i < count; i++) {
    result.push({
      id: ids[i],
      avatar: `img/avatar-${getRandomInteger(COMMENT_AVATAR_ID_RANGE.min, COMMENT_AVATAR_ID_RANGE.max)}.svg`,
      message: createCommentText(),
      name: NAMES[getRandomInteger(0, NAMES.length - 1)]
    });
  }
  return result;
};

const createPhotoDescriptions = (number) => {
  const usedIds = [];
  const result = [];
  for (let i = 1; i <= number; i++) {
    result.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
      likes: getRandomInteger(LIKES_RANGE.min, LIKES_RANGE.max),
      comments: createComments(usedIds),
    });
  }
  return result;
};

export {createPhotoDescriptions};
