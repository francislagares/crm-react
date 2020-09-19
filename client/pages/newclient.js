import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const NewClient = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('You must provide a client name'),
      lastName: Yup.string().required('You must provide a client last name'),
      company: Yup.string().required('You must provide a company name'),
      email: Yup.string()
        .email('Email not valid')
        .required('You must provide a client email'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-normal'>New Client</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form
            className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >
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
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.name && formik.errors.name ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}

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
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.lastName && formik.errors.lastName ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.lastName}</p>
              </div>
            ) : null}

            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='company'
              >
                Company
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                id='company'
                type='text'
                placeholder='Client Company'
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.company && formik.errors.company ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.company}</p>
              </div>
            ) : null}

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
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.email && formik.errors.email ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

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
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
