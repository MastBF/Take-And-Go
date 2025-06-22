'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

export interface SalesProps {
  chartSeries: { name: string; data: number[] }[];
  categories: string[];
  sx?: SxProps;
}

export function Sales({ chartSeries, categories, sx }: SalesProps): React.JSX.Element {
  const chartOptions = useChartOptions(categories);
  return (
    <Card sx={{ 
      backgroundColor: '#1A1A1A',
      color: '#FFFFFF',
      ...sx 
    }}>
      <CardHeader
        title="Sales"
        titleTypographyProps={{ color: 'inherit' }}
        action={
          <Button
            color="inherit"
            size="small"
            startIcon={<ArrowClockwiseIcon />}
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Refresh
          </Button>
        }
      />
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
      <CardContent>
        <Chart 
          height={350} 
          options={chartOptions} 
          series={chartSeries} 
          type="bar" 
          width="100%"
        />
      </CardContent>
    </Card>
  );
}

function useChartOptions(categories: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: {
      type: 'bar',
      background: 'transparent',
      foreColor: '#FFFFFF', 
      toolbar: {
        show: false
      },
    },
    colors: ['#4FC3F7', '#26A69A', '#FFA726'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: true,
        color: 'rgba(255, 255, 255, 0.12)'
      },
      axisTicks: {
        show: true,
        color: 'rgba(255, 255, 255, 0.12)'
      },
      labels: {
        style: {
          colors: 'rgba(255, 255, 255, 0.6)',
          fontSize: '12px',
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: 'rgba(255, 255, 255, 0.6)',
          fontSize: '12px',
        },
        formatter: function (val) {
          return val.toString();
        }
      },
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val.toString();
        }
      }
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.12)',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#FFFFFF'
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12
      }
    }
  };
}