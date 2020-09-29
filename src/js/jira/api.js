import { request } from '../utils/api';
import { getJiraHost } from './storage';
import { getIconUrl } from '../git/api';

export const isJira = (url) => /https:\/\/jira\..*\/browse\//.test(url);

export const createExternalLink = async (ticket, url, title, icon) => {
  const host = await getJiraHost();
  const path = `https://${host}/rest/api/2/issue/${ticket}/remotelink`;
  const data = {
    object: {
      url,
      title: title || 'MR',
      icon: {
        url16x16: icon || (await getIconUrl()),
      },
    },
  };

  return request.post(path, data);
};
