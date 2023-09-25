import React from "react";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";

export const Volumebar = ({ toggleMuteVolume, volume, handleVolumeChange }) => {
  return (
    <div className="md:flex hidden flex-[0.3] max-w-[30%] items-center justify-center gap-3">
      <span onClick={toggleMuteVolume}>
        {volume > 0 ? (
          <BsFillVolumeUpFill style={{ fontSize: "2rem" }} />
        ) : (
          <BsFillVolumeMuteFill style={{ fontSize: "2rem" }} />
        )}
      </span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="accent-gray-400 min-w-[50%]"
      />
      <span>{Math.round(volume * 100)}</span>
    </div>
  );
};
