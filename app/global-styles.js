import { injectGlobal } from 'styled-components';
import 'styles/bootstrap.min.css';
import { colors } from 'constants/cssStyles';
import robotoRegularWoff from 'fonts/Roboto-Regular.woff';
import robotoRegularWoff2 from 'fonts/Roboto-Regular.woff2';
/* eslint no-unused-expressions: 0 */
injectGlobal`
   @font-face {
    font-family: 'Roboto';
    src: url(${robotoRegularWoff2}) format('woff2'),
         url(${robotoRegularWoff}) format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap; }

  html,
  body {
    height: 100%;
    width: 100%;
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: Roboto-Regular,Helvetica,Arial,sans-serif;
  }

  #app {
    padding: 30px;
  }

  .alignCenter {
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${colors.pureWhite};
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${colors.grey};
    border-radius: 5px;
    height: 50px;
  }

  .Rtable {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    position: relative;
    margin: 20px 0;
  }

  .Rtable-cell {
    box-sizing: border-box;
    flex-grow: 1;
    width: 100%;
    padding: 0.8em 1.2em;
    overflow: hidden;
    list-style: none;
    border: 1px solid #e0e0e0;
    margin: -3px 0 0 -3px;
    background-color: white;
    border-color: #e2e6e9;
    img {
      height: 150px;
      &.rating {
        height: 15px;
      }
    }
    > {
      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  .Rtable--2cols > .Rtable-cell {
    width: 50%;
  }

  .Rtable--3cols > .Rtable-cell {
    width: 33.33%;
  }

  .Rtable--4cols > .Rtable-cell {
    width: 25%;
  }

  .Rtable--5cols > .Rtable-cell {
    width: 20%;
  }

  .Rtable--6cols > .Rtable-cell {
    width: 16.6%;
  }

  @media all and (max-width: 767px) {
    .Rtable--collapse {
      display: block;
      > .Rtable-cell {
        width: 100% !important;
      }
    }
  }

    .btn {
      display: inline-block;
      padding: 6px 12px;
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.42857143;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      touch-action: manipulation;
      cursor: pointer;
      user-select: none;
      background-image: none;
      border: 1px solid transparent;
      border-radius: 4px;
      &.btn-submit {
        color: #fff;
        background-color: #f0ad4e;
        border-color: #eea236;
        &:disabled {
          cursor: not-allowed;
          background-color: #ffd08d;
          color: #fff;
          border-color: #f5c786;
        }
      }
    }
    .form-input {
      display: block;
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }
`;
