const LOCAL_KEY = 'vyachnd-todo';

export default {
  save(key, data) {
    localStorage.setItem(`${LOCAL_KEY}-${key}`, JSON.stringify(data));
  },

  async load(key) {
    const data = await localStorage.getItem(`${LOCAL_KEY}-${key}`);
    const res = await JSON.parse(data);

    return res || [];
  },
};
