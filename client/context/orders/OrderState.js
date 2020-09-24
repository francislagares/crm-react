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

  return (
    <OrderContext.Provider value={{ addClient }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
