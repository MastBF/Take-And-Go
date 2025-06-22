import { paperClasses } from '@mui/material/Paper';
import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiCard = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        borderRadius: '20px',
        [`&.${paperClasses.elevation1}`]: {
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 8px 30px 0 rgba(247, 163, 0, 0.5), 0 0 0 2px rgba(247, 163, 0, 0.4)'
              : '0 2px 15px 0 rgba(255, 136, 0, 0.9), 0 0 0 1px rgba(204, 152, 46, 0.6)',
        },
      };
    },
  },
} satisfies Components<Theme>['MuiCard'];
