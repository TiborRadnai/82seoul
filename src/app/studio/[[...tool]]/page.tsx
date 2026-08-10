import { StudioComponent } from '@/components/StudioComponent';

export const dynamic = 'force-dynamic';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <StudioComponent />;
}