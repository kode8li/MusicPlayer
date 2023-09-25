import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  playSong,
  pauseSong,
  stopSong,
  setIndex,
  setSongDetails,
} from "../redux/musicSlice";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

export const ImageHoverPlayPause = ({ music }) => {
  const [isHovered, setIsHovered] = useState(false);
  const musicDetails = useSelector((state) => state.music);

  const dispatch = useDispatch();
  const handlePlayPauseClick = (e) => {
    e.stopPropagation();
    if (
      musicDetails.isPlaying &&
      musicDetails.currentSong === music.musicName
    ) {
      dispatch(pauseSong());
    } else {
      dispatch(setIndex(music.id));
      dispatch(playSong(music.musicName));
      // dispatch(setSongDetails(music.attribution.song));
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={music?.img ? `/img/${music.img}` : `/img/404.jpg`}
        alt={music?.name}
        // Set width and height based on screen size
        // For small screens (sm and below)
        className={`w-[90vw] sm:w-[full] sm:h-[fit]  object-contain rounded ${
          isHovered ? "filter brightness-50" : ""
        }`}
      />
      <div
        className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 ${
          isHovered ? "flex" : "hidden"
        } ${
          musicDetails.isPlaying &&
          musicDetails.currentSong === music?.musicName
            ? "flex bg-black bg-opacity-70"
            : ""
        }`}
      >
        <button onClick={handlePlayPauseClick}>
          {musicDetails.isPlaying &&
          musicDetails.currentSong === music.musicName ? (
            <FaPauseCircle style={{ fontSize: "4rem" }} />
          ) : (
            <FaPlayCircle style={{ fontSize: "4rem" }} />
          )}
        </button>
      </div>
    </div>
  );
};
