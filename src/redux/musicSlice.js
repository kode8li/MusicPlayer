import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  currentSong: null,
  currentIndex: -1,
  songDetails: null,
  isMuted: false,
  isShuffleOn: false, // Added for shuffle functionality
  isRepeatOn: false, // Added for repeat functionality
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    playSong(state, action) {
      state.isPlaying = true;
      state.currentSong = action.payload;
    },
    pauseSong(state) {
      state.isPlaying = false;
    },
    setIndex(state, action) {
      state.currentIndex = action.payload;
    },
    setSongDetails(state, action) {
      state.songDetails = action.payload;
    },
    stopSong(state) {
      state.isPlaying = false;
      state.currentSong = null;
      state.currentIndex = -1;
    },
    toggleMute(state) {
      state.isMuted = !state.isMuted;
    },
    toggleShuffle(state) {
      state.isShuffleOn = !state.isShuffleOn;
    },
    toggleRepeat(state) {
      state.isRepeatOn = !state.isRepeatOn;
    },
  },
});

export const {
  playSong,
  pauseSong,
  setIndex,
  setSongDetails,
  stopSong,
  toggleMute,
  toggleShuffle,
  toggleRepeat,
} = musicSlice.actions;

export default musicSlice.reducer;