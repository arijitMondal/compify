import styled, { keyframes } from 'styled-components';
import { colors } from 'constants/cssStyles';

const transition1 = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const transition2 = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const transition3 = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  display: block;
  height: ${(props) => (props.large ? '50px' : '25px')};
  width: ${(props) => (props.large ? '50px' : '25px')};
  position: ${(props) => (props.inline ? 'relative' : 'absolute')};
  top: ${(props) => (props.inline ? '0%' : '50%')};
  left: ${(props) => (props.inline ? '0%' : '50%')};
  text-align: center;
  margin: auto;
  animation: ${transition1} 3s linear infinite;
  span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: ${(props) => (props.large ? '50px' : '25px')};
    width: ${(props) => (props.large ? '50px' : '25px')};
    clip: rect(16px, 50px, 50px, 0);
    animation: ${transition2} 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      height: ${(props) => (props.large ? '50px' : '25px')};
      width: ${(props) => (props.large ? '50px' : '25px')};
      border: ${(props) =>
        props.white
          ? `3px solid ${colors.pureWhite}`
          : `3px solid ${colors.yellow}`};
      border-top: ${(props) =>
        props.white
          ? `3px solid ${colors.pureWhite}`
          : `3px solid ${colors.yellow}`};
      border-radius: 50%;
      animation: ${transition3} 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      height: ${(props) => (props.large ? '50px' : '25px')};
      width: ${(props) => (props.large ? '50px' : '25px')};
      border: ${(props) =>
        props.white
          ? `3px solid ${colors.pureWhite}`
          : '3px solid rgba(255, 255, 255, 0.5)'};
      border-radius: 50%;
    }
  }
`;
