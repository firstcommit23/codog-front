const LocalStorage = {
  get: (key: string) =>
    window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key) || '') : '',
  set: (key: string, value: any) => window.localStorage.setItem(key, JSON.stringify(value)),
};

export default LocalStorage;
