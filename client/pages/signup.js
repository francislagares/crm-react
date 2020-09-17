import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { mutationNewUser } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const Signup = () => {
  // State to handle backend messages
  const [message, setMessage] = useState(null);

  // Mutation to create new user
  const [newUser] = useMutation(mutationNewUser);

  // Use Router
  const router = useRouter();

  // Form validation
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Your name is required'),
      lastName: Yup.string().required('Your last name is required'),
      email: Yup.string()
        .email('Email not valid')
        .required('Email is required'),
      password: Yup.string()
        .required('You need to provide a password')
        .min(6, 'Password must include at least 6 characters'),
    }),
    onSubmit: async (values) => {
      // Extract variables from values
      const { name, lastName, email, password } = values;

      try {
        const { data } = await newUser({
          variables: {
            input: {
              name,
              lastName,
              email,
              password,
            },
          },
        });
        // User created successfully
        setMessage(`User ${data.newUser.name} has been created!`);

        setTimeout(() => {
          setMessage(null);
          // Redirect to login page
          router.push('/login');
        }, 3000);
      } catch (err) {
        setMessage(err.message.replace('GraphQL Error:', ''));

        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    },
  });

  const showMessage = () => {
    return (
      <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-gray-700 font-bold text-center mx-auto'>
        {message}
      </div>
    );
  };

  return (
    <>
      <Layout>
        {message && showMessage()}

        <h1 className='text-center text-2xl text-white font-light'>
          Create Account
        </h1>

        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-sm'>
            <form
              className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
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
                  placeholder='User Name'
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
                  placeholder='Last Name'
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
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                  id='email'
                  type='email'
                  placeholder='User Email'
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
                  htmlFor='password'
                >
                  Password
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                  id='password'
                  type='password'
                  placeholder='User Password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.password && formik.errors.password ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}

              <input
                type='submit'
                className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
                value='Sign Up'
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Signup;
