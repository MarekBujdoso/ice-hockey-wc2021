import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirebaseContext } from "../../context";

function Match(props) {
  const { data = {} } = props;
  const { matchStart = {}, teams } = data;
  const date = matchStart.seconds? new Date(matchStart.seconds * 1000) : null;

  return (
    <div>
      <span>{date && date.toLocaleString()}</span> | 
      <span>{teams[0]}</span> vs <span>{teams[1]}</span>
      {/* <button>make a guess</button> */}
    </div>
  );
}

function Matches() {
  const { firestore } = React.useContext(FirebaseContext);

  const matchesRef = firestore.collection(`matches`);
  const query = matchesRef.orderBy("matchStart", "asc").limitToLast(25);
  const [matches] = useCollectionData(query, { idField: "id" });

  return (
    <div className="matches">
      {matches && matches.map((match) => <Match key={match.id} data={match} />)}
    </div>
  );
}

export default Matches;
