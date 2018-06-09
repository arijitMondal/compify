import { call, takeLatest, put, all } from 'redux-saga/effects';
import request, { makeReqOptions } from 'utils/request';
import { getProductDetails } from 'utils/helpers';
import { receivedProductCompareInfo, failedReceiveingProductInfo } from './actions';
import * as types from './constants';

function* getProductCompareInfo(action) {
  try {
    const [product1, product2] = yield all([
      call(request, action.payload.requestUrl1, makeReqOptions()),
      call(request, action.payload.requestUrl2, makeReqOptions()),
    ]);
    const data = { product1, product2 };
    const info = getProductDetails(product1);
    yield put(receivedProductCompareInfo(data));
  } catch (e) {
    // console.log(e);
    yield put(failedReceiveingProductInfo(e.response.status));
  }
}

export default function* myFeedSaga() {
  const sagasWatcher = yield [takeLatest(types.REQUEST_COMPARE_PRODUCTS, getProductCompareInfo)];
  // yield take(types.KILL_MY_FEED_POSTS_SAGA);
  // yield sagasWatcher.map((task) => cancel(task));
}
