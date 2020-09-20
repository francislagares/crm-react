import Layout from '../components/Layout';
import Client from '../components/Client';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { queryGetClientsVendor } from '../graphql/queries';
import Link from 'next/link';

const Index = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(queryGetClientsVendor);
  console.log(data, loading, error);

  if (loading) return 'Loading...';

  if (!data.getClientsVendor) {
    return router.push('/login');
  }

  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-normal'>Index</h1>
        <Link href='/newclient'>
          <a className='bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold'>
            New Client
          </a>
        </Link>

        <table className='table-auto shadow-md mt-10 w-full w-lg'>
          <thead className='bg-gray-800'>
            <tr className='text-white'>
              <th className='w-1/5 py-2'>Name</th>
              <th className='w-1/5 py-2'>Company</th>
              <th className='w-1/5 py-2'>Email</th>
              <th className='w-1/5 py-2'>Delete</th>
            </tr>
          </thead>

          <tbody className='bg-white'>
            {data.getClientsVendor.map((client) => (
              <Client key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Index;
