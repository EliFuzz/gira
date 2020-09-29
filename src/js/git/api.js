import { request, getBranchName } from '../utils/api';
import {
  getGitHost,
  getGitToken,
  getPrefixBranchFrom,
  getDefaultBranchFrom,
  getPrefixBranchTo,
  getDefaultBranchTo,
} from './storage';

export const generateBranchFrom = async (issueType, branchName) =>
  getBranchName(
    await getPrefixBranchFrom(),
    await getDefaultBranchFrom(),
    issueType,
    branchName
  );

export const generateBranchTo = async (issueType, branchName) =>
  getBranchName(
    await getPrefixBranchTo(),
    await getDefaultBranchTo(),
    issueType,
    branchName
  );

export const createBranch = async (projectId, branchFrom, branchTo) => {
  const host = await getGitHost();
  const encoded = encodeURI(`branches?branch=${branchFrom}&ref=${branchTo}`);

  const response = await request.post(
    `https://${host}/api/v4/projects/${projectId}/repository/${encoded}`,
    {},
    await authHeader()
  );

  return !!response.web_url;
};

export const createMR = async (projectId, branchFrom, branchTo, title) => {
  const host = await getGitHost();
  const data = {
    id: projectId,
    source_branch: branchFrom,
    target_branch: branchTo,
    title: `${branchFrom} ${title}`,
    remove_source_branch: true,
  };

  const response = await request.post(
    `https://${host}/api/v4/projects/${projectId}/merge_requests`,
    data,
    await authHeader()
  );

  return response.web_url;
};

export const getIconUrl = async () => {
  const host = await getGitHost();

  return `https://${host}/favicon.ico`;
};

const authHeader = async () => ({ 'PRIVATE-TOKEN': await getGitToken() });
