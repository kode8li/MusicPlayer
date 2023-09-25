import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  playSong,
  pauseSong,
  stopSong,
  setIndex,
  toggleMute,
  toggleRepeat,
  toggleShuffle,
} from "../../redux/musicSlice";
import musicDB from "../../db/music";
import "./AudioPlayer.css";
import { SongDetails } from "./SongDetails";
import { PlayerControls } from "./PlayerControls";
import { Volumebar } from "./Volumebar";
import { ReverseShuffle } from "./ReverseShuffle";

const AudioPlayer = () => {
  const isPlaying = useSelector((state) => state.music.isPlaying);
  const currentSong = useSelector((state) => state.music.currentSong);
  const currentIndex = useSelector((state) => state.music.currentIndex);
  const isMuted = useSelector((state) => state.music.isMuted);
  const songName = musicDB[currentIndex]?.attribution.song || "";
  const bannerImage = musicDB[currentIndex]?.img || "";
  const artists = musicDB[currentIndex]?.author_name || "";
  const isRepeatOn = useSelector((state) => state.music.isRepeatOn);
  const isShuffleOn = useSelector((state) => state.music.isShuffleOn);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Initialize volume state to maximum (1)

  const audioPath = `/music/${currentSong}`;

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [isPlaying, currentSong, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
      audioRef.current.onended = () => {
        // When the song ends, play the next song
        handleNextSong();
      };
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
        audioRef.current.onloadedmetadata = null;
        audioRef.current.onended = null;
      }
    };
  }, [currentSong, []]);

  const handlePlay = (song) => {
    dispatch(playSong(song));
  };

  const handlePause = () => {
    dispatch(pauseSong());
  };

  const handleStop = () => {
    dispatch(stopSong());
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset the audio to the beginning
    }
  };

  const handleSeekChange = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value;
      setCurrentTime(e.target.value);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const getRandomIndex = (currentIndex, length) => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * length);
    } while (randomIndex === currentIndex);
    return randomIndex;
  };

  const handleNextSong = () => {
    if (isRepeatOn) {
      // If repeat is on, reset the audio to the beginning and play the current song
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (isShuffleOn) {
      // If shuffle is on, get a random index for the next song
      const nextIndex = getRandomIndex(currentIndex, musicDB.length);
      dispatch(setIndex(nextIndex));
      dispatch(playSong(musicDB[nextIndex].musicName));
    } else {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= musicDB.length) nextIndex = 0; // Loop back to the first song if it's the last song
      dispatch(setIndex(nextIndex));
      dispatch(playSong(musicDB[nextIndex].musicName));
    }
  };

  // Function to handle previous song
  const handlePrevSong = () => {
    if (isRepeatOn) {
      // If repeat is on, reset the audio to the beginning and play the current song
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) prevIndex = musicDB.length - 1; // Loop back to the last song if it's the first song
      dispatch(setIndex(prevIndex));
      dispatch(playSong(musicDB[prevIndex].musicName));
    }
  };

  // Function to handle volume change
  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      audioRef.current.volume = e.target.value;
      setVolume(e.target.value);
    }
  };

  const toggleMuteVolume = () => {
    dispatch(toggleMute()); // Dispatch the toggleMute action
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume > 0 ? volume : 1;
        setVolume(volume > 0 ? volume : 1);
      } else {
        audioRef.current.volume = 0;
        setVolume(0);
      }
    }
  };

  const toggleRepeatButton = () => {
    dispatch(toggleRepeat());
  };

  const toggleShufflePlayback = () => {
    dispatch(toggleShuffle());
  };

  return (
    <div className="fixed bottom-0 p-4 flex justify-between items-center w-full bg-transparent">
      <SongDetails
        bannerImage={bannerImage}
        isPlaying={isPlaying}
        currentSong={currentSong}
        songName={songName}
        artists={artists}
      />
      <PlayerControls
        handlePrevSong={handlePrevSong}
        isPlaying={isPlaying}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleNextSong={handleNextSong}
        currentSong={currentSong}
        formatTime={formatTime}
        currentTime={currentTime}
        duration={duration}
        handleSeekChange={handleSeekChange}
        audioPath={audioPath}
        audioRef={audioRef}
      />
      <Volumebar
        toggleMuteVolume={toggleMuteVolume}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
      />
      <ReverseShuffle
        toggleRepeatButton={toggleRepeatButton}
        isRepeatOn={isRepeatOn}
        toggleShufflePlayback={toggleShufflePlayback}
        isShuffleOn={isShuffleOn}
      />
    </div>
  );
};

export default AudioPlayer;