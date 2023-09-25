import React, { useEffect, useState } from "react";
import musicDB from "../db/music";
import { Link, useParams } from "react-router-dom";
import { FaSpotify, FaYoutube } from "react-icons/fa6";

export const ArtistInfo = () => {
  const { id } = useParams();
  const artistIndex = musicDB.findIndex((item) =>
    item.author_name.includes(id)
  );
  const [authorImages, setAuthorImages] = useState([]);
  const [authorNames, setAuthorNames] = useState([]);
  const [spotifyLinks, setSpotifyLinks] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);

  useEffect(() => {
    if (artistIndex !== -1) {
      setAuthorImages(musicDB[artistIndex]?.author_img);
      setAuthorNames(musicDB[artistIndex]?.author_name.split(", "));
      setSpotifyLinks(
        musicDB[artistIndex]?.artist.map((artist) => artist.spotify)
      );
      setYoutubeLinks(
        musicDB[artistIndex]?.artist.map((artist) => artist.youtube)
      );
      setArtistInfo(musicDB[artistIndex]?.artist.map((artist) => artist.info));
    }
  }, [artistIndex]);

  return (
    <div
      className="h-[100vh] flex flex-col flex-1 max-h-[100vh] overflow-y-scroll hide-scrollbar p-4"
      style={{
        background:
          "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
      }}
    >
      {authorNames.map((name, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center gap-8 mb-4 px-8"
        >
          <div className="bg-white/5 bg-opacity-60 backdrop-blur-sm animate-slideup rounded-lg p-4">
            <img
              src={`/artist_img/${authorImages[index]}`}
              className="w-full md:w-[20vw] rounded border-2 border-white"
              alt={`${name}`}
            />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-3xl md:text-6xl font-bold mb-4 cursor-pointer">
              <Link to={artistInfo[index]} target="_blank">
                {name}
              </Link>
            </h1>
            <span className="flex items-center gap-4 flex-col md:flex-row">
              <h1 className="text-base md:text-lg">Checkout at : </h1>
              <div className="flex items-center gap-4 text-lg md:text-4xl">
                <Link
                  to={spotifyLinks[index]}
                  target="_blank"
                  className="hover:text-green-600 hover:rounded-[50%] hover:delay-100 hover:shadow-2xl p-2 bg-white rounded-[100%] text-black"
                >
                  <FaSpotify />
                </Link>
                <Link
                  to={youtubeLinks[index]}
                  target="_blank"
                  className="hover:text-red-600 hover:delay-100 hover:shadow-2xl rounded-[100%] p-2 bg-white text-black"
                >
                  <FaYoutube />
                </Link>
              </div>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
