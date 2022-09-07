export default {
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  async load(key) {
    const data = await localStorage.getItem(key);
    const res = await JSON.parse(data);

    return res || [];
  },
};
