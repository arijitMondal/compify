import { createSelector } from 'reselect';

const productCompare = () => (state) => state.get('home');

export const getProductComparisionLoadStatus = () =>
  createSelector(productCompare(), (store) => store.get('loading'));

export const getFirstProductInfo = () =>
  createSelector(productCompare(), (store) => store.get('firstProductInfo'));

export const getSecondProductInfo = () =>
  createSelector(productCompare(), (store) => store.get('secondProductInfo'));

export const getAlerts = () =>
  createSelector(productCompare(), (store) => store.get('alerts'));
