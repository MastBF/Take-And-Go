import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { paths } from '@/paths';
import { DynamicLogo } from '@/components/core/logo';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#0D0D0D', 
        color: '#FFFFFF',
        
      }}
    >
      <Box sx={{ p: 4 }}>
        <Box
          component={RouterLink}
          href={paths.home}
          sx={{ display: 'inline-block', fontSize: 0 }}
        >
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
        </Box>
      </Box>

      <Box
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          pb: 8,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 450,
            bgcolor: '#1A1A1A',
            p: 4,
            borderRadius: 3,
            boxShadow: '0 0px 20px 0 rgba(255, 136, 0, 0.9), 0 0 0 1px rgba(204, 152, 46, 0.6)'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
