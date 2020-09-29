export const getHtml = async (filename) => {
  const file = chrome.runtime.getURL(`./html/${filename}.html`);

  const html = await (await fetch(file)).text();

  return new DOMParser().parseFromString(html, 'text/html').body.innerHTML;
};
