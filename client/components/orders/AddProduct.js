import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import { queryGetProducts } from '../../graphql/queries';

const AddProduct = () => {
  // Component local state
  const [products, setProducts] = useState([]);

  // Get data from DB
  const { data, loading, error } = useQuery(queryGetProducts);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const selectProduct = (product) => {
    setProducts(product);
  };

  if (loading) return null;
  const { getProducts } = data;

  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>
        2. Select or search for products
      </p>
      <Select
        className='mt-3'
        options={getProducts}
        isMulti={true}
        onChange={(product) => selectProduct(product)}
        getOptionValue={(product) => product.id}
        getOptionLabel={(product) =>
          `${product.name} - ${product.stock} Available`
        }
        placeholder='Search or Select Product'
        noOptionMessage={() => 'No results'}
      />
    </>
  );
};

export default AddProduct;
