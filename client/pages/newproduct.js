import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { mutationNewProduct } from '../graphql/mutations';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const NewProduct = () => {
  const router = useRouter();

  const [newProduct] = useMutation(mutationNewProduct);

  const formik = useFormik({
    initialValues: {
      name: '',
      stock: '',
      price: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('A product name is required'),
      stock: Yup.number()
        .required('Insert available quantity')
        .positive('Negative numbers are not allowed')
        .integer('Stocks can only be whole numbers'),
      price: Yup.number()
        .required('Price is required')
        .positive('Negative numbers are not allowed'),
    }),
    onSubmit: async (values) => {
      const { name, stock, price } = values;

      try {
        const { data } = await newProduct({
          variables: {
            input: {
              name,
              stock,
              price,
            },
          },
        });
        // Show confirmation alert
        Swal.fire('Product created', 'Product successfully created', 'success');
        // Redirect to products
        router.push('/products');
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-normal'>Create New Product</h1>

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
                placeholder='Product Name'
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
                htmlFor='stock'
              >
                Available Stock
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                id='stock'
                type='number'
                placeholder='Available Stock'
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.stock && formik.errors.stock ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.stock}</p>
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
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.price && formik.errors.price ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.price}</p>
              </div>
            ) : null}

            <input
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
              value='Add New Product'
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewProduct;
