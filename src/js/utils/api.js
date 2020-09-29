const fetchAsync = async (url, options) => (await fetch(url, options)).json();

export const getBranchName = (prefix, defaultBranch, issueType, branchName) => {
  const branch = prefix[issueType]
    ? `${prefix[issueType]}/${branchName}`
    : defaultBranch;

  return branch || '';
};

export const request = {
  get: (url) => fetchAsync(url),
  post: (url, data, headers) =>
    fetchAsync(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(headers || {}),
      },
      method: 'POST',
      body: JSON.stringify(data || {}),
    }),
};
