import Layout from '../components/Layout';
import Order from '../components/Order';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { queryGetOrdersByVendor } from '../graphql/queries';

const Orders = () => {
  const { data, loading, error } = useQuery(queryGetOrdersByVendor);

  console.log(data, loading, error);
  if (loading) return 'Loading...';

  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-normal'>Orders</h1>

        <Link href='/neworder'>
          <a className='bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold'>
            New Order
          </a>
        </Link>

        {data.getOrdersByVendor.length === 0 ? (
          <p className='mt-5 text-center text-2xl'>No orders yet.</p>
        ) : (
          data.getOrdersByVendor.map((order) => (
            <Order key={order.id} order={order} />
          ))
        )}
      </Layout>
    </div>
  );
};

export default Orders;
