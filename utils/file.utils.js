"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_system_1 = require("tns-core-modules/file-system");
//const documents: Folder = <Folder>knownFolders.currentApp();
var androidPulickStoragePath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOCUMENTS).toString();
var filePath = file_system_1.path.join(androidPulickStoragePath, "cards.json");
var file = file_system_1.File.fromPath(filePath);
var FileUtils = /** @class */ (function () {
    function FileUtils(cards) {
        this.cards = cards;
    }
    FileUtils.prototype.read = function () {
        //console.log("READ: " + file.path);
        /*
        file.readText()
            .then((content) => {
                cards.fileContent = content;
                console.log("READ: " + cards.fileContent);
            }).catch((err) => {
                console.log(err.stack);
            });
        */
        return new Promise(function (resolve, reject) {
            try {
                file.readText().then(function (content) {
                    var data = JSON.parse(content);
                    resolve(data);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    };
    FileUtils.prototype.write = function (content) {
        //console.log("WRITE: " + file.path);
        file.writeText(content).then(function () {
            file.readText().then(function (res) {
                //console.log("reading: " + res);
                var text = res;
            }).catch(function (err) {
                console.log("read err: " + err);
            });
        }).catch(function (err) {
            console.log(err);
        });
    };
    return FileUtils;
}());
exports.FileUtils = FileUtils;
//export default FileUtils;
