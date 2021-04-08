import React from "react";
import {
  useCollectionData,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
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

  return (
    <div className="matches">
      <hr />
      {matches &&
        matches.map((match) => (
          <Match
            key={match.id}
            data={match}
            bet={bets ? bets[match.id] : undefined}
          />
        ))}
    </div>
  );
}

export default Matches;
