// to fix a error in persistor
"use client"
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// Check if we are in a browser environment
const isBrowser = typeof window !== 'undefined';

// Use local storage if we are in the browser, otherwise use a noop storage
const storage = isBrowser ? createWebStorage("local") : createNoopStorage();

export default storage;
