import { Routes, Route } from "react-router-dom";

import AxeNav from "./AxeNav";
import MatchHistory from "./MatchHistory";
import MatchManager from "./MatchManager";
import Settings from "./Settings";

function App() {
  return (
    <div className="App" style={{minHeight: '100vh', backgroundSize: 'cover', backgroundImage: `url(${localStorage["wallpaper"]})` }}>
      <AxeNav />
      <Routes>
        <Route path="/" element={<MatchManager />} />
        <Route path="leaderboard" element={<MatchManager />} />
        <Route path="history" element={<MatchHistory />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default App