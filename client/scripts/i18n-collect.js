const { SRC } = require('../config/utils');
const { parseFile } = require('../config/loaders/utils');
const { readDirDeep } = require('./utils');
const baiduTrans = require('./baidu-translate');

const { readFileSync, ensureFileSync, writeFileSync } = require('fs-extra');
const traverse = require('@babel/traverse').default;
const { set, get } = require('lodash');

const configs = {
  func: [/^(?:[iI]18n\.)?t$/],
  langs: ['zh-CN', 'en-US'],
};

const ans = {};

(async function () {
  readDirDeep(SRC(), ({ fileName, isFile, filePath }) => {
    if (!isFile) return;
    if (!/(?<!\.d)\.[tj]sx?$/.test(fileName)) return;

    const ast = parseFile(readFileSync(filePath, 'utf8'));

    traverse(ast, {
      CallExpression(path) {
        if (configs.func.some(reg => reg.test(path.node.callee.name))) {
          const firstArg = path.node.arguments[0];
          if (!!firstArg && firstArg.type === 'StringLiteral') {
            ans[firstArg.value] = '';
          }
        }
      }
    });
  });

  const localAns = configs.langs.reduce((prev, next) => {
    prev[next] = Object.assign({}, ans);
    return prev;
  }, {});

  for (let lang in localAns) {
    switch (lang) {
      case 'zh-CN':
        Object.keys(localAns[lang]).forEach(key => set(localAns, [lang, key], key));
        break;
      case 'en-US':
        await Promise.all(
          Object
            .keys(localAns[lang])
            .map(
              key => baiduTrans(key, 'zh', 'en')
                .then(
                  res => get(res, 'data.trans_result.data[0].dst', key),
                  () => key
                )
                .then(transVal => { set(localAns, [lang, key], transVal) })
            )
        );
    }
  }


  Object.keys(localAns).forEach(lang => {
    const filePath = SRC('resources', `${lang}.json`);

    ensureFileSync(filePath);
    writeFileSync(filePath, JSON.stringify(localAns[lang], null, 2), 'utf8');
  });
})();
