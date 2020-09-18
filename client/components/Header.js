import React from 'react';
import { useQuery } from '@apollo/client';
import { queryGetUser } from '../graphql/queries';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(queryGetUser);

  if (loading) return 'Loading...';

  // Redirect to login if no user data
  if (!data) {
    return router.push('/login');
  }

  const { name } = data.getUser;

  const signOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className='flex justify-between mb-6'>
      <p className='m-2'>Hello {name}</p>
      <button
        onClick={() => signOut()}
        type='button'
        className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
      >
        Sign Out
      </button>
    </div>
  );
};

export default Header;
