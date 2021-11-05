import * as path from 'path';
import * as fs from 'fs';
import { copySync } from 'fs-extra';

const readFileData = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));
delete readFileData.files;
delete readFileData.private;
delete readFileData.scripts.prepare;
fs.writeFileSync('dist/package.json', JSON.stringify(readFileData));

// To copy a folder or file
copySync('config', 'dist/config');
