const fs = require('fs');
const path = require('path');

/**
 * @param {string} root 
 * @param {(data: { fileName: string; filePath: string; isFile: boolean; isDir: boolean; ext: string; }) => void} cb
 */
exports.readDirDeep = function (root, cb) {
  function processing(filePath) {
    const fileStat = fs.statSync(filePath);
    cb({
      fileName: path.basename(filePath),
      filePath,
      isFile: fileStat.isFile(),
      isDir: fileStat.isDirectory(),
      ext: path.extname(filePath)
    });

    if (fileStat.isDirectory()) {
      fs
        .readdirSync(filePath, 'utf8')
        .forEach(fileName => processing(path.resolve(filePath, fileName)));
    }
  }

  processing(root);
}
