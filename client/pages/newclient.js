import React from 'react';
import Layout from '../components/Layout';

const NewClient = () => {
  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-normal'>New Client</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
              >
                Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                id='name'
                type='text'
                placeholder='Client Name'
                /* value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} */
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='lastName'
              >
                Last Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                id='lastName'
                type='text'
                placeholder='Client Last Name'
                /* value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} */
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='company'
              >
                Last Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                id='company'
                type='text'
                placeholder='Client Company'
                /* value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} */
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                id='email'
                type='email'
                placeholder='Client Email'
                /* value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} */
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='phone'
              >
                Email
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                id='phone'
                type='tel'
                placeholder='Client Phone'
                /* value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} */
              />
            </div>
            <input
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
              value='Registrar Cliente'
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewClient;
