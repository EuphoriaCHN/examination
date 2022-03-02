const { SRC } = require('../config/utils');
const { parseFile } = require('../config/loaders/utils');
const { readDirDeep } = require('./utils');
const baiduTrans = require('./baidu-translate');

const { readFileSync, ensureFileSync, writeFileSync } = require('fs-extra');
const traverse = require('@babel/traverse').default;
const { set, get } = require('lodash');

const configs = {
  func: [/^(?:i18n\.)?t$/i],
  langs: ['zh-CN', 'en-US'],
};

const ans = {};

/**
 * @param {babel.types.CallExpression} node 
 */
function getCallExpressionCalleeName(node) {
  /**
   * @param {babel.types.MemberExpression} n 
   */
  function extractMemberExpression(n) {
    if (n.type === 'Identifier') return [n.name];
    if (n.type !== 'MemberExpression') return [''];

    return [...extractMemberExpression(n.object), n.property.name];
  }

  return node.callee.type === 'MemberExpression' ?
    extractMemberExpression(node.callee).join('.') :
    node.callee.name;
}

(async function () {
  readDirDeep(SRC(), ({ fileName, isFile, filePath }) => {
    if (!isFile) return;
    if (!/(?<!\.d)\.[tj]sx?$/.test(fileName)) return;

    const ast = parseFile(readFileSync(filePath, 'utf8'));

    traverse(ast, {
      CallExpression(path) {
        const calleeName = getCallExpressionCalleeName(path.node);

        if (configs.func.some(reg => reg.test(calleeName))) {
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
        // 逐个请求会被 Ban
        const keys = Object.keys(localAns[lang]);
        const str = keys.join('\n');
        const res = await baiduTrans(str, 'zh', 'en');
        const trans = get(res, 'data.trans_result.data', []);
        for (let i = 0; i < trans.length; i++) {
          localAns[lang][keys[i]] = trans[i].dst;
        }
    }
  }


  Object.keys(localAns).forEach(lang => {
    const filePath = SRC('resources', `${lang}.json`);

    ensureFileSync(filePath);
    writeFileSync(filePath, JSON.stringify(localAns[lang], null, 2), 'utf8');
  });
})();
