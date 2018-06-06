import { createSelector } from 'reselect';

const myFeed = () => (state) => state.get('myFeed');

export const getFeedLoadStatus = () =>
  createSelector(myFeed(), (store) => store.get('loadStatus'));
