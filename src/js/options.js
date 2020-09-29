import polyfill from '@babel/polyfill';

import { getStore, saveToStore } from './options/storage';
import { getContent, setInputs } from './utils/dom';

(async () => {
  setInputs(await getStore());

  document
    .querySelector('button[type=submit]')
    .addEventListener('click', () => saveToStore(getContent()));
})();
