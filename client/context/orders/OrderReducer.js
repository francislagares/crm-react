import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  SELECT_QUANTITY,
  UPDATE_TOTAL,
} from '../../types';

const OrderReducer = (state, action) => {
  switch (action.type) {
    case SELECT_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case SELECT_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };
    case UPDATE_TOTAL:
      return {
        ...state,
        total: state.products.reduce(
          (newTotal, product) => (newTotal += product.price * product.quantity),
          0
        ),
      };
    default:
      return state;
  }
};

export default OrderReducer;
