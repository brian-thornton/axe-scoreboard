import React from "react";
import MatchTable from "./MatchTable";
import NoMatchHistory from "./NoMatchHistory";

const MatchHistory = () => {
  const matchHistoryStorage = localStorage.getItem('matchHistory');
  let matchHistory = [];
  if (matchHistoryStorage) {
    matchHistory = JSON.parse(matchHistoryStorage);
  }

  return (
    <>
      {!matchHistory?.length && <NoMatchHistory />}
      {matchHistory.length && matchHistory.sort((a,b) => {
        return new Date(b.matchDate) - new Date(a.matchDate);
      }).map((match) => {
        return (
          <MatchTable match={match} />
        );
      })}
    </>
  )
};

export default MatchHistory;