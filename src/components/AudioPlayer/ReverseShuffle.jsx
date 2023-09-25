import React from 'react'
import { BiRepeat, BiShuffle } from "react-icons/bi";

export const ReverseShuffle = ({ toggleRepeatButton, isRepeatOn, toggleShufflePlayback, isShuffleOn }) => {
  const isSmallScreen = window.innerWidth <= 768; // Define a breakpoint for small screens

  return (
    <div className={`sm:flex sm:flex-col hidden flex-[0.2] max-w-[20%] items-center justify-center gap-3 ${isSmallScreen ? 'small-screen-icons' : ''}`}>
      <span onClick={toggleRepeatButton} className='cursor-pointer'>
        {isRepeatOn ? (
          <BiRepeat style={{ fontSize: isSmallScreen ? "1.5rem" : "2rem", color: "#3498db" }} />
        ) : (
          <BiRepeat style={{ fontSize: isSmallScreen ? "1.5rem" : "2rem" }} />
        )}
      </span>
      <span onClick={toggleShufflePlayback} className='cursor-pointer'>
        {isShuffleOn ? (
          <BiShuffle style={{ fontSize: isSmallScreen ? "1.5rem" : "2rem", color: "#3498db" }} />
        ) : (
          <BiShuffle style={{ fontSize: isSmallScreen ? "1.5rem" : "2rem" }} />
        )}
      </span>
    </div>
  )
}