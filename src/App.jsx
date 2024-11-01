"use client";

import MobileView from "./components/MobileView";
import DesktopView from "./components/DesktopView";

function App() {
  return (
    <div className="w-full">
      {/* Mobile View (visible on sm screens) */}
      <div className="sm:hidden w-full">
        <MobileView />
      </div>

      {/* Desktop View (visible on lg screens and above) */}
      <div className="hidden sm:flex sm:justify-center sm:items-center">
        <DesktopView />
      </div>
    </div>
  );
}

export default App;
