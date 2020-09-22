import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const clients = [
  { id: 1, name: 'Foo' },
  { id: 2, name: 'Bar' },
  { id: 3, name: 'Baz' },
];

const AddClient = () => {
  const [client, setClient] = useState([]);

  useEffect(() => {
    console.log(client);
  }, [client]);

  const selectClient = (client) => {
    setClient(client);
  };

  return (
    <Select
      options={clients}
      isMulti={true}
      onChange={(option) => selectClient(option)}
      getOptionValue={(options) => options.id}
      getOptionLabel={(options) => options.name}
      placeholder='Select client'
      noOptionMessage={() => 'No results'}
    />
  );
};

export default AddClient;
