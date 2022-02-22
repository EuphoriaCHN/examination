import React from 'react';
import TuiEditor from '@toast-ui/editor';

import '@toast-ui/editor/dist/toastui-editor.css';
import './index.scss';

function MarkdownEditor() {
  const elRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!elRef.current) return;

    const editor = new TuiEditor({
      el: elRef.current,
      initialValue: '',
      previewStyle: 'vertical',
      initialEditType: 'markdown',
      language: 'markdown'
    });
  }, []);

  return <div ref={elRef} />;
}

export default MarkdownEditor;
