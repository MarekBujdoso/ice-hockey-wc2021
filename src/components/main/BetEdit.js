import React from "react";
import { NumericSpinner, Versus, TeamScore } from "../common/";
import "./BetEdit.scss";
import { FirebaseContext } from "../../context";

function BetEdit(props) {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);
  const { uid } = auth.currentUser;
  const { bet, id, closeEdit } = props;
  const [userBet, setUserBet] = React.useState([bet[0] || 0, bet[1] || 0]);

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
      .then(closeEdit)
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  return (
    <div className="bet-edit">
      <svg
        className="bet-edit__wave bet-edit__wave--top"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill-opacity="1"
          d="M0,160L34.3,144C68.6,128,137,96,206,101.3C274.3,107,343,149,411,149.3C480,149,549,107,617,85.3C685.7,64,754,64,823,96C891.4,128,960,192,1029,202.7C1097.1,213,1166,171,1234,154.7C1302.9,139,1371,149,1406,154.7L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
      <Versus
        className="bet-edit__versus"
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
      />
      <svg
        className="bet-edit__wave bet-edit__wave--bottom"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill-opacity="1"
          d="M0,96L34.3,117.3C68.6,139,137,181,206,192C274.3,203,343,181,411,186.7C480,192,549,224,617,218.7C685.7,213,754,171,823,144C891.4,117,960,107,1029,117.3C1097.1,128,1166,160,1234,186.7C1302.9,213,1371,235,1406,245.3L1440,256L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg>
      <div  className="bet-edit__actions">
        <button onClick={saveBet}>save</button>{" "}
        <button onClick={closeEdit}>cancel</button>
      </div>
    </div>
  );
}

export default BetEdit;
