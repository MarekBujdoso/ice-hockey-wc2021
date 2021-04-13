import React from "react";
import "./LeaderBoard.scss";
import ScoreBoard from "./ScoreBoard";

const LeaderBoard = (props) => {
  return (
    <div className="leaderboard">
      <h1>Check your score!</h1>
      <ScoreBoard />
    </div>
  );
};

export default LeaderBoard;
