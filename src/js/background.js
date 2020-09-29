import polyfill from '@babel/polyfill';

import { createBranch, createMR } from './git/api';
import { createExternalLink, isJira } from './jira/api';
import { injectJiraScripts } from './jira/framework';
import {
  sendErrorMessageToFront,
  sendSuccessMessageToFront,
} from './jira/message';

chrome.tabs.onUpdated.addListener(
  (tabId, { status }, { url }) =>
    status === 'complete' && isJira(url) && injectJiraScripts(tabId)
);

chrome.runtime.onMessage.addListener(
  ({ type, projectId, ticket, branchFrom, branchTo, title }) =>
    type == 'MESSAGE' && process(projectId, ticket, branchFrom, branchTo, title)
);

const process = async (projectId, ticket, branchFrom, branchTo, title) => {
  if (!projectId || !ticket || !branchFrom || !branchTo || !title) {
    sendErrorMessageToFront('Empty data');
    return;
  }
  const branchCreated = await createBranch(projectId, branchFrom, branchTo);
  if (!branchCreated) {
    sendErrorMessageToFront('Branch create');
    return;
  }
  const urlMR = await createMR(projectId, branchFrom, branchTo, title);
  if (!urlMR) {
    sendErrorMessageToFront('MR create');
    return;
  }
  const externalLink = await createExternalLink(ticket, urlMR);
  if (!externalLink) {
    sendErrorMessageToFront('Jira link');
    return;
  }
  sendSuccessMessageToFront('Success');
};
