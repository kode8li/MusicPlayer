import React from 'react'
import "./AudioPlayer.css";

export const SongDetails = ({bannerImage, isPlaying, currentSong, songName, artists}) => {
  return (
    <div className="flex md:flex-[0.3] md:max-w-[30%] flex-[.5] gap-2 items-center">
        <img
          src={`/img/${bannerImage}`}
          alt="bannerImage"
          className={`md:block hidden w-[5vw] object-contain rounded-[50%] border border-white ${
            isPlaying && currentSong ? "rotate" : ""
          }`}
        />
        <div className="flex flex-col p-2 max-w-[90%]">
          <p className="truncate font-semibold pb-2">{songName}</p>
          <p className="text-sm text-gray-300">{artists}</p>
        </div>
      </div>
  )
}
