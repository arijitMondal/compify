import { fromJS } from 'immutable';
import {
  REQUEST_COMPARE_PRODUCTS,
  RECEIVED_COMPARE_PRODUCTS,
  FAILED_RECEIVEING_COMPARE_PRODUCTS,
  RESET_COMPARE_PRODUCTS,
  DISPLAY_ALERT,
} from './constants';

const initialState = fromJS({
  loading: false,
});

function feedPosts(state = initialState, action) {
  switch (action.type) {
    case REQUEST_COMPARE_PRODUCTS: {
      return state.set('loading', true);
    }
    case RECEIVED_COMPARE_PRODUCTS: {
      const { firstProductInfo, secondProductInfo } = action.payload;
      return state.set('loading', false).set('firstProductInfo', firstProductInfo).set('secondProductInfo', secondProductInfo);
    }
    case FAILED_RECEIVEING_COMPARE_PRODUCTS: {
      return state.set('loading', false).delete('firstProductInfo').delete('secondProductInfo');
    }
    case RESET_COMPARE_PRODUCTS: {
      return state.delete('firstProductInfo').delete('secondProductInfo');
    }
    case DISPLAY_ALERT: {
      return state.set('alerts', action.payload);
    }
    default:
      return state;
  }
}

export default feedPosts;
