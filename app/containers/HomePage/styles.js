import styled from 'styled-components';
import logoImg from 'images/logo.png';
import { colors } from 'constants/cssStyles';

export const CompareForm = styled.form`
  margin-bottom: 20px;
  .form-input {
    width: 60%;
  }
  .btn {
    margin-right: 15px;
  }
  label {
    display: block;
    margin-bottom: 10px;
  }
`;

export const PageHeader = styled.h2`
  margin: 80px 0 20px;
`;

export const HighLightWrapper = styled.ul`
 li {
  padding-bottom: 5px;
 }
`;

export const BadgeBox = styled.div`
  display: inline-block;
  background-color: ${colors.green};
  color: ${colors.pureWhite};
  border-radius: 3px;
  padding: 2px 5px;
  font-size: 12px;
  svg path {
    fill: ${colors.pureWhite} !important;
  }
`;

export const TopBar = styled.div`
  background-color: ${colors.darkBlue};
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  height: 75px;
  width: 100%;
  h1 {
    background: url(${logoImg})  no-repeat;
    float: left;
    height: 40px;
    width: 127px;
    margin-left: 30px;
    background-size: 100% 100%;
  }
`;

export const ProductName = styled.p`
  font-size: 16px;
  margin-top: 15px;
  font-weight: 600;
`;
