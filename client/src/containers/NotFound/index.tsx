import React from 'react';

import { Empty } from 'semi';
import { withFallbackRenderer } from '@/components/FallbackRenderer';

function NotFound() {
  return <span>NotFound</span>
}

export default withFallbackRenderer()(NotFound);
