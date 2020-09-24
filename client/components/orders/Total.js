import React from 'react';

const Total = () => {
  const total = 2000;

  return (
    <div className='flex items-center mt-5 justify-between bg-white p-3'>
      <h2 className='text-gray-800 text-lg font-bold'>Total amount due:</h2>
      <p className='text-gray-800 mt-0'>$ {total}</p>
    </div>
  );
};

export default Total;
