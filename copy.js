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
const path = require('path');
const fs = require('fs').promises;
module.exports = function copy(destSrcPairs, destFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        const pathExtension = '.bkp';
        let promises = [];
        for (let dest in destSrcPairs) {
            const src = destSrcPairs[dest];
            const destPath = path.join(destFolder, dest + pathExtension);
            const srcPath = path.join(__dirname, src);
            promises.push(fs.copyFile(srcPath, destPath));
        }
        ;
        yield Promise.all(promises);
    });
};
