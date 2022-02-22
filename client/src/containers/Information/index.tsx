import React from 'react';

import MarkdownEditor from '@/components/MarkdownEditor';
import { withFallbackRenderer } from '@/components/FallbackRenderer';

import './index.scss';

function Information() {
  return (
    <div>
      <span>Information</span>
      <MarkdownEditor />
    </div>
  );
}

export default withFallbackRenderer()(Information);
