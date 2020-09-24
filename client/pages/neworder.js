import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AddClient from '../components/orders/AddClient';
import AddProduct from '../components/orders/AddProduct';
import OrderContext from '../context/orders/OrderContext';
import OrderSummary from '../components/orders/OrderSummary';

const NewOrder = () => {
  // Use context to extract functions and values
  const orderContext = useContext(OrderContext);

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-normal'>Create Order</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <AddClient />
          <AddProduct />
          <OrderSummary />
        </div>
      </div>
    </Layout>
  );
};

export default NewOrder;
