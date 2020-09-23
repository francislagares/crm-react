import React, { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';

import { SELECT_CLIENT, SELECT_PRODUCT, SELECT_QUANTITY } from '../../types';

const OrderState = ({ children }) => {
  // Order state
  const initialState = {
    client: [],
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  return <OrderContext.Provider value={{}}>{children}</OrderContext.Provider>;
};

export default OrderState;
