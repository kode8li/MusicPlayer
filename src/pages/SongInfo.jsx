import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";
import { ImageHoverPlayPause } from "../utils/ImageHoverPlayPause";
import musicDB from "../db/music";

export const SongInfo = () => {
  const { id } = useParams();
  const musicName = useSelector((state) => state.music.songDetails);

  const [index, setIndex] = useState(null);
  const [lyrics, setLyrics] = useState("");
  const [songImage, setSongImage] = useState("");
  const [songName, setSongName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [musicType, setMusicType] = useState("");
  const [streamLink, setStreamLink] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);

  useEffect(() => {
    if (id !== "") {
      const songIndex = musicDB.findIndex((song) => song.attribution.song === id);
      setIndex(songIndex);
      setCurrentSongIndex(songIndex);
    }
  }, [id]);

  useEffect(() => {
    if (currentSongIndex !== -1) {
      if (musicDB[currentSongIndex]?.lyrics !== "") {
        setLyrics(musicDB[currentSongIndex]?.lyrics);
      } else {
        setLyrics("Sorry, no lyrics found");
      }
      setSongImage(musicDB[currentSongIndex]?.img);
      setSongName(musicDB[currentSongIndex]?.attribution.song);
      setAuthorName(musicDB[currentSongIndex]?.author_name);
      setMusicType(musicDB[currentSongIndex]?.type);
      setStreamLink(musicDB[currentSongIndex]?.attribution.stream);
    }
  }, [currentSongIndex]);

  return (
    <>
      <section
        className="h-[100vh] flex flex-col flex-1 max-h-[100vh] overflow-y-scroll hide-scrollbar p-4"
        style={{
          background:
            "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end gap-8 px-6 pb-6">
          {index > -1 && currentSongIndex > -1 && (
            <ImageHoverPlayPause music={musicDB[currentSongIndex]} />
          )}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{songName}</h1>
            <h6 className="text-xl md:text-2xl font-semibold mb-1 hover:underline">
              <Link to={`/artistInfo/${authorName}`}>{authorName}</Link>
            </h6>
            <span className="flex items-center hover:underline text-lg">
              <Link
                className="flex items-center gap-2"
                to={streamLink}
                target="_blank"
              >
                Stream at: <BiLinkExternal />
              </Link>
            </span>
          </div>
        </div>
        <div className="px-6">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">Lyrics:</h1>
          <pre
            style={{
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              fontSize: "1.125rem",
            }}
          >
            {lyrics}
          </pre>
        </div>
      </section>
    </>
  );
};
