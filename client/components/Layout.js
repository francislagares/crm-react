import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>CRM - Clients Administration</title>
        <link
          href='https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'
          rel='stylesheet'
        />
      </Head>

      <div className='bg-gray-200 min-h-screen'>
        <div className='flex min-h-screen'>
          <Sidebar />

          <main className='sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
