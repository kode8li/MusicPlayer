import "./App.css";
import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Discover } from "./pages/Discover";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { SongInfo } from "./pages/SongInfo";
import { ArtistInfo } from "./pages/ArtistInfo";
import { SearchPage } from "./pages/SearchPage";

function App() {
  const currentIndex = useSelector((state) => state.music.currentIndex);

  return (
    <>
    <section className="max-h-[100vh] h-[100vh]">
      <div
        className={`px-6 flex gap-3 overflow-y-scroll hide-scrollbar xl:flex-row bg-black text-white ${
          currentIndex == -1 ? `lg:max-h-[100vh] h-[100vh]` : `lg:max-h-[calc(100vh-7rem)] min-h-[100vh]`
        }`}
      >
        <Sidebar />
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/songInfo/:id" element={<SongInfo />} />
          <Route path="/artistInfo/:id" element={<ArtistInfo />} />
        </Routes>
      </div>

      {currentIndex != -1 && (
        <div
          className="fixed h-28 bottom-0 left-0 right-0 flex animate-slideup z-10 text-white bg-transparent"
          style={{
            background:
              "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
          }}
        >
          <AudioPlayer />
        </div>
      )}
      </section>
    </>
  );
}

export default App;
