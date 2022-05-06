export const loadFromStorage = (key) => {
  const existingDataRaw = localStorage.getItem(key);
  if (existingDataRaw) {
    return JSON.parse(existingDataRaw);
  } else {
    return [];
  }
};

export default loadFromStorage;