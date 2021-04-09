import React from "react";
import "./Versus.scss";

function Versus(props) {
  const {
    firstTeam = "-",
    secondTeam = "-",
    separator = "vs",
    header,
    footer,
  } = props;
  return (
    <div className="versus">
      <div className="versus__header">{header}</div>
      <div className="versus__body">
        <div className="versus__body__first-team">{firstTeam}</div>
        <div className="versus__body__separator">{separator}</div>
        <div className="versus__body__second-team">{secondTeam}</div>
      </div>
      <div className="versus__footer">{footer}</div>
    </div>
  );
}
export default Versus;
