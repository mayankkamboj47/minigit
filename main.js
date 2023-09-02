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
const path = require("path");
const getIgnores = require('./getIgnores.js');
const { getHashFilePairs } = require('./getHashPathPairs.js');
const backupFilesAsHashnames = require('./backupFilesAsHashnames.js');
const copy = require('./copy.js');
const createManifestFile = require('./createManifestFile.js');
const exclude = require('./exclude.js');
const fs = require('fs').promises;
function script(src, dest = 'backups') {
    return __awaiter(this, void 0, void 0, function* () {
        // create the destination folder if it does not exist
        yield createFolderIfNotExists(dest);
        let ignores = yield getIgnores('./.gitignore');
        console.log(ignores);
        let hashFilePairs = yield getHashFilePairs(src, ignores);
        let currentHashes = yield backupFilesAsHashnames(dest);
        let toCopy = exclude(hashFilePairs, currentHashes);
        yield copy(toCopy, dest);
        yield createManifestFile(hashFilePairs, null, dest);
    });
}
const src = process.argv[2];
const dest = process.argv[3];
script(src, dest).then(() => console.log('done'));
function createFolderIfNotExists(folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs.access(folderPath);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                yield fs.mkdir(folderPath, { recursive: true });
            }
            else {
                throw error;
            }
        }
    });
}
