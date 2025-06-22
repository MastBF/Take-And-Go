'use client';

import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false, loading: () => null });

export function Chart(props: any) {
  return <ApexChart {...props} />;
}