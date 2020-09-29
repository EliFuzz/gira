export const getContent = () =>
  [...document.querySelectorAll('input')].reduce(
    (acc, cur) => ({ ...acc, ...{ [cur.id]: cur.value } }),
    {}
  );

export const setInputs = (data) => {
  document
    .querySelectorAll('input')
    .forEach((input) => (input.value = data[input.id] || ''));
};
