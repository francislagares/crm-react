import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import { queryGetClientsVendor } from '../../graphql/queries';
import OrderContext from '../../context/orders/OrderContext';

const AddClient = () => {
  const [client, setClient] = useState([]);

  // Order context
  const orderContext = useContext(OrderContext);
  const { addClient } = orderContext;

  // Gets data from DB
  const { data, loading, error } = useQuery(queryGetClientsVendor);

  if (loading) return null;

  const { getClientsVendor } = data;

  useEffect(() => {
    addClient(client);
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
        onChange={(client) => selectClient(client)}
        getOptionValue={(client) => client.id}
        getOptionLabel={(client) => client.name}
        placeholder='Select client'
        noOptionMessage={() => 'No results'}
      />
    </>
  );
};

export default AddClient;
