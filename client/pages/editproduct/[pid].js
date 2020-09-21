import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { queryGetProduct } from '../../graphql/queries';
import { Formik } from 'formik';
import * as Yup from 'yup';

const EditProduct = () => {
  // Get current ID
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data, loading, error } = useQuery(queryGetProduct, {
    variables: {
      id,
    },
  });

  // Validation Schema
  const schemaValidation = Yup.object({
    name: Yup.string().required('A product name is required'),
    stock: Yup.number()
      .required('Insert available quantity')
      .positive('Negative numbers are not allowed')
      .integer('Stocks can only be whole numbers'),
    price: Yup.number()
      .required('Price is required')
      .positive('Negative numbers are not allowed'),
  });

  if (loading) return 'Loading...';

  const { getProduct } = data;

  // Function to update product on DB
  const updateProductInfo = async (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-normal'>Edit product</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <Formik
            enableReinitialize
            initialValues={getProduct}
            validationSchema={schemaValidation}
            onSubmit={(values) => updateProductInfo(values)}
          >
            {(props) => {
              return (
                <form
                  className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                  onSubmit={props.handleSubmit}
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
                      placeholder='Product Name'
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.name && props.errors.name ? (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{props.errors.name}</p>
                    </div>
                  ) : null}

                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='stock'
                    >
                      Available Stock
                    </label>
                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                      id='stock'
                      type='number'
                      placeholder='Available Stock'
                      value={props.values.stock}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.stock && props.errors.stock ? (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{props.errors.stock}</p>
                    </div>
                  ) : null}

                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='price'
                    >
                      Price
                    </label>
                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                      id='price'
                      type='number'
                      placeholder='Price'
                      value={props.values.price}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.price && props.errors.price ? (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{props.errors.price}</p>
                    </div>
                  ) : null}

                  <input
                    type='submit'
                    className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
                    value='Update Product'
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
