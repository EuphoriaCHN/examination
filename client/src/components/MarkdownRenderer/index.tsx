import React from 'react';
import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';
import { MarkdownComponents } from './components';

import './index.scss';

function MarkdownRenderer(props: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={MarkdownComponents}
    >
      {props.children}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer;
