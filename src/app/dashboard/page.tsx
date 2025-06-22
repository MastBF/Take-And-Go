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
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { Traffic } from '@/components/dashboard/overview/traffic';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';

interface BranchPercentage {
  branchAddress: string;
  percentage: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  updatedAt: string;
  fileName: string;
}

interface Statistics {
  totalProfit: number;
  userCount: number;
  sales: number[];
  branchPercentage: BranchPercentage[];
  products: Product[];
}

export default function Page(): React.JSX.Element {
  const [statistics, setStatistics] = React.useState<Statistics | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [percents, setPercents] = React.useState<number[]>([]);
  const [branches, setBranches] = React.useState<string[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [timeframe, setTimeframe] = React.useState<string>('');
  const router = useRouter();

  React.useEffect(() => {
    const local = localStorage.getItem('authToken');
    if (local) {
      setToken(local);
    } else {
      router.replace('/auth/sign-in');
    }
  }, [router]);



  async function fetchStatistics(timeFrame: number) {
    try {
      if (!token) {
        throw new Error('No token provided');
      }

      const response = await axios.get<Statistics>(
        `https://gazansolution-production.up.railway.app/api/v1/Order/statistics?timeFrame=${timeFrame}`,
        {
          headers: {
            TokenString: token,
          },
        }
      );

      const data = response.data;
      setStatistics(data);
      console.log(data);
      const percentage = data.branchPercentage;
      setPercents(percentage.map((item) => item.percentage));
      setBranches(percentage.map((item) => item.branchAddress));

      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (timeFrame === 0) {
        // Day view - hours
        setTimeframe('Today');
        setCategories(Array.from({ length: data.sales.length }, (_, i) => `${i + 1}`));
      } else if (timeFrame === 1) {
        // Month view - days
        setTimeframe('This Month');
        setCategories(Array.from({ length: data.sales.length }, (_, i) => `${i + 1}`));
      } else {
        // Year view - months
        setTimeframe('This Year');
        setCategories(monthNames.slice(0, data.sales.length));
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  }

  React.useEffect(() => {
    if (token) {
      fetchStatistics(2); // Default to year view
    }
  }, [token]);

  return (
    <Grid container spacing={3} style={{ height: '100vh', position: 'relative' }} justifyContent="center" alignItems="center">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid>
          <Button
            variant="contained"
            sx={{
              width: 50,
              height: 60,
              borderRadius: '50%',
              backgroundColor: '#2c2c2c',
              color: '#f5f5f5',
              boxShadow: 2,
              border: '1px solid #444',
              '&:hover': {
                backgroundColor: '#3a3a3a',
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
              height: 60,
              borderRadius: '50%',
              backgroundColor: '#2c2c2c',
              color: '#f5f5f5',
              boxShadow: 2,
              border: '1px solid #444',
              '&:hover': {
                backgroundColor: '#3a3a3a',
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
              height: 60,
              borderRadius: '50%',
              backgroundColor: '#2c2c2c',
              color: '#f5f5f5',
              boxShadow: 2,
              border: '1px solid #444',
              '&:hover': {
                backgroundColor: '#3a3a3a',
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
          <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value={`${statistics?.userCount ?? 0}`} />
        </Grid>
      </Grid>

      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: timeframe, data: statistics?.sales ?? [] },
          ]}
          categories={categories}
          sx={{ height: '100%' }}
        />
      </Grid>

      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={percents} labels={branches} topStores={statistics?.branchPercentage ?? []} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={12} md={10} xs={12}>
        <LatestProducts
          products={statistics?.products?.map(product => ({
            ...product,
            image: product.image || '',
            updatedAt: new Date(product.updatedAt || new Date()),
          })) ?? []}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}