import React from "react";
import { NumericSpinner, Versus, TeamScore } from "../common/";
import "./Match.scss";
import { FirebaseContext } from "../../context";
import BetEdit from "./BetEdit";
import { getClassNames, calculatePoints } from '../../utils';

function Match(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid } = auth.currentUser;
  const { data = {}, bet = {}, inEdit, setMatchInEdit, userId } = props;
  const { matchStart = {}, teams = [], id, score = [] } = data;
  const date = matchStart.seconds ? new Date(matchStart.seconds * 1000) : null;

  return (
    <div className= {getClassNames("match", {'match--edit':inEdit})}>
      <button className="match__button" onClick={() => setMatchInEdit(id)}>
        <Versus
          firstTeam={<TeamScore score={score[0]} teamName={teams[0]} />}
          secondTeam={<TeamScore score={score[1]} teamName={teams[1]} />}
        />
        <br />
        <Versus firstTeam={bet.team1} secondTeam={bet.team2} footer="your bet" />
      </button>
      <span className="match__date">{date && date.toLocaleString()}</span>
      {inEdit && (
        <div className="match__edit">
          <BetEdit bet={bet} id={id} userId={userId} matchId={data.id} closeEdit={() => setMatchInEdit(null)} />
        </div>
      )}
      <span className="match__points">Points:</span><span>{calculatePoints(score, [bet.team1, bet.team2])}</span>
    </div>
  );
}

export default Match;
