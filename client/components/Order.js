import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { mutationUpdateOrder } from '../graphql/mutations';

const Order = ({ order }) => {
  // Extract variables from object
  const {
    id,
    client: { name, lastName, email, phone },
    total,
    status,
    client,
  } = order;

  // Mutation to update order status
  const [updateOrder] = useMutation(mutationUpdateOrder);

  // Create local state for order status
  const [statusOrder, setStatusOrder] = useState(status);
  const [classState, setClassState] = useState('');

  // Update when order status changes
  useEffect(() => {
    if (statusOrder) {
      setStatusOrder(statusOrder);
    }
    classOrder();
  }, [statusOrder]);

  // Function that changes order className by status
  const classOrder = () => {
    if (statusOrder === 'Pending') {
      setClassState('border-yellow-500');
    } else if (statusOrder === 'Fulfilled') {
      setClassState('border-green-500');
    } else {
      setClassState('border-red-800');
    }
  };

  const updateOrderStatus = async (newStatus) => {
    console.log(newStatus);
    try {
      const { data } = await updateOrder({
        variables: {
          id,
          input: {
            status: newStatus,
            client: client.id,
          },
        },
      });

      setStatusOrder(data.updateOrder.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${classState} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}
    >
      <div>
        <p className='font-bold text-gray-800'>
          Client: {name} {lastName}
        </p>
        {email && (
          <p className='flex items-center my-2'>
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              ></path>
            </svg>
            {email}
          </p>
        )}
        {phone && (
          <p className='flex items-center my-2'>
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
              ></path>
            </svg>
            {phone}
          </p>
        )}
        <h2 className='text-gray-800 font-bold mt-10'>Order Status:</h2>
        <select
          className='mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs'
          value={statusOrder}
          onChange={(e) => updateOrderStatus(e.target.value)}
        >
          <option value='Fulfilled'>Fulfilled</option>
          <option value='Pending'>Pending</option>
          <option value='Cancelled'>Cancelled</option>
        </select>
      </div>
      <div>
        <h2 className='text-gray-800 font-bold mt-2'>Order Summary</h2>
        {order.order.map((item) => (
          <div key={item.id} className='mt-4'>
            <p className='text-sm text-gray-600'>Product: {item.name} </p>
            <p className='text-sm text-gray-600'>Quantity: {item.quantity} </p>
          </div>
        ))}

        <p className='text-gray-800 mt-3 font-bold'>
          Total Amount: <span className='font-light'>$ {total}</span>
        </p>
        <button className='uppercase text-xs flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight '>
          Delete Order
          <svg
            className='w-4 h-4 ml-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Order;
