import styled from 'styled-components';
import { colors } from 'constants/cssStyles';

export const Growl = styled.div`
  position: relative;
  height: 60px;
  padding: 20px;
  background-color: ${(props) =>
    props.alertType === 'success' ? `${colors.green}` : `${colors.lightRed}`};
  color: ${colors.pureWhite};
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 1px;
`;

export const Close = styled.div`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  svg path {
    fill: ${colors.pureWhite};
  }
`;

export const GrowlWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 252;
  top: 0;
  left: 0;
`;
