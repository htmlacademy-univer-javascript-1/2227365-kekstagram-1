import { getData } from './api.js';
import { renderLoadError } from './thumbnails-render.js';
import { renderThumbnails } from './thumbnails-render.js';
import './image-loader.js';

getData((photos) => {
  renderThumbnails(photos);
},
() => {
  renderLoadError('Не удалось загрузить фотографии(');
});

