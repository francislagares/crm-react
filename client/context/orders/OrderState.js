import React, { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';

import { SELECT_CLIENT, SELECT_PRODUCT, SELECT_QUANTITY } from '../../types';

const OrderState = ({ children }) => {
  // Order state
  const initialState = {
    client: {},
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Modifies client
  const addClient = (client) => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client,
    });
  };

  // Modifies product
  const addProduct = (selectedProducts) => {
    let newState;
    if (state.products.length > 0) {
      // Make a copy from second array to assign it to the first array
      newState = selectedProducts.map((product) => {
        const newObject = state.products.find(
          (productState) => productState.id === product.id
        );
        return { ...product, ...newObject };
      });
    } else {
      newState = selectedProducts;
    }

    dispatch({
      type: SELECT_PRODUCT,
      payload: products,
    });
  };

  // Modifies product quantity
  const productQuantity = (newProduct) => {
    dispatch({
      type: SELECT_QUANTITY,
      payload: newProduct,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        products: state.products,
        addClient,
        addProduct,
        productQuantity,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
