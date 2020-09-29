export const getFromStorage = (key) =>
  new Promise((resolve, _) =>
    chrome.storage.sync.get(key, (storage) => resolve(storage[key] || {}))
  );

export const saveToStorage = async (key, data) =>
  chrome.storage.sync.set({ [key]: data });
