'use client';

import { useEffect } from 'react';
import haya from '@tryhaya/analytics';

export function HayaProvider() {
  useEffect(() => {
    haya.init('2a22fdb9-e8cb-4a54-8ce8-995885b2a6cb', {
      sessionReplay: true,
      heatmaps: true,
      autoTrack: { clicks: true, scrolls: true, pageviews: true },
      maskInputs: true,
    });
  }, []);

  return null;
}