import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { mutationAuthUser } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const Login = () => {
  // State to handle backend messages
  const [message, setMessage] = useState(null);

  // Mutation to authenticate user
  const [authenticateUser] = useMutation(mutationAuthUser);

  // Use router
  const router = useRouter();

  // Form validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email not valid')
        .required('Email can not be empty'),
      password: Yup.string().required('You need to provide your password'),
    }),
    onSubmit: async (values) => {
      // Extract variables from values
      const { email, password } = values;

      try {
        const { data } = await authenticateUser({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        setMessage('Authenticating...');

        const { token } = data.authenticateUser;
        localStorage.setItem('token', token);

        setTimeout(() => {
          setMessage(null);
          // Redirect to clients page
          router.push('/');
        }, 2000);
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
        <h1 className='text-center text-2xl text-white font-light'>Login</h1>
        {message && showMessage()}

        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-sm'>
            <form
              className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
              onSubmit={formik.handleSubmit}
            >
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
                value='Log In'
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
