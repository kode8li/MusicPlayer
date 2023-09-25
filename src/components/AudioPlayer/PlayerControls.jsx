import React from 'react'
import { BiSolidSkipPreviousCircle, BiSolidSkipNextCircle } from "react-icons/bi";
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";

export const PlayerControls = ({ handlePrevSong, isPlaying, handlePlay, handlePause, currentSong, formatTime, currentTime, duration, handleNextSong, handleSeekChange, audioPath, audioRef }) => {
  const isSmallerScreen = window.innerWidth <= 768; // Define a breakpoint for smaller screens

  return (
    <div className="flex md:flex-[0.4] md:max-w-[40%] flex-[0.5] max-w-[20%] w-full md:flex-col items-center justify-center">
      <div className={`flex md:gap-8 gap-2 md:justify-between justify-center pb-2 ${isSmallerScreen ? 'small-screen-icons' : ''}`}>
        <button onClick={handlePrevSong}>
          <BiSolidSkipPreviousCircle style={{ fontSize: isSmallerScreen ? "2rem" : "2.5rem" }} />
        </button>
        <button
          onClick={isPlaying ? handlePause : () => handlePlay(currentSong)}
        >
          {isPlaying ? (
            <BsPauseCircleFill style={{ fontSize: isSmallerScreen ? "2.5rem" : "3rem" }} />
          ) : (
            <BsPlayCircleFill style={{ fontSize: isSmallerScreen ? "2.5rem" : "3rem" }} />
          )}
        </button>
        <button onClick={handleNextSong}>
          <BiSolidSkipNextCircle style={{ fontSize: isSmallerScreen ? "2rem" : "2.5rem" }} />
        </button>
      </div>
      <div className="md:flex hidden gap-3 items-center justify-center">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || "0"}
          value={currentTime}
          onChange={handleSeekChange}
          className="accent-gray-400 min-w-[100%]"
        />
        <span>{formatTime(duration)}</span>
      </div>
        <audio key={audioPath} ref={audioRef} src={audioPath} />
    </div>
  )
}