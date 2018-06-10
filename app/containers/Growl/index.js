import React from 'react';
import ReactSVG from 'react-svg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import closeBtnSvg from 'fontSource/close.svg';
import { getAlerts } from 'containers/HomePage/selectors';
import { Growl, Close, GrowlWrapper } from './style';

export class GrowlMessage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages) {
      const messages = [...this.state.messages];
      messages.push(nextProps.messages);
      this.setState({ messages });
      setTimeout(() => {
        const timedOut = [...this.state.messages];
        timedOut.shift();
        this.setState({ messages: timedOut });
      }, 4000);
    }
  }

  close(idx) {
    const messages = [...this.state.messages];
    messages.splice(idx, 1);
    this.setState({ messages });
  }

  render() {
    return (
      <GrowlWrapper>
        {this.state.messages.map((alert, index) => (
          // eslint-disable-next-line
          <Growl alertType={alert.type} key={index}>
            <p>{alert.text}</p>
            <Close onClick={() => this.close(index)}>
              <ReactSVG
                path={closeBtnSvg}
                style={{ height: '15px', width: '15px' }}
              />
            </Close>
          </Growl>
        ))}
      </GrowlWrapper>
    );
  }
}

GrowlMessage.propTypes = {
  messages: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  messages: getAlerts(),
});

export default connect(mapStateToProps)(GrowlMessage);
