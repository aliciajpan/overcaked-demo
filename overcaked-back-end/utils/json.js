import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readFile(fileName) {
    const file = fs.readFileSync(path.join(__dirname, `../data/${fileName}`));
    const returnVals = JSON.parse(file);
    return returnVals;
}

function writeFile(fileName, writeVals) {
    fs.writeFileSync(path.join(__dirname, `../data/${fileName}`), JSON.stringify(writeVals));
}

export {readFile, writeFile};
