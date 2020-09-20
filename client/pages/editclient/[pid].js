import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { queryGetClient } from '../../graphql/queries';
import { mutationUpdateClient } from '../../graphql/mutations';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const EditClient = () => {
  // Get current ID
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Query to get client
  const { data, loading, error } = useQuery(queryGetClient, {
    variables: {
      id,
    },
  });

  // Mutation to update client
  const [updateClient] = useMutation(mutationUpdateClient);

  // Validation Schema
  const schemaValidation = Yup.object({
    name: Yup.string().required('You must provide a client name'),
    lastName: Yup.string().required('You must provide a client last name'),
    company: Yup.string().required('You must provide a company name'),
    email: Yup.string()
      .email('Email not valid')
      .required('You must provide a client email'),
  });

  if (loading) return 'Loading...';

  const { getClient } = data;

  // Function to update client on DB
  const updateClientInfo = async (values) => {
    // Extract variables from values
    const { name, lastName, company, email, phone } = values;

    try {
      const { data } = updateClient({
        variables: {
          id,
          input: {
            name,
            lastName,
            company,
            email,
            phone,
          },
        },
      });
      // Sweet alert
      Swal.fire('Updated!', 'Client successfully updated', 'success');
      // Redirect to clients area
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-normal'>Edit Client</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={getClient}
            onSubmit={(values) => {
              updateClientInfo(values);
            }}
          >
            {(props) => {
              console.log(props);
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
                      placeholder='Client Name'
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
                      htmlFor='lastName'
                    >
                      Last Name
                    </label>
                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                      id='lastName'
                      type='text'
                      placeholder='Client Last Name'
                      value={props.values.lastName}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.lastName && props.errors.lastName ? (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{props.errors.lastName}</p>
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
                      value={props.values.company}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.company && props.errors.company ? (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{props.errors.company}</p>
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
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.email && props.errors.email ? (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{props.errors.email}</p>
                    </div>
                  ) : null}

                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='phone'
                    >
                      Phone
                    </label>
                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline'
                      id='phone'
                      type='tel'
                      placeholder='Client Phone'
                      value={props.values.phone}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  <input
                    type='submit'
                    className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
                    value='Update Client'
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

export default EditClient;
