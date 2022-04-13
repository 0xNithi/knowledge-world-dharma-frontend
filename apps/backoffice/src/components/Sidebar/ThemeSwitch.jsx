import React from 'react';
import { Button, Moon, Sun, useTheme } from '@kwd/ui';

function ThemeSwitch() {
  const { toggleTheme } = useTheme();
  return (
    <Button onClick={toggleTheme}>
      <Sun className="w-4 h-4 text-rose-400 dark:text-slate-400" />
      <span>/</span>
      <Moon className="w-4 h-4 text-slate-400 dark:text-amber-400" />
    </Button>
  );
}

export default ThemeSwitch;
