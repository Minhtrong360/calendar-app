"use client";

import MobileView from "./components/MobileView";
import DesktopView from "./components/DesktopView";

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* App Title */}
      <h1 className="text-3xl font-bold text-center py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
        My Awesome App
      </h1>

      {/* Main Content Container */}
      <div className="mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="bg-white rounded-lg shadow-lg px-6 py-6">
          {/* Mobile View (visible on sm screens) */}
          <div className="sm:hidden w-full">
            <MobileView />
          </div>

          {/* Desktop View (visible on lg screens and above) */}
          <div className="hidden sm:flex sm:justify-center sm:items-center">
            <DesktopView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
