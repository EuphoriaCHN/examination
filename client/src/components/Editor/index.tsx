import React from 'react';
import { Editor as TUIEditor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';

function Editor() {
  return (
    <TUIEditor
      initialValue="hello react editor world!"
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
    />
  );
}

export default Editor;