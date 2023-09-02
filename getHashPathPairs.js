"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs').promises;
const glob = require('glob-promise');
const crypto = require('crypto');
const statPath = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const stat = yield fs.stat(path);
    return [path, stat];
});
const readPath = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield fs.readFile(path, 'utf-8');
    return [path, content];
});
const hash = (str) => {
    const hasher = crypto.createHash('sha1').setEncoding('hex');
    hasher.write(str);
    hasher.end();
    return hasher.read();
};
const getHashFilePairs = (dir, ignores) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ignores)
        ignores = new Set();
    const pattern = `${dir}/**/*`;
    // ignore any directories to begin with
    const matches = yield glob(pattern, { ignore: Array.from(ignores).map(ignore => `${dir}/${ignore}`) });
    // to avoid idle times, we fetch all stats and contents in parallel
    const stats = yield Promise.all(matches.map(path => statPath(path)));
    const files = stats.filter(([path, stat]) => stat.isFile());
    const contents = yield Promise.all(files.map(([path, _]) => readPath(path)));
    // finally, we return a map of file-content hashes to file paths. In the future, we
    // may want to use streams to avoid loading all the contents into memory at once.
    let hashFilePairs = {};
    for (let [path, content] of contents) {
        hashFilePairs[hash(content)] = path;
    }
    return hashFilePairs;
});
module.exports.getHashFilePairs = getHashFilePairs;
module.exports.hash = hash;
module.exports.readPath = readPath;
module.exports.statPath = statPath;
