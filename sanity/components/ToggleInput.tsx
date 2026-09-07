// sanity/components/ToggleInput.tsx
import React from 'react';
import { StringInputProps, set, unset } from 'sanity';
import { Flex, Text, Switch } from '@sanity/ui';

export function ToggleInput(props: StringInputProps) {
  const { value, onChange } = props;
  const isArchived = value === 'archived';

  const handleChange = (checked: boolean) => {
    const newValue = checked ? 'archived' : 'active';
    onChange(newValue ? set(newValue) : unset());
  };

  return (
    <Flex align="center" gap={3} paddingY={2}>
      <Switch
        checked={isArchived}
        onChange={(event) => handleChange(event.currentTarget.checked)}
      />
      <Text size={2} weight="semibold">
        {isArchived ? '📦 Archivált (Adóügyi megőrzés)' : '🟢 Aktív Fiók'}
      </Text>
    </Flex>
  );
}