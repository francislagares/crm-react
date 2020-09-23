import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import { queryGetClientsVendor } from '../../graphql/queries';

const AddClient = () => {
  const [client, setClient] = useState([]);

  const { data, loading, error } = useQuery(queryGetClientsVendor);
  console.log(data, loading, error);

  if (loading) return null;

  const { getClientsVendor } = data;

  useEffect(() => {
    console.log(client);
  }, [client]);

  const selectClient = (client) => {
    setClient(client);
  };

  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>
        1. Assign client to order
      </p>
      <Select
        className='mt-3'
        options={getClientsVendor}
        onChange={(option) => selectClient(option)}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) => options.name}
        placeholder='Select client'
        noOptionMessage={() => 'No results'}
      />
    </>
  );
};

export default AddClient;
