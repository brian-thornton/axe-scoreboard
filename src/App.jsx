import { Routes, Route } from "react-router-dom";

import AxeNav from "./AxeNav";
import MatchHistory from "./MatchHistory";
import MatchManager from "./MatchManager";

function App() {
  return (
    <div className="App">
        <AxeNav />
        <Routes>
          <Route path="/" element={<MatchManager />} />
          <Route path="leaderboard" element={<MatchManager />} />
          <Route path="history" element={<MatchHistory />} />
        </Routes>
    </div>
  )
}

export default App