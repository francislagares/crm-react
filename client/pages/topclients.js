import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useQuery } from '@apollo/client';
import { queryBestClients } from '../graphql/queries';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const TopClients = () => {
  const { data, loading, error, startPolling, stopPolling } = useQuery(
    queryBestClients
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return 'Loading...';

  console.log(data);

  const { bestClients } = data;

  const graphicClient = [];

  bestClients.map((client, index) => {
    graphicClient[index] = {
      ...client.client[0],
      total: client.total,
    };
  });

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-normal'>Top Clients</h1>

      <ResponsiveContainer width={'99%'} height={550}>
        <BarChart
          className='mt-10'
          width={600}
          height={500}
          data={graphicClient}
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
      </ResponsiveContainer>
    </Layout>
  );
};

export default TopClients;
