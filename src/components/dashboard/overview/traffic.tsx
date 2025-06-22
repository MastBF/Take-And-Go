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

const iconMapping = { Desktop: DesktopIcon, Tablet: DeviceTabletIcon, Phone: PhoneIcon } as Record<string, Icon>;

export interface TrafficProps {
  chartSeries: number[];
  labels: string[];
  sx?: SxProps;
  topStores?: { branchAddress: string; percentage: number }[];
}
export function Traffic({ chartSeries, labels, sx, topStores = [] }: TrafficProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels);
  const hasData = chartSeries.some(value => value > 0);

  return (
    <Card sx={{
      backgroundColor: '#1A1A1A',
      color: '#FFFFFF',
      ...sx
    }}>
      <CardHeader
        title="Traffic source"
        titleTypographyProps={{ color: 'inherit' }}
      />

      <CardContent>
        <Stack spacing={2}>
          {hasData ? (
            <>
              <Box sx={{ backgroundColor: '#1A1A1A', borderRadius: 1 }}>
                <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
              </Box>

              {topStores.length > 0 && (
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    borderRadius: 1,
                    padding: 2,
                    maxHeight: 120,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      width: '100%',
                      paddingBottom: '9px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF'
                    }}
                  >
                    Top Stores
                  </Typography>
                  <Stack spacing={1}>
                    {topStores.map((store, index) => (
                      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)'
                          }}
                        >
                          {store.branchAddress}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)'
                          }}
                        >
                          {store.percentage}%
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </>
          ) : (
            <Box
              sx={{
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 1,
                border: '1px dashed rgba(255, 255, 255, 0.12)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  textAlign: 'center',
                  mb: 2
                }}
              >
                No purchase data
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.3)',
                  textAlign: 'center',
                  maxWidth: '80%'
                }}
              >
                Information on the distribution of purchases by stores will appear after the first orders
              </Typography>
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
    chart: {
      background: '#1A1A1A',
      foreColor: '#FFFFFF',
      toolbar: {
        show: false
      }
    },
    colors: ['#3B82F6', '#10B981', '#F59E0B'],
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#FFFFFF'],
        fontSize: '14px',
        fontFamily: 'inherit'
      },
      dropShadow: {
        enabled: false
      }
    },
    labels,
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      labels: {
        colors: '#FFFFFF',
        useSeriesColors: false
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6
      },
      itemMargin: {
        horizontal: 8,
        vertical: 8
      }
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '65%',
          background: '#1A1A1A',
          labels: {
            show: false // Полностью отключаем все labels в центре
          }
        }
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      width: 0,
      colors: ['#1A1A1A']
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      theme: 'dark',
      style: {
        fontSize: '14px',
        fontFamily: 'inherit'
      },
      y: {
        formatter: function (val) {
          return val + '%';
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };
}