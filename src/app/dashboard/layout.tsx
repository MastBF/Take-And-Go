'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

import { AuthGuard } from '@/components/auth/auth-guard';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/auth/sign-in');
  };

  return (
    <AuthGuard>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
            backgroundColor: '#1A1A1A',
          },
        }}
      />
      <Box
        sx={{
          bgcolor: '#1A1A1A',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100vh',
          color: 'rgba(255, 255, 255, 0.87)',
        }}
      >
        <Button
          onClick={handleLogout}
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1200,
            minWidth: 0,
            width: 40,
            height: 40,
            padding: 0,
            borderRadius: '10px',
            backgroundColor: '#2C2C2C',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#3A3A3A',
            },
            '&:active': {
              backgroundColor: '#1F1F1F',

            },
            boxShadow: '0 0px 20px 0 rgba(255, 136, 0, 0.9), 0 0 0 1px rgba(204, 152, 46, 0.6)'

          }}
        >
          <LogoutIcon fontSize="small" />
        </Button>

        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            pl: { lg: 'var(--SideNav-width)' },
            backgroundColor: '#1A1A1A',
          }}
        >
          <main>
            <Container
              maxWidth="xl"
              sx={{
                py: '64px',
                backgroundColor: '#1A1A1A',
              }}
            >
              {children}
            </Container>
          </main>
        </Box>
      </Box>
    </AuthGuard>
  );
}
