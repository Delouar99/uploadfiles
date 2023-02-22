import React from "react";
import { RotatingLines } from "react-loader-spinner";
import "./Preloder.css";
const Preloader = () => {
  return (
    <>
      <div className="spnr-wraper">
        <div className="spin-content">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="3.75"
            width="96"
            visible={true}
          />
          <h1>uploading...</h1>
        </div>
      </div>
    </>
  );
};

export default Preloader;
