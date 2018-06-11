import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import starImg from 'fontSource/star.svg';
import homeDeliveryImg from 'fontSource/truck.svg';
import moneyImg from 'fontSource/coin-dollar.svg';
import liveUpImg from 'fontSource/undo2.svg';
import { ProductName, BadgeBox, HighLightWrapper } from './styles';

const CompareView = (props) => {
  const { firstProductInfo, secondProductInfo } = props;

  return (
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
    </div>
  );
};

CompareView.propTypes = {
  firstProductInfo: PropTypes.object.isRequired,
  secondProductInfo: PropTypes.object.isRequired,
};

export default CompareView;
