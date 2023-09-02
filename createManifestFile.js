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
function createManifestFile(currentFiles, timestamp = null, manifestPath = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let contents = JSON.stringify(currentFiles, null, 2);
        // if timestamp is not provided, create a UNIX timestamp
        if (!timestamp)
            timestamp = Math.floor(Date.now() / 1000);
        const filename = `${timestamp}.json`;
        // if manifestPath is not provided, set it to a 'backups' folder in the current directory
        manifestPath = path.join(__dirname, manifestPath || 'backups');
        // if the manifestPath does not exist, create it
        try {
            yield fs.access(manifestPath);
        }
        catch (e) {
            yield fs.mkdir(manifestPath);
        }
        // save the manifest file
        yield fs.writeFile(path.join(manifestPath, filename), contents, 'utf-8');
    });
}
module.exports = createManifestFile;
