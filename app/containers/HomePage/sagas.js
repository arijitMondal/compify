import { call, takeLatest, put, all } from 'redux-saga/effects';
import request, { makeReqOptions } from 'utils/request';
import { getProductDetails } from 'utils/helpers';
import { flashMessage, receivedProductCompareInfo, failedReceiveingProductInfo } from './actions';
import * as types from './constants';

function* getProductCompareInfo(action) {
  try {
    const [product1, product2] = yield all([
      call(request, action.payload.firstProductUrl, makeReqOptions()),
      call(request, action.payload.secondProductUrl, makeReqOptions()),
    ]);
    const firstProductInfo = getProductDetails(product1);
    const secondProductInfo = getProductDetails(product2);
    const data = { firstProductInfo, secondProductInfo };
    yield put(receivedProductCompareInfo(data));
  } catch (e) {
    yield put(failedReceiveingProductInfo(e));
    yield put(flashMessage('Couldnot get product information', 'error'));
  }
}

export default function* productCompareSaga() {
  yield [takeLatest(types.REQUEST_COMPARE_PRODUCTS, getProductCompareInfo)];
}
