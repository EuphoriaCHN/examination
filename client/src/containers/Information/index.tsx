import React from 'react';

import { withFallbackRenderer } from '@/components/FallbackRenderer';

import './index.scss';

function Information() {
  return <span>Information</span>;
}

export default withFallbackRenderer()(Information);
