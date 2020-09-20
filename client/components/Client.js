import React from 'react';

const Client = ({ client }) => {
  const { name, lastName, company, email } = client;

  return (
    <tr>
      <td className='border px-4 py-2'>
        {name} {lastName}
      </td>
      <td className='border px-4 py-2'>{company}</td>
      <td className='border px-4 py-2'>{email}</td>
    </tr>
  );
};

export default Client;
