import React from "react";
import { NumericSpinner, Versus } from "../common/";
import "./Match.scss";
import { FirebaseContext } from "../../context";

function Match(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid } = auth.currentUser;

  const { data = {} } = props;
  const { matchStart = {}, teams, id } = data;
  const [value1, setValue1] = React.useState(0);
  const [value2, setValue2] = React.useState(0);

  const date = matchStart.seconds ? new Date(matchStart.seconds * 1000) : null;
  const matchRef = firestore.collection(`users`).doc(uid);

  async function saveBet() {
    matchRef
      .set(
        {
          bet: { [id]: [value1, value2] },
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
      .then(() => console.log('bet saved'))
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  return (
    <div className="match">
      <Versus firstTeam={teams[0]} secondTeam={teams[1]} />
      <Versus
        firstTeam={
          <NumericSpinner
            min={0}
            value={value1}
            onChange={(e) => setValue1(e.value)}
          />
        }
        secondTeam={
          <NumericSpinner
            min={0}
            value={value2}
            onChange={(e) => setValue2(e.value)}
          />
        }
      />
      <span className="match__date">{date && date.toLocaleString()}</span>
      <br />
      <button onClick={saveBet}>make a guess</button>
      <hr />
    </div>
  );
}

export default Match;
