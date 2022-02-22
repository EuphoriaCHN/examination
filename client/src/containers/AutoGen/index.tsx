import React from 'react';

import { withFallbackRenderer } from '@/components/FallbackRenderer';

import './index.scss';

function AutoGen() {
  return <span>AutoGen</span>;
}

export default withFallbackRenderer()(AutoGen);
