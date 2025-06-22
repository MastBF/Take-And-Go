import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

export interface TotalCustomersProps {
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps;
  value: string;
}

export function TotalCustomers({ diff, trend, sx, value }: TotalCustomersProps): React.JSX.Element {
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
  const trendColor = trend === 'up' ? '#4caf50' : '#f44336';

  return (
    <Card sx={{
      backgroundColor: '#1A1A1A',
      color: '#FFFFFF',
      ...sx
    }}>
      <CardContent>
        <Stack spacing={2} >
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="rgba(255, 255, 255, 0.7)" variant="overline" sx={{ letterSpacing: '0.05em' }} >
                Total Customers
              </Typography>
              <Typography variant="h4" sx={{ color: '#FFFFFF' }}>
                {value}
              </Typography>
            </Stack>
            <Avatar sx={{
              backgroundColor: 'rgba(76, 175, 80, 0.16)',
              color: '#4caf50',
              height: '56px',
              width: '56px'
            }}>
              <UsersIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
          {diff ? (
            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
              <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
                <TrendIcon color={trendColor} fontSize="var(--icon-fontSize-md)" />
                <Typography color={trendColor} variant="body2">
                  {diff}%
                </Typography>
              </Stack>
              <Typography color="rgba(255, 255, 255, 0.7)" variant="caption">
                Since last month
              </Typography>
            </Stack>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}