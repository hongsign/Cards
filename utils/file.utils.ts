import { File, path } from "tns-core-modules/file-system";

import { Card } from "../model/card";
import { Cards } from "../model/cards";

declare const android: any;

//const documents: Folder = <Folder>knownFolders.currentApp();
const androidPulickStoragePath = android.os.Environment.getExternalStoragePublicDirectory(
    android.os.Environment.DIRECTORY_DOCUMENTS).toString();
const filePath: string = path.join(androidPulickStoragePath, "cards.json");
const file: File = File.fromPath(filePath);

export class FileUtils {

    public constructor(private cards: Cards) {
    }

    read(){

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
                    var data = <Array<Card>>JSON.parse(content);
                    resolve(data);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }

    write(content: string) {

        //console.log("WRITE: " + file.path);
        
        file.writeText(content).then(() => {
            file.readText().then((res) => {
                //console.log("reading: " + res);
                var text = res;
            }).catch((err) => {
                console.log("read err: " + err);
            });
        }).catch((err) => {
            console.log(err);
        })
    }
}

//export default FileUtils;