import MobileView from "./components/MobileView";
import DesktopView from "./components/DesktopView";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden space-y-4">
      {/* App Title */}
      <h1 className="text-3xl font-bold text-center py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
        My Awesome App
      </h1>

      {/* Content Container */}
      <div className="flex-1 w-full">
        {/* Mobile View (visible on sm screens and below) */}
        <div className="sm:hidden w-screen">
          <MobileView />
        </div>

        {/* Desktop View (visible on lg screens and above) */}
        <div className="hidden sm:block w-full">
          <DesktopView />
        </div>
      </div>
    </div>
  );
}

export default App;
