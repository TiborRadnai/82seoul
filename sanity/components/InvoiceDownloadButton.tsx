// sanity/components/InvoiceDownloadButton.tsx
import React from 'react';
import { useFormValue } from 'sanity';
import { Button, Flex, Text } from '@sanity/ui';

export function InvoiceDownloadButton() {
  const invoiceUrl = useFormValue(['invoiceUrl']) as string | undefined;

  if (!invoiceUrl) {
    return (
      <Flex padding={3} align="center">
        <Text size={1} muted>Ehhez a rendeléshez még nincs generált Stripe számla.</Text>
      </Flex>
    );
  }

  return (
    <Flex padding={2} direction="column" gap={2}>
      <Button
        as="a"
        href={invoiceUrl}
        target="_blank"
        rel="noopener noreferrer"
        text="Rechnung herunterladen (PDF)"
        tone="positive"
        padding={3}
        icon={() => (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        )}
      />
    </Flex>
  );
}