import React from "react";
import "./Versus.scss";
import { getClassNames } from "../../utils/index";

function Versus(props) {
  const {
    firstTeam = "-",
    secondTeam = "-",
    separator = "vs",
    header,
    footer,
    className,
  } = props;
  return (
    <div className={getClassNames("versus", className)}>
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
