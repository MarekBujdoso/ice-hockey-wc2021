import React from "react";
import { FirebaseContext } from "../../context";
import {
  useCollectionData,
} from "react-firebase-hooks/firestore";
import "./LeaderBoard.scss";

const LeaderBoard = (props) => {
  const { auth, firestore } = React.useContext(FirebaseContext);
  const uid = auth && auth.currentUser ? auth.currentUser.uid : "-1";

  const leadersRef = firestore.collection(`leaderboard`);
  const leaderBoardQuery = leadersRef
    .orderBy("createdAt", "asc")
    .limitToLast(1);
  const [leaderboardData] = useCollectionData(leaderBoardQuery, {
    idField: "id",
  });

  return (
    <div className="leaderboard">
      <div className="leaderboard--table">
        <span className="leaderboard--table--header left">Name:</span><span className="leaderboard--table--header right">Points:</span>
      {leaderboardData && leaderboardData[0].scoreGlobal.map((row) => (
        <div className="leaderboard-line" key={row.id}>
          <span className="leaderboard--table--header left">{row.name || ""}</span>
          <span className="leaderboard--table--header right">{row.score || 0}</span>
        </div>
      ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
