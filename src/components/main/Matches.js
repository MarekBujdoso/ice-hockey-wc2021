import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirebaseContext } from "../../context";
import Match from "./Match";

function Matches() {
  const { firestore } = React.useContext(FirebaseContext);

  const matchesRef = firestore.collection(`matches`);
  const query = matchesRef.orderBy("matchStart", "asc").limitToLast(25);
  const [matches] = useCollectionData(query, { idField: "id" });

  return (
    <div className="matches">
      <hr />
      {matches && matches.map((match) => <Match key={match.id} data={match} />)}
    </div>
  );
}

export default Matches;
