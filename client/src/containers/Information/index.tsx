import React from 'react';

import { withFallbackRenderer } from '@/components/FallbackRenderer';

import './index.scss';

function Information() {
  return (
    <div>
      <span>Information</span>
    </div>
  );
}

export default withFallbackRenderer()(Information);
