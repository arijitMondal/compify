import { fromJS } from 'immutable';
import {
  REQUEST_COMPARE_PRODUCTS,
  RECEIVED_COMPARE_PRODUCTS,
  FAILED_RECEIVEING_COMPARE_PRODUCTS,
} from './constants';

const initialState = fromJS({
  loading: false,
});

function feedPosts(state = initialState, action) {
  switch (action.type) {
    case REQUEST_COMPARE_PRODUCTS: {
      return state;
    }
    case RECEIVED_COMPARE_PRODUCTS: {
      return state;
    }
    case FAILED_RECEIVEING_COMPARE_PRODUCTS: {
      // return state.set('loadStatus', 1).set('pageStatus', action.payload);
      return state;
    }


    default:
      return state;
  }
}

export default feedPosts;
