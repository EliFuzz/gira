import { injectScripts } from '../utils/framework';

export const injectJiraScripts = (tabId) =>
  injectScripts(tabId, ['js/content.bundle.js']);
