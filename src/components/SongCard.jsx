import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  playSong,
  pauseSong,
  stopSong,
  setIndex,
  setSongDetails,
} from "../redux/musicSlice";
import { Link } from "react-router-dom";
import { ImageHoverPlayPause } from "../utils/ImageHoverPlayPause";

const SongCard = ({ music }) => {
  const dispatch = useDispatch();

  const handleSongNameClicked = () => {
    dispatch(setSongDetails(music.attribution.song));
  };

  return (
    <div className="flex flex-col justify-center p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer">
      <ImageHoverPlayPause music={music} />
      <div className="mt-2">
        <h3
          className="font-semibold text-lg text-white truncate hover:underline sm:text-xl md:text-2xl"
          onClick={handleSongNameClicked}
        >
          <Link to={`/songInfo/${music.attribution.song}`}>{music.name}</Link>
        </h3>
        <p
          className="font-semibold text-sm text-gray-300 truncate hover:underline sm:text-base md:text-lg lg:text-xl"
          onClick={handleSongNameClicked}
        >
          <Link to={`/artistInfo/${music.author_name}`}>
            {music.author_name}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
