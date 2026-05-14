import { useEffect, useState } from "react";
import Log from "../logging_middleware/index";

function App() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    Log("frontend", "info", "component", "Dashboard page loaded");
  }, []);

  const handleRefresh = () => {
    setVisitCount((currentCount) => currentCount + 1);
    Log("frontend", "debug", "state", "Dashboard refreshed");
  };

  const handleSettingsOpen = () => {
    Log("frontend", "info", "page", "User opened settings page");
  };

  const handleSaveClick = () => {
    Log("frontend", "warn", "component", "Save clicked with no changes to save");
  };

  return (
    <div className="app">
      <h1>Logging Demo</h1>
      <p>Simple frontend logging for the assessment.</p>

      <div>
        <button type="button" onClick={handleRefresh}>
          Refresh dashboard
        </button>
        <button type="button" onClick={handleSettingsOpen}>
          Open settings
        </button>
        <button type="button" onClick={handleSaveClick}>
          Save draft
        </button>
      </div>

      <p>Refresh count: {visitCount}</p>
    </div>
  );
}

export default App
