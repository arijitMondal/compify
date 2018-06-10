import * as types from './constants';

export const getProductsCompareInfo = (payload) => ({
  type: types.REQUEST_COMPARE_PRODUCTS,
  payload,
});
export const receivedProductCompareInfo = (payload) => ({
  type: types.RECEIVED_COMPARE_PRODUCTS,
  payload,
});
export const failedReceiveingProductInfo = (payload) => ({
  type: types.FAILED_RECEIVEING_COMPARE_PRODUCTS,
  payload,
});

export const flashMessage = (text, type) => ({
  type: types.DISPLAY_ALERT,
  payload: { text, type },
});
