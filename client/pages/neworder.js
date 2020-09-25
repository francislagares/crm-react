import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import AddClient from '../components/orders/AddClient';
import AddProduct from '../components/orders/AddProduct';
import OrderContext from '../context/orders/OrderContext';
import OrderSummary from '../components/orders/OrderSummary';
import Total from '../components/orders/Total';
import { useMutation } from '@apollo/client';
import { mutationNewOrder } from '../graphql/mutations';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const NewOrder = () => {
  const router = useRouter();

  const [message, setMessage] = useState(null);

  // Use context to extract functions and values
  const orderContext = useContext(OrderContext);
  const { client, products, total } = orderContext;

  // Mutation to create new order
  const [newOrder] = useMutation(mutationNewOrder);

  const validateOrder = () => {
    return !products.every((product) => product.quantity > 0) ||
      total === 0 ||
      client.length === 0
      ? 'opacity-50 cursor-not-allowed'
      : '';
  };

  const createOrder = async () => {
    const { id } = client;

    // Remove unwanted properties from products
    const order = products.map(({ __typename, stock, ...product }) => product);
    try {
      const { data } = await newOrder({
        variables: {
          input: {
            client: id,
            total,
            order,
          },
        },
      });
      // Show confirmation alert
      Swal.fire('Order registered', 'Order successfully created', 'success');
      // Redirect
      router.push('/orders');
    } catch (err) {
      setMessage(err.message.replace('GraphQL error: ', ''));

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const showMessage = () => {
    return (
      <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{message}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-normal'>Create Order</h1>
      {message && showMessage()}
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <AddClient />
          <AddProduct />
          <OrderSummary />
          <Total />
          <button
            type='button'
            className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
            onClick={() => createOrder()}
          >
            Register Order
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewOrder;
