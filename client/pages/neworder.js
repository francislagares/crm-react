import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AddClient from '../components/orders/AddClient';
import AddProduct from '../components/orders/AddProduct';
import OrderContext from '../context/orders/OrderContext';

const NewOrder = () => {
  // Use context to extract functions and values
  const orderContext = useContext(OrderContext);

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-normal'>Create Order</h1>
      <AddClient />
      <AddProduct />
    </Layout>
  );
};

export default NewOrder;
