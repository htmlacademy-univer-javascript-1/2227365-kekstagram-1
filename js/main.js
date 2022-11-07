import { PHOTO_DESCRIPTION_COUNT } from './generation-config.js';
import { createPhotoDescriptions } from './generation.js';
import { renderThumbnails } from './thumbnails-render.js';

const photoDescriptions = createPhotoDescriptions(PHOTO_DESCRIPTION_COUNT);
renderThumbnails(photoDescriptions);

