import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { queryGetClientsVendor } from '../graphql/queries';

const Index = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(queryGetClientsVendor);

  if (loading) return 'Loading...';

  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-normal'>Index</h1>

        <table className='table-auto shadow-md mt-10 w-full w-lg'>
          <thead className='bg-gray-800'>
            <tr className='text-white'>
              <th className='w-1/5 py-2'>Name</th>
              <th className='w-1/5 py-2'>Company</th>
              <th className='w-1/5 py-2'>Email</th>
            </tr>
          </thead>

          <tbody className='bg-white'>
            {data.getClientsVendor.map((client) => (
              <tr key={client.id}>
                <td className='border px-4 py-2'>
                  {client.name} {client.lastName}
                </td>
                <td className='border px-4 py-2'>{client.company}</td>
                <td className='border px-4 py-2'>{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Index;
