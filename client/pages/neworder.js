import React from 'react';
import Layout from '../components/Layout';
import AddClient from '../components/orders/AddClient';

const NewOrder = () => {
  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-normal'>Create Order</h1>
      <AddClient />
    </Layout>
  );
};

export default NewOrder;
