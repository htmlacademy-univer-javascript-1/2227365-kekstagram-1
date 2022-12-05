import { getData } from './api.js';
import { applyFilters, renderLoadError } from './thumbnails-render.js';
import { renderThumbnails } from './thumbnails-render.js';
import { debounce } from './util.js';
import './image-loader.js';

const RENDER_DELAY = 500;

getData((photos) => {
  renderThumbnails(photos);
  applyFilters(
    debounce(() => renderThumbnails(photos)),
    RENDER_DELAY
  );
},
() => {
  renderLoadError('Не удалось загрузить фотографии(');
});

