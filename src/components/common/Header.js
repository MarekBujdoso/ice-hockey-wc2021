import React from "react";
import "./Header.scss";

function Header(props) {
  const { value, onChange, min } = props;

  return (
    <div className="header">
      <svg
        className="header__wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,288L40,282.7C80,277,160,267,240,256C320,245,400,235,480,229.3C560,224,640,224,720,208C800,192,880,160,960,176C1040,192,1120,256,1200,266.7C1280,277,1360,235,1400,213.3L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
}

export default Header;
