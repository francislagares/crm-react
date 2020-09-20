import React from 'react';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { mutationDeleteClient } from '../graphql/mutations';
import { queryGetClientsVendor } from '../graphql/queries';

const Client = ({ client }) => {
  // Extract variables from client
  const { id, name, lastName, company, email } = client;

  // Mutation to delete client
  const [deleteClient] = useMutation(mutationDeleteClient, {
    update(cache) {
      // Get object we want to use from cache
      const { getClientsVendor } = cache.readQuery({
        query: queryGetClientsVendor,
      });

      cache.writeQuery({
        query: queryGetClientsVendor,
        data: {
          getClientsVendor: getClientsVendor.filter(
            (currentClient) => currentClient.id !== id
          ),
        },
      });
    },
  });

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteClient({
            variables: {
              id,
            },
          });
          console.log(data);
          Swal.fire('Deleted!', data.deleteClient, 'success');
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <tr>
      <td className='border px-4 py-2'>
        {name} {lastName}
      </td>
      <td className='border px-4 py-2'>{company}</td>
      <td className='border px-4 py-2'>{email}</td>
      <td className='border px-4 py-2'>
        <button
          type='button'
          className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
          onClick={() => confirmDelete(id)}
        >
          Delete
          <svg
            className='w-4 h-4 ml-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Client;
