//Utils functions

// ------------------------Validation-------------------------//

export const validateEmail = (email) => {
  var regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

export const validateFullName = (name) => {
  const regex = /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/;
  return regex.test(String(name).toLowerCase());
};

export const validateExpiry = (date) => {
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{4})$/;
  return regex.test(String(date).toLowerCase());
};
export const validateUserUniqueName = (userUniqueName) => {
  var regex = /^[a-z0-9-]{6,10}$/;
  return regex.test(String(userUniqueName));
};

//------------------------LocalStorage------------------------//

export const getStorageItem = async (key) => {
  console.log("getStorage", key);
  try {
    let item = await localStorage.getItem(key);
    return item ? JSON.parse(item) : item;
  } catch (e) {
    console.log("Error in getting key -->", e);
    return null;
  }
};

export const setStorageItem = async (key, value) => {
  try {
    let item = await localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.log("Error in setting key -->", e);
    return null;
  }
};

export const clearLocalStorage = async () => {
  try {
    await localStorage.clear();
    return true;
  } catch (e) {
    console.log("Error in clearing storage -->", e);
    return null;
  }
};
