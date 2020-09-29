import { getStore } from '../options/storage';

export const getJiraHost = async () => (await getStore())['jira_host'];
