import React from "react";
import styled from "styled-components";
import {useSelector,connect } from "react-redux";
import {OPEN_CLOSE_ERROR} from '../../redux/actions'

const ErrorComp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100000;
  background: rgba(140, 151, 183, 0.41);
  overflow: hidden;
  animation: appearingComp 0.4s ease-in-out 0s 1 normal forwards;

  @keyframes appearingComp {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .err-box {
    height: 256px;
    width: 464px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 37px 0 rgba(33, 40, 134, 0.23);
    position: relative;
  }

  .title-err {
    width: 100%;
    text-align: center;
    color: #1A4F95;
    font-size: 28px;
    font-weight: bold;
    margin: 40px 0;
  }

  .mess-err {
    color: #696D8C;
    font-size: 16px;
    padding: 0 40px;
    text-align: center;
    font-weight: 600;
    letter-spacing: -0.09px;
    line-height: 23px;
  }

  .return-btn {
    color: #1A4F95;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.5px;
    line-height: 18px;
    border: none;
    background: none;
    margin: 0 40px 0 0;

    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }

  .close-btn {
    position: absolute;
    right: 10px;
    top: 15px;
    background: none;
    border: none;

    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }
`;

const ServerError = (props) => {
const state = useSelector(state => state.storeageReducer)
  const { serverErr } = state;

  return (
    <ErrorComp>
      <div className="err-box">
        <button
          className="close-btn"
          onClick={() => props.onCloseAndOpenModal()}
        >
          <img
            src="https://gist.githubusercontent.com/maxovsanyuk/e22bdee4fb8828d7712562b1e900ab08/raw/b6825fad2dbfc74a6e6490362324eb41e728dff5/close.svg"
            alt="icon"
          />
        </button>
        <div className="title-err">{`Error (${state.errorName})`}</div>
        <div className="mess-err">{state.errorDisplay}</div>
        <div
          style={{
            display: "flex",
            margin: "30px 0 0 0",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => props.onCloseAndOpenModal()}
            className="return-btn"
          >
            Return
          </button>
        </div>
      </div>
    </ErrorComp>
  );
};


  
  
  
   const mapDispatchToProps = (dispatch) => {
     return{
      onCloseAndOpenModal:(img)=>{dispatch({type:OPEN_CLOSE_ERROR})},
     }
   }
  

export default connect(null,mapDispatchToProps)(ServerError);
