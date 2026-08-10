'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../sanity/sanity.config';

export function StudioComponent() {
  return <NextStudio config={config} />;
}