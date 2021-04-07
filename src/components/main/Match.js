import React from "react";
import { NumericSpinner, Versus } from "../common/";
import "./Match.scss";

function Match(props) {
  const { data = {} } = props;
  const [value1, setValue1] = React.useState(0);
  const [value2, setValue2] = React.useState(0);

  const { matchStart = {}, teams } = data;
  const date = matchStart.seconds ? new Date(matchStart.seconds * 1000) : null;

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

      {/* <button>make a guess</button> */}
    </div>
  );
}

export default Match;
