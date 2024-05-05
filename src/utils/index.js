const reduce = (arr) => {
  return arr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
};

const map = (arr) => {
  return arr.map((item) => {
    return item + 1;
  });
};

const filter = (arr) => {
  return arr.filter((item) => {
    return item > 5;
  });
};

Array.prototype._reduce = function (cb, initVal) {
  let result = initVal;
  for (let i = 0; i < this.length; i++) {
    result = result ? cb(result, this[i], i, this) : this[i];
  }
  return result;
};

Array.prototype._filter = function (cb) {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    const result = cb(this[i], i, this);
    if (result) arr.push(this[i]);
  }
  return arr;
};

Array.prototype._map = function (cb) {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(cb(this[i], i, this));
  }
  return arr;
};

export { map, reduce, filter };
