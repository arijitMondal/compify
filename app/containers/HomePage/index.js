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
import reducer from './reducer';
import saga from './sagas';
import * as CompareProductActions from './actions';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor(props) {
    super(props);
    this.state = { requestUrl1: '', requestUrl2: '' };
  }

  handleFirstItemValue =(event) => {
    this.setState({ requestUrl1: event.target.value });
  }

  handleSecondItemValue =(event) => {
    this.setState({ requestUrl2: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    const { requestUrl1, requestUrl2 } = this.state;
    const data = { requestUrl1, requestUrl2 };
    this.props.actions.productCompareActions.getProductsCompareInfo(data);
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
                Item1:
                <input type="text" value={this.state.value} onChange={this.handleFirstItemValue} />
          </label>
          <label>
                Item2:
                <input type="text" value={this.state.value} onChange={this.handleSecondItemValue} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}


HomePage.defaultProps = {
  feedPosts: [],
};

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
};

// const mapStateToProps = createStructuredSelector({
//   feedPosts: getFeedPostsByUserId(),
// });

const mapDispatchToProps = (dispatch) => ({
  actions: {
    productCompareActions: bindActionCreators(CompareProductActions, dispatch),
  },
});

const withConnect = connect(null, mapDispatchToProps);

const myFeedReducer = injectReducer({ key: 'home', reducer });
const myFeedSaga = injectSaga({ key: 'home', saga });

export default compose(myFeedReducer, myFeedSaga, withConnect)(HomePage);
