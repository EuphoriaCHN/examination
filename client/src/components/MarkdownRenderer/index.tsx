import React from 'react';
import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

function MarkdownRenderer(props: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {props.children}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer;
