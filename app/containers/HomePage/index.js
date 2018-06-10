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
import starImg from 'fontSource/star.png';
// import homeDeliveryImg from 'fontSource/truck.svg';
import { Loader } from 'styles/Loader';
import reducer from './reducer';
import saga from './sagas';
import { CompareForm } from './styles';
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

  render() {
    const { loadingProducts, firstProductInfo, secondProductInfo } = this.props;
    const { firstProductUrl, secondProductUrl } = this.state;
    return (
      <div>
        <Growl />
        <h2 className="alignCenter">Lazada Product Compare</h2>
        <CompareForm onSubmit={this.handleSubmit}>
          <label htmlFor="firstProductLink">
            <span>Please enter first product link </span>
            <input id="firstProductLink" className="form-input" type="text" value={this.state.value} onChange={this.handleFirstItemValue} />
          </label>
          <label htmlFor="secondProductLink">
            <span>Please enter second product link </span>
            <input id="secondProductLink" className="form-input" type="text" value={this.state.value} onChange={this.handleSecondItemValue} />
          </label>
          <input type="submit" className="btn btn-submit" disabled={!firstProductUrl.length || !secondProductUrl.length} value="Submit" />
        </CompareForm>
        { !loadingProducts && firstProductInfo.productName &&
        <div className="Rtable Rtable--3cols Rtable--collapse">
          <div className="Rtable-cell"></div>
          <div className="Rtable-cell">
            <img alt={`${firstProductInfo.productName}`} src={`https://${firstProductInfo.productImage}`} />
            <p>{firstProductInfo.productName}</p>
            <p>{firstProductInfo.productPrice}</p>
            <p>{firstProductInfo.productInstallmentPlans}</p>
          </div>
          <div className="Rtable-cell">
            <img alt={`${firstProductInfo.productName}`} src={`https://${secondProductInfo.productImage}`} />
            <p>{secondProductInfo.productName}</p>
            <p>{secondProductInfo.productPrice}</p>
            <p>{secondProductInfo.productInstallmentPlans}</p>
          </div>
          <div className="Rtable-cell"><h3>Ratings & Reviews</h3></div>
          <div className="Rtable-cell">
            <span>{firstProductInfo.productRating}</span>
            <img alt="product rating" className="rating" src={starImg} />
            <span> from {firstProductInfo.productRatingCount}</span>
            <p>{firstProductInfo.questionCountAboutProduct}</p>
          </div>
          <div className="Rtable-cell">
            <span>{secondProductInfo.productRating}</span>
            <img alt="product rating" className="rating" src={starImg} />
            <span> from {secondProductInfo.productRatingCount}</span>
            <p>{secondProductInfo.questionCountAboutProduct}</p>
          </div>
          <div className="Rtable-cell">
            <h3>Highlights</h3>
          </div>
          <div className="Rtable-cell">
            <ul>
              { firstProductInfo.productHighlight && firstProductInfo.productHighlight.map((item, index) => <li key={index}>{item}</li>) // eslint-disable-line
              }
            </ul>
          </div>
          <div className="Rtable-cell">
            <ul>
              { secondProductInfo.productHighlight && secondProductInfo.productHighlight.map((item, index) => <li key={index}>{item}</li>) // eslint-disable-line
              }
            </ul>
          </div>
          <div className="Rtable-cell"><h3>Delivery</h3></div>
          <div className="Rtable-cell">{firstProductInfo.productName}</div>
          <div className="Rtable-cell">{secondProductInfo.productName}</div>
          <div className="Rtable-cell"><h3>Seller</h3></div>
          <div className="Rtable-cell">
            <p>{`${firstProductInfo.productSellerName} (${firstProductInfo.productSellerRating})`}</p>
          </div>
          <div className="Rtable-cell">
            <p>{`${firstProductInfo.productSellerName} (${firstProductInfo.productSellerRating})`}</p>
          </div>
          <div className="Rtable-cell"><h3>Return Policy</h3></div>
          <div className="Rtable-cell">{firstProductInfo.productReturnInfo}</div>
          <div className="Rtable-cell">{secondProductInfo.productReturnInfo}</div>
          <div className="Rtable-cell"><h3>Warranty</h3></div>
          <div className="Rtable-cell">{firstProductInfo.productWarrantyInfo}</div>
          <div className="Rtable-cell">{secondProductInfo.productWarrantyInfo}</div>
        </div> }
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
