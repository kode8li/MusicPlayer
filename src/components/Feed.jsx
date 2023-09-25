import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongCard from "./SongCard";
import musicDB from "../db/music";

export const Feed = () => {
  const musicControls = useSelector((state) => state.music);
  console.log(musicControls);
  console.log(musicDB);

  return (
    <section className="flex flex-col lg:flex-[0.8] flex-1 text-white rounded-md p-4 overflow-y-scroll [overflow:overlay] lg:w-[80%] w-full hide-scrollbar lg:max-h-[100vh] min-h-[100vh] backdrop-blur-lg" style={{background: 'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)'}}>
      <h1 className="text-2xl font-bold mb-4">Discover</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {musicDB?.map((music, index) => (
            <SongCard key={index} music={music} />
          ))}
        </div>
    </section>
  );
};
