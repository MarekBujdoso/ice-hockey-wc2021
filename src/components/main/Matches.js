import React from "react";
import {
  useCollectionData,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import "./Matches.scss";
import { FirebaseContext } from "../../context";
import Match from "./Match";

function Matches() {
  const { auth, firestore } = React.useContext(FirebaseContext);
  const uid = auth && auth.currentUser ? auth.currentUser.uid : "-1";

  const matchesRef = firestore.collection(`matches`);
  const matchesQuery = matchesRef.orderBy("matchStart", "asc").limitToLast(25);
  const [matches] = useCollectionData(matchesQuery, { idField: "id" });

  const userRef = firestore.collection(`users`).doc(uid);
  const [user] = useDocumentData(userRef);
  const bets = user && user.bet;

  const [matchInEdit, setMatchInEdit] = React.useState(null);

  return (
    <div className="matches">
      {matches &&
        matches.map((match) => (
          <Match
            key={match.id}
            data={match}
            bet={bets ? bets[match.id] : undefined}
            inEdit={matchInEdit === match.id}
            setMatchInEdit={setMatchInEdit}
          />
        ))}
    </div>
  );
}

export default Matches;
