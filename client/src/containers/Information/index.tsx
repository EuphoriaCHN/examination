import React from 'react';

import { withFallbackRenderer } from '@/components/FallbackRenderer';

import './index.scss';

function Information() {
  let a: any = {};

  console.log(a.b.c.d);

  return <span>Information</span>;
}

export default withFallbackRenderer()(Information);
