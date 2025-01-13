'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Desktop as DesktopIcon } from '@phosphor-icons/react/dist/ssr/Desktop';
import { DeviceTablet as DeviceTabletIcon } from '@phosphor-icons/react/dist/ssr/DeviceTablet';
import { Phone as PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';
import { borderBottom } from '@mui/system';

const iconMapping = { Desktop: DesktopIcon, Tablet: DeviceTabletIcon, Phone: PhoneIcon } as Record<string, Icon>;

export interface TrafficProps {
  chartSeries: number[];
  labels: string[];
  sx?: SxProps;
  topStores?: { branchAddress: string; percentage: number }[]; // Add top stores prop
}

export function Traffic({ chartSeries, labels, sx, topStores = [] }: TrafficProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Traffic source" />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
          {/* Add Top Stores Section */}
          {topStores.length > 0 && (
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                padding: 2,
                maxHeight: 120,
                overflowY: 'auto', // Параметр для появления скроллбаров
                '&::-webkit-scrollbar': {
                  width: '8px', // Увеличим, чтобы было видно
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px', // Сделаем его круглым
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent', // Прозрачный фон
                },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{borderBottom:'1px solid #dadde3', width: '100%',paddingBottom: '9px',}}>
                Top Stores
              </Typography>
              <Stack spacing={1} >
                {topStores.map((store, index) => (
                  <Typography key={index} variant="body2" sx={{borderBottom:'1px solid #dadde3', width: '100%'}}>
                    {store.branchAddress}: {store.percentage} %
                  </Typography>
                ))}
              </Stack>
            </Box>
          )}

        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent' },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: { enabled: false },
    labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}