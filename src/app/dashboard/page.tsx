'use client';
import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';
import axios from 'axios';

// export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const [statistics, setStatistics] = React.useState(null);
  const token = localStorage.getItem('authToken')

    async function fetchStatistics(timeFrame: number) {
      try {
        const response = await axios.get(`https://gazansolution-production.up.railway.app/api/v1/Order/statistics?timeFrame=${timeFrame}`, {
          headers: {
            TokenString: token
          }
        }
        );
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    }
    React.useEffect(() => {
      fetchStatistics(0);
    },[])

  return (
    <Grid container spacing={3} style={{ height: '100vh' }} justifyContent="center" alignItems="center">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid>
          <Button
            variant="contained"
            sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'white',
              color: 'black',
              boxShadow: 2,
              border: '1px solid #ededed',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
            onClick={() => fetchStatistics(0)}
          >
            D
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid #ededed',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
            onClick={() => fetchStatistics(1)}
          >
            M
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid #ededed',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
            onClick={() => fetchStatistics(2)}
          >
            Y
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="center" alignItems="center" width={'100%'}>
        <Grid lg={3} sm={6} xs={12}>
          <Budget diff={12} trend="up" sx={{ height: '100%' }} value={`֏${statistics?.totalProfit ?? 0}`} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value={`${statistics?.userCount ?? 0}`}/>
        </Grid>
      </Grid>

      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'This year', data: statistics?.sales ?? 0 },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} topStores={statistics?.branchPercentage ?? []} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={12} md={10} xs={12}>
        <LatestProducts
          products={statistics?.products ?? 0}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
