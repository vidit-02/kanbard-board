
export const saveStateToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to local storage:', error);
  }
};

export const getStateFromLocalStorage = (key) => {
  try {
    const storedState = localStorage.getItem(key);
    return storedState ? JSON.parse(storedState) : null;
  } catch (error) {
    console.error('Error retrieving from local storage:', error);
    return null;
  }
};
