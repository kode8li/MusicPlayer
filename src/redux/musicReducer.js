import musicDB from "../db/music";

export const initialState = {
  playlists: musicDB,
  playing: null,
  bannerOpen: false,
  search: null,
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLAYLIST":
      return {
        ...state,
        playlists: action.playlist,
      };
    case "SET_CURR_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    case "SET_BANNER_OPEN":
      return {
        ...state,
        bannerOpen: action.bannerOpen,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
};

export default musicReducer;