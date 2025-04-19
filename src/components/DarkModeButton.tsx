import React from 'react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Sun, Moon } from 'lucide-react';

function DarkModeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant="outline"
      color={colorScheme === 'dark' ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      {colorScheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </ActionIcon>
  );
}

export default DarkModeButton;
