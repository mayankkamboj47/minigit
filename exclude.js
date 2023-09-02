"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function exclude(obj, keys) {
    const result = Object.assign({}, obj);
    keys.forEach(key => delete result[key]);
    return result;
};
