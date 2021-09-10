const checkInput = url => {
  const res = new RegExp(/^(http|https):\/\/.*$/);
  return res.test(url);
};

export { checkInput };