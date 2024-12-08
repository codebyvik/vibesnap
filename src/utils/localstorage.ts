import secureLocalStorage from "react-secure-storage";

export const getLocalStorageItem = (key: string) => {
  const info = secureLocalStorage.getItem(key);
  return info && info;
};

export const setLocalStorageItem = (key: string, data: any) => {
  secureLocalStorage.setItem(key, data);
};
