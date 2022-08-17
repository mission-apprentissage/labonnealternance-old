// See https://stackoverflow.com/a/57193068/2595513
// This is the same function as JSON.stringify, but it will works for deeply nested props
// example: console.log(stringify(value, 1, null, 2));
function stringify(val, depth, replacer, space) {
  depth = isNaN(+depth) ? 1 : depth;
  // (JSON.stringify() has it's own rules, which we respect here by using it for property iteration)
  function _build(key, val, depth, o, a) {
    return !val || typeof val != "object"
      ? val
      : ((a = Array.isArray(val)),
        JSON.stringify(val, function (k, v) {
          if (a || depth > 0) {
            if (replacer) v = replacer(k, v);
            if (!k) return (a = Array.isArray(v)), (val = v);
            !o && (o = a ? [] : {});
            o[k] = _build(k, v, a ? depth : depth - 1);
          }
        }),
        o || (a ? [] : {}));
  }
  return JSON.stringify(_build("", val, depth), null, space);
}

module.exports = {
  stringify,
};
