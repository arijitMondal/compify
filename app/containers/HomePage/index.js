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
import starImg from 'fontSource/star.svg';
import homeDeliveryImg from 'fontSource/truck.svg';
import moneyImg from 'fontSource/coin-dollar.svg';
import liveUpImg from 'fontSource/undo2.svg';
import ReactSVG from 'react-svg';
import { Loader } from 'styles/Loader';
import reducer from './reducer';
import saga from './sagas';
import { TopBar, ProductName, BadgeBox, CompareForm, PageHeader, HighLightWrapper } from './styles';
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
        { !loadingProducts && firstProductInfo.productName &&
        <div className="Rtable Rtable--3cols Rtable--collapse">
          <div className="Rtable-cell"></div>
          <div className="Rtable-cell">
            <img alt={`${firstProductInfo.productName}`} src={`https://${firstProductInfo.productImage}`} />
            <ProductName>{firstProductInfo.productName}</ProductName>
            <p className="actionTextColor textLg">{firstProductInfo.productPrice}</p>
            <p>{firstProductInfo.productInstallmentPlans}</p>
            <input type="button" className="btn btnSubmit btnLg" value="Buy Now" />
          </div>
          <div className="Rtable-cell">
            <img alt={`${firstProductInfo.productName}`} src={`https://${secondProductInfo.productImage}`} />
            <ProductName>{secondProductInfo.productName}</ProductName>
            <p className="actionTextColor textLg">{secondProductInfo.productPrice}</p>
            <p>{secondProductInfo.productInstallmentPlans}</p>
            <input type="button" className="btn btnSubmit btnLg" value="Buy Now" />
          </div>
          <div className="Rtable-cell"><h3>Ratings & Reviews</h3></div>
          <div className="Rtable-cell">
            <div>
              <BadgeBox>
                <span>{firstProductInfo.productRating} </span>
                <div className="inlinedSvg noMargin"><ReactSVG path={starImg} style={{ height: '10px', width: '10px' }} /></div>
              </BadgeBox>
              <span> from {firstProductInfo.productRatingCount}</span>
            </div>
            {// eslint-disable-next-line jsx-a11y/href-no-hash
              <a href="#">{firstProductInfo.questionCountAboutProduct}</a>
            }
          </div>
          <div className="Rtable-cell">
            <div>
              <BadgeBox>
                <span>{secondProductInfo.productRating} </span>
                <div className="inlinedSvg noMargin"><ReactSVG path={starImg} style={{ height: '10px', width: '10px' }} /></div>
              </BadgeBox>
              <span> from {secondProductInfo.productRatingCount}</span>
            </div>
            {// eslint-disable-next-line jsx-a11y/href-no-hash
              <a href="#">{secondProductInfo.questionCountAboutProduct}</a>
            }
          </div>
          <div className="Rtable-cell">
            <h3>Highlights</h3>
          </div>
          <div className="Rtable-cell">
            <HighLightWrapper>
              { firstProductInfo.productHighlight && firstProductInfo.productHighlight.map((item, index) => <li key={index}>{item}</li>) // eslint-disable-line
              }
            </HighLightWrapper>
          </div>
          <div className="Rtable-cell">
            <HighLightWrapper>
              { secondProductInfo.productHighlight && secondProductInfo.productHighlight.map((item, index) => <li key={index}>{item}</li>) // eslint-disable-line
              }
            </HighLightWrapper>
          </div>
          <div className="Rtable-cell"><h3>Delivery</h3></div>
          <div className="Rtable-cell">
            <div>
              <div className="inlinedSvg noMargin"><ReactSVG path={liveUpImg} style={{ height: '15px', width: '15px' }} /></div>
              <span> {firstProductInfo.liveUpDeliveryInfo}</span>
            </div>
            <div>
              <div className="inlinedSvg "><ReactSVG path={homeDeliveryImg} style={{ height: '15px', width: '15px' }} /></div>
              <span>Home Delivery from {firstProductInfo.homeDeliveryInfo} </span>
            </div>
            <div>
              <div className="inlinedSvg"><ReactSVG path={moneyImg} style={{ height: '15px', width: '15px' }} /></div>
              <span>{firstProductInfo.cODDeliveryInfo}</span>
            </div>
          </div>
          <div className="Rtable-cell">
            <div>
              <div className="inlinedSvg noMargin"><ReactSVG path={liveUpImg} style={{ height: '15px', width: '15px' }} /></div>
              <span> {secondProductInfo.liveUpDeliveryInfo}</span>
            </div>
            <div>
              <div className="inlinedSvg"><ReactSVG path={homeDeliveryImg} style={{ height: '15px', width: '15px' }} /></div>
              <span>Home Delivery from {secondProductInfo.homeDeliveryInfo} </span>
            </div>
            <div>
              <div className="inlinedSvg"><ReactSVG path={moneyImg} style={{ height: '15px', width: '15px' }} /></div>
              <span>{secondProductInfo.cODDeliveryInfo}</span>
            </div>
          </div>
          <div className="Rtable-cell"><h3>Seller</h3></div>
          <div className="Rtable-cell">
            <p><span>{`${firstProductInfo.productSellerName}`}</span> (<span className="successTextColor">{`${firstProductInfo.productSellerRating}`} </span>)</p>
          </div>
          <div className="Rtable-cell">
            <p><span>{`${secondProductInfo.productSellerName}`}</span> (<span className="successTextColor">{`${secondProductInfo.productSellerRating}`} </span>)</p>
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
