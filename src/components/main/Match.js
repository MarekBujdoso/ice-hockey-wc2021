import React from "react";
import { NumericSpinner, Versus, TeamScore } from "../common/";
import "./Match.scss";
import { FirebaseContext } from "../../context";
import BetEdit from "./BetEdit";
import {getClassNames} from '../../utils';

function Match(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid } = auth.currentUser;
  const { data = {}, bet = [], inEdit, setMatchInEdit } = props;
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
        <Versus firstTeam={bet[0]} secondTeam={bet[1]} footer="your bet" />
      </button>
      <span className="match__date">{date && date.toLocaleString()}</span>
      {inEdit && (
        <div className="match__edit">
          <BetEdit bet={bet} id={id} closeEdit={() => setMatchInEdit(null)} />
        </div>
      )}
    </div>
  );
}

export default Match;
