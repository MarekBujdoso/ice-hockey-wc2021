import React from "react";
import { NumericSpinner, Versus, TeamScore } from "../common/";
import "./Match.scss";
import { FirebaseContext } from "../../context";

function Match(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid } = auth.currentUser;
  const { data = {}, bet = [] } = props;
  const { matchStart = {}, teams, id, score = [] } = data;
  const date = matchStart.seconds ? new Date(matchStart.seconds * 1000) : null;
  const [userBet, setUserBet] = React.useState([0, 0]);

  React.useEffect(() => {
    if (bet[0] >= 0 && bet[1] >= 0) setUserBet([bet[0], bet[1]]);
  }, [bet[0], bet[1]]);

  async function saveBet() {
    firestore
      .collection(`users`)
      .doc(uid)
      .set(
        {
          bet: { [id]: userBet },
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
      .then(() => console.log("bet saved"))
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  return (
    <div className="match">
      <Versus
        firstTeam={<TeamScore score={score[0]} teamName={teams[0]} />}
        secondTeam={<TeamScore score={score[1]} teamName={teams[1]} />}
      />
      <br />
      <br />
      <Versus firstTeam={bet[0]} secondTeam={bet[1]} footer="your bet" />
      <br />
      <br />
      <Versus
        firstTeam={
          <NumericSpinner
            min={0}
            value={userBet[0]}
            onChange={(e) => setUserBet([e.value, userBet[1]])}
          />
        }
        secondTeam={
          <NumericSpinner
            min={0}
            value={userBet[1]}
            onChange={(e) => setUserBet([userBet[0], e.value])}
          />
        }
        footer="update your bet"
      />
      <br />
      <button onClick={saveBet}>save</button>
      <br />
      <span className="match__date">{date && date.toLocaleString()}</span>
    </div>
  );
}

export default Match;
