import MatchTable from "./MatchTable/MatchTable";
import NoMatchHistory from "./NoMatchHistory";

const MatchHistory = () => {
  const matchHistoryStorage = localStorage.getItem('matchHistory');
  let matchHistory = [];
  if (matchHistoryStorage) {
    matchHistory = JSON.parse(matchHistoryStorage);
  }

  return (
    <div id="matchHistory">
      {!matchHistory?.length && <NoMatchHistory />}
      {matchHistory.length && matchHistory.sort((a,b) => {
        return new Date(b.matchDate) - new Date(a.matchDate);
      }).map((match) => {
        return (
          <MatchTable match={match} />
        );
      })}
    </div>
  )
};

export default MatchHistory;