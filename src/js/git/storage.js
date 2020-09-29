import { getStore } from '../options/storage';

const parseOptions = (options) =>
  !options
    ? {}
    : options.split(',').reduce((acc, cur) => {
        const option = cur.split(':');

        return { ...acc, ...{ [option[0].trim()]: option[1].trim() } };
      }, {});

export const getGitHost = async () => (await getStore())['git_host'];

export const getGitToken = async () => (await getStore())['git_token'];

export const getPrefixBranchFrom = async () =>
  parseOptions((await getStore())['git_prefixBranchFrom']);

export const getDefaultBranchFrom = async () =>
  (await getStore())['git_defaultBranchFrom'];

export const getPrefixBranchTo = async () =>
  parseOptions((await getStore())['git_prefixBranchTo']);

export const getDefaultBranchTo = async () =>
  (await getStore())['git_defaultBranchTo'];

export const getProjects = async () =>
  parseOptions((await getStore())['git_projects']);
