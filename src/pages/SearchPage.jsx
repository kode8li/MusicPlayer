import { useState } from "react";
import musicDB from "../db/music";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSongDetails } from "../redux/musicSlice";
import { BsSearch } from "react-icons/bs";

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const results = musicDB.filter((music) =>
      music.name.toLowerCase().includes(query)
    );
    setSearchResults(results);
  };

  const handleCardClick = (result) => {
    dispatch(setSongDetails(result.attribution.song));
  };

  return (
    <section
      className="flex flex-col flex-1 max-h-screen overflow-y-scroll hide-scrollbar p-4 px-8"
      style={{
        background:
          "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
      }}
    >
      <div className="flex justify-center items-center gap-2 bg-gray-600 w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] mx-auto px-4 py-2 rounded-3xl text-lg border border-white focus:border-none focus:outline-none focus:border-opacity-100 selection:border-none outline-none">
        <BsSearch />
        <input
          type="text"
          placeholder="Search..."
          className="text-white bg-transparent border-opacity-50 focus:outline-none focus:border-opacity-100 w-full"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {searchQuery === "" ? (
        <p className="flex justify-center items-center font-bold text-2xl py-8">
          Please input your query to start searching
        </p>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4">
          {searchResults.map((result) => (
            <div
              key={result.id}
              onClick={() => handleCardClick(result)}
              className="flex flex-col justify-center p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
            >
              <Link to={`/songInfo/${result.attribution.song}`}>
                <img
                  src={`/img/${result.img}`}
                  alt={result.name}
                  className="w-full object-contain rounded mb-2"
                />
                <p className="font-semibold text-lg text-white truncate">
                  {result.attribution.song}
                </p>
                <p className="font-semibold text-sm text-gray-300 truncate">
                  {result.author_name}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="flex justify-center items-center font-bold text-2xl py-8">
          No results found.
        </p>
      )}
    </section>
  );
};
