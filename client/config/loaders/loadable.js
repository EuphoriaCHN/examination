const { isProd } = require('../utils');
const { parseFile } = require('./utils');

const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generator = require('@babel/generator').default;

/**
 * 提取 ImportDeclaration 中的信息
 * 目前只处理了 `import A from 'xxx';` 的 case
 * @param {babel.types.ImportDeclaration} node
 */
function extractImportDeclaration(node) {
  return {
    specifiers: node.specifiers[0].local.name,
    startLine: node.loc.start.line,
    endLine: node.loc.end.line,
    source: node.source.value
  };
}

/**
 * 生成 `const \<specifiers\> = loadable(() => import(/* webpackChunkName: "\<source\>" *\/\<source\>));
 */
function generateLoadableImport({ specifiers, source }) {
  const importStringLiteral = t.stringLiteral(source);

  t.addComment(
    importStringLiteral,
    'leading',
    `webpackChunkName: "${specifiers.replace(/^\w/, c => c.toLowerCase())}"`
  )

  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(specifiers),
      t.callExpression(
        t.identifier('loadable'),
        [t.arrowFunctionExpression(
          [],
          t.callExpression(
            t.import(),
            [importStringLiteral]
          )
        )]
      )
    )
  ]);
}

/**
 * @param {string} source 
 */
function loader(source) {
  if (!isProd) return source;

  const ast = parseFile(source);

  // 查找 comments
  let [handleStartLine, handleEndLine] = [0, 0];
  for (const comment of ast.comments || []) {
    const { type, value, loc } = comment;

    if (type !== 'CommentLine') continue;
    if (!/^ *@loadable-components-(start|end) *$/.test(value)) continue;

    if (value.trim().split('-').filter(i => !!i).pop() === 'start') {
      handleStartLine = loc.start.line;
    } else {
      handleEndLine = loc.end.line;
    }
  }

  // 当前文件没有要处理的 loadable texts
  if (handleEndLine - handleStartLine <= 0) return source;

  let hasLoadableImport = false;

  traverse(ast, {
    ImportDeclaration: path => {
      path.skip();

      const nodeMetaData = extractImportDeclaration(path.node);
      const { startLine, endLine } = nodeMetaData;

      if (/^ *@loadable\/component *$/.test(nodeMetaData.source)) {
        hasLoadableImport = true;
      }

      if (startLine < handleStartLine || endLine > handleEndLine) return;

      path.replaceWith(generateLoadableImport(nodeMetaData));
    }
  });

  if (!hasLoadableImport) {
    // auto inject
    ast.program.body.unshift(t.importDeclaration(
      [t.importDefaultSpecifier(t.identifier('loadable'))],
      t.stringLiteral('@loadable/component')
    ));
  }

  return generator(ast).code;
}

module.exports = loader;
