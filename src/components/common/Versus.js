import React from "react";
import "./Versus.scss";

function Versus(props) {
  const { firstTeam='-', secondTeam='-', separator="vs" } = props;
  return (
    <div className='versus'>
      <div className='versus__first-team'>{firstTeam}</div>
      <div className='versus__separator'>{separator}</div>
      <div className='versus__second-team'>{secondTeam}</div>
    </div>
  );
}
export default  Versus;