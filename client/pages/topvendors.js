import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useQuery } from '@apollo/client';
import { queryBestVendor } from '../graphql/queries';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const TopVendors = () => {
  const { data, loading, error, startPolling, stopPolling } = useQuery(
    queryBestVendor
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return 'Loading...';

  console.log(data);

  const { bestVendor } = data;

  const graphicVendor = [];

  bestVendor.map((vendor, index) => {
    graphicVendor[index] = {
      ...vendor.vendor[0],
      total: vendor.total,
    };
  });

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-normal'>Top Vendors</h1>

      <BarChart
        className='mt-10'
        width={600}
        height={500}
        data={graphicVendor}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='total' fill='#3182CE' />
      </BarChart>
    </Layout>
  );
};

export default TopVendors;
