import polyfill from '@babel/polyfill';

import { createMenu } from './jira/dom';

(() => {
  var observer = new MutationObserver(function () {
    createMenu();
    this.disconnect();
  });

  observer.observe(document.getElementById('jira'), {
    childList: true,
    subtree: true,
  });

  chrome.runtime.onMessage.addListener((message) => {
    const button = document.getElementById('git-submit');
    const defaultColor = window
      .getComputedStyle(button)
      .getPropertyValue('background-color');
    const defaultText = button.innerText;

    if (message.type === 'SUCCESS') {
      button.innerText = message.message;
      button.style.backgroundColor = '#24cfaa';
    }

    if (message.type === 'ERROR') {
      button.innerText = message.message;
      button.style.backgroundColor = '#e74c3c';
    }

    setTimeout(() => {
      button.innerText = defaultText;
      button.style.backgroundColor = defaultColor;
    }, 1000);
  });
})();
