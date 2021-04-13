import React from "react";
import { FirebaseContext } from "../../context";
import { useCollectionData } from "react-firebase-hooks/firestore";

const ScoreBoard = (props) => {
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

      <div className="leaderboard--table">
        <div className="leaderboard--line" key="leaderboard_header">
          <span className="boardheader left">Name:</span>
          <span className="boardheader right">Points:</span>
        </div>
        {leaderboardData &&
          leaderboardData[0].scoreGlobal.map((row) => (
            <div className="leaderboard--line" key={row.id}>
              <span className="boardline left">
                {row.name || ""}
              </span>
              <span className="boardline right">
                {row.score || 0}
              </span>
            </div>
          ))}
      </div>
  );
};

export default ScoreBoard;
