import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirebaseContext } from "../../context";
import { NumericSpinner } from "../common/";

function Match(props) {
  const { data = {} } = props;
  const [value1, setValue1] = React.useState(0)
  const [value2, setValue2] = React.useState(0)

  const { matchStart = {}, teams } = data;
  const date = matchStart.seconds ? new Date(matchStart.seconds * 1000) : null;

  return (
    <div>
      <span>{date && date.toLocaleString()}</span> |<span>{teams[0]}</span> vs{" "}
      <span>{teams[1]}</span>
      <br />
      <NumericSpinner value={value1} onChange={e => setValue1(e.value)} />
      
      <NumericSpinner value={value2} onChange={e => setValue2(e.value)} />
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
