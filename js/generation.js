import { getRandomInteger, getNonRepeatingRandoms } from './util.js';
import {
  commentVariants,
  names,
  descriptions,
  sentencesCountRange,
  commentsCountRange,
  commentIdRange,
  avatarIdRange,
  likesRange
} from './generation-config.js';

function createCommentText () {
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
  const usedIds = [];
  const result = [];
  for (let i = 1; i <= number; i++) {
    result.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: descriptions[getRandomInteger(0, descriptions.length - 1)],
      likes: getRandomInteger(likesRange.min, likesRange.max),
      comments: createComments(usedIds),
    });
  }
  return result;
};

export {createPhotoDescriptions};
