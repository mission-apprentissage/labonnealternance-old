const memoize = (func) => {
  const results = {};
  return (...args) => {
    const argsKey = JSON.stringify(args);
    if (!results[argsKey]) {
      console.log("pas memo");
      results[argsKey] = func(...args);
    } else {
      console.log("memo");
    }
    return results[argsKey];
  };
};

export default memoize;
