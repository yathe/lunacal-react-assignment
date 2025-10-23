import "./App.css";
import InfoWidget from "./components/InfoWidget";
import GalleryWidget from "./components/GalleryWidget";

function App() {
  return (
    <div className="min-h-screen relative bg-[#101214]">
      {/* container to visually center but keep left empty area */}
      <div className="max-w-[1400px] mx-auto relative" style={{ padding: 40 }}>
        {/* Left empty area (keeps same width as design) */}
        <div style={{ width: "45%", height: 0, display: "inline-block" }} />

        {/* Right side area where widgets are absolutely positioned */}
        <div style={{ width: "55%", display: "inline-block" }}>
          <InfoWidget />
          <GalleryWidget />
        </div>
      </div>
    </div>
  );
}

export default App;
