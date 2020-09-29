export const injectScripts = (tabId, scripts) => {
  (scripts || []).forEach((script) => {
    chrome.tabs.executeScript(tabId, {
      file: script,
    });
  });
};
