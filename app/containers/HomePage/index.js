/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Growl from 'containers/Growl/Loadable';
import { Loader } from 'styles/Loader';
import CompareView from './compareView';
import reducer from './reducer';
import saga from './sagas';
import { TopBar, CompareForm, PageHeader } from './styles';
import * as CompareProductActions from './actions';
import {
  getProductComparisionLoadStatus,
  getFirstProductInfo,
  getSecondProductInfo,
} from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { firstProductUrl: '', secondProductUrl: '' };
  }

  handleFirstItemValue =(event) => {
    this.setState({ firstProductUrl: event.target.value });
  }

  handleSecondItemValue =(event) => {
    this.setState({ secondProductUrl: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstProductUrl, secondProductUrl } = this.state;
    if (!firstProductUrl.length || !secondProductUrl.length) {
      this.props.actions.productCompareActions.flashMessage('please provide two urls from lazada website to compare', 'error');
    } else {
      const data = { firstProductUrl, secondProductUrl };
      const firstUrl = document.createElement('a');
      const secondUrl = document.createElement('a');
      firstUrl.setAttribute('href', firstProductUrl);
      secondUrl.setAttribute('href', secondProductUrl);
      if (firstUrl.hostname !== secondUrl.hostname || firstUrl.hostname !== 'www.lazada.sg') {
        this.props.actions.productCompareActions.flashMessage('please choose both url from lazada website', 'error');
      } else {
        this.props.actions.productCompareActions.getProductsCompareInfo(data);
      }
    }
  }

  resetForm = () => {
    this.setState({ secondProductUrl: '', firstProductUrl: '' });
    this.props.actions.productCompareActions.resetProductsCompareInfo();
  }

  render() {
    const { loadingProducts, firstProductInfo, secondProductInfo } = this.props;
    const { firstProductUrl, secondProductUrl } = this.state;
    return (
      <div>
        <Growl />
        <TopBar><h1></h1></TopBar>
        <PageHeader>Products Compare</PageHeader>
        <CompareForm onSubmit={this.handleSubmit}>
          <label htmlFor="firstProductLink">
            <input id="firstProductLink" placeholder="Please enter first product link" className="form-input" type="text" value={this.state.firstProductUrl} onChange={this.handleFirstItemValue} />
          </label>
          <label htmlFor="secondProductLink">
            <input id="secondProductLink" placeholder="Please enter second product link" className="form-input" type="text" value={this.state.secondProductUrl} onChange={this.handleSecondItemValue} />
          </label>
          <input type="submit" className="btn btnSubmit" disabled={!firstProductUrl.length || !secondProductUrl.length} value="Compare Now" />
          <input onClick={this.resetForm} type="button" className="btn" value="Reset" disabled={!firstProductUrl.length || !secondProductUrl.length} />
        </CompareForm>
        { !loadingProducts && firstProductInfo.productName && <CompareView firstProductInfo={firstProductInfo} secondProductInfo={secondProductInfo} /> }
        { loadingProducts && <div><Loader large><span /></Loader></div> }
      </div>
    );
  }
}


HomePage.defaultProps = {
  firstProductInfo: {},
  secondProductInfo: {},
};

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  loadingProducts: PropTypes.bool.isRequired,
  firstProductInfo: PropTypes.object.isRequired,
  secondProductInfo: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loadingProducts: getProductComparisionLoadStatus(),
  firstProductInfo: getFirstProductInfo(),
  secondProductInfo: getSecondProductInfo(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    productCompareActions: bindActionCreators(CompareProductActions, dispatch),
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const productCompareReducer = injectReducer({ key: 'home', reducer });
const productCompareSaga = injectSaga({ key: 'home', saga });

export default compose(productCompareReducer, productCompareSaga, withConnect)(HomePage);
