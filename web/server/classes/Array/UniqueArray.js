'use strict';

const slice = Array.prototype.slice;

module.exports = class UniqueArray extends Array {
  constructor(uniqueKey, initial) {
    super();

    if (typeof uniqueKey !== 'string' || !uniqueKey.trim()) {
      throw new Error('UniqueArray requires a key, to filter contents with');
    }

    this.uniqueKey = uniqueKey.trim();
    this.have = [];

    if (Array.isArray(initial)) {
      for (let i = 0; i < initial.length; i++) {
        this.push(initial[i]);
      }
    }
  }

  get native() {
    return [].concat(this);
  }

  of() {
    return new UniqueArray(this.uniqueKey, slice.call(arguments));
  }

  concat() {
    const nativeResult = Array.prototype.concat.apply(this.native, arguments);
    return new UniqueArray(this.uniqueKey, nativeResult);
  }

  copyWithin() {
    throw new Error('Can not call .copyWithin() on a UniqueArray');
  }

  fill() {
    throw new Error('Can not call .fill() on a UniqueArray');
  }

  filter(func, bind) {
    const native = this.native;
    const filteredNative = native.filter(func, arguments.length > 1 ? bind : native);
    return new UniqueArray(this.uniqueKey, filteredNative);
  }

  pop() {
    const popped = super.pop();
    const keyRemoved = popped[ this.uniqueKey ];
    this.have.splice(this.have.indexOf(keyRemoved), 1);
    return popped;
  }

  push() {
    const args = slice.call(arguments);

    for (let i = 0; i < args.length; i++) {
      let argKey = args[i][ this.uniqueKey ];

      if (this.have.includes(argKey)) {
        continue;
      }

      this.have.push(argKey);
      super.push(args[i]);
    }

    return this.length;
  }

  reduce() {
    throw new Error('You can not .reduce() a UniqueArray - Use .native to get a native array');
  }

  reduceRight() {
    throw new Error('You can not .reduceRight() a UniqueArray - Use .native to get a native array');
  }

  reverse() {
    super.reverse();
  }

  shift() {
    const shifted = super.shift();
    const keyRemoved = shifted[ this.uniqueKey ];
    this.have.splice(this.have.indexOf(keyRemoved), 1);
    return shifted;
  }

  slice() {
    const native = this.native;
    const sliced = native.slice.apply(native, arguments);
    return new UniqueArray(this.uniqueKey, sliced);
  }

  splice() {
    const native = this.native;
    const spliced = native.splice.apply(native, arguments);
    return new UniqueArray(this.uniqueKey, spliced);
  }

  unshift() {
    const args = slice.call(arguments);

    for (let i = 0; i < args.length; i++) {
      let argKey = args[i][ this.uniqueKey ];

      if (this.have.includes(argKey)) {
        continue;
      }

      this.have.unshift(argKey);
      super.unshift(args[i]);
    }

    return this.length;
  }
};
