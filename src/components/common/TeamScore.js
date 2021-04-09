import React from "react";
import "./TeamScore.scss";

function TeamScore(props) {
  const { score = "-", teamName } = props;
  return (
    <div className="team-score">
      <div className="team-score__value">{score}</div>
      <div className="team-score__name">{teamName}</div>
    </div>
  );
}

export default TeamScore;
