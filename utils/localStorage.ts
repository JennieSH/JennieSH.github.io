const getLocalItem = (key: string) => {
  return localStorage.getItem(key);
};

const setLocalItem = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export { getLocalItem, setLocalItem };
