export function calculatePoints(baseTimeScore, bet) {
  if (
    !baseTimeScore ||
    !bet ||
    baseTimeScore.length !== 2 ||
    bet.length !== 2
  ) {
    return 0;
  }
  const scoreA = Number(baseTimeScore[0]);
  const scoreB = Number(baseTimeScore[1]);
  const betA = Number(bet[0]);
  const betB = Number(bet[1]);

  // same bet as result in base game time - perfect
  if (scoreA === betA && scoreB === betB) {
    return 5;
  }

  // great bet with same difference (bet 2:4, real score 3:5)
  if (scoreA - scoreB === betA - betB) {
    return 4;
  }

  // good bet, your team won.
  if (
    (scoreA - scoreB > 0 && betA - betB > 0) ||
    (scoreA - scoreB < 0 && betA - betB < 0)
  ) {
    return 3;
  }
  return 0;
}
