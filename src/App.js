import React, { useState, useEffect } from "react";
import "./App.css";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import SearchBar from "./Components/SearchBar/SearchBar";
import MusicTable from "./Components/MusicTable/MusicTable";
import AddSongForm from "./Components/AddSongForm/AddSongForm";
import axios from "axios";

function App() {
  const [musicData, setMusicData] = useState([]);
  // Dont need to use but left here just incase when come back to it might need it.
  // const [filteredMusicData, setFilteredMusicData] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");

  // Fetch music data from the backend and update the musicData state
  useEffect(() => {
    const fetchMusicDataFromBackend = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/music/");
        setMusicData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMusicDataFromBackend();
  }, []);

   const handleSearch = (searchTerm) => {
    // setSearchTerm(searchTerm); // Update the search term state
     // Filter the musicData based on the search term
     const filteredData = musicData.filter((song) => {
       return (
         song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
         song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
         song.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
         song.release_date.toLowerCase().includes(searchTerm.toLowerCase())
       );
     });
     setMusicData(filteredData); // Update the filtered music data state
    //need to add a way to reload the database so it can seach the full database or add a refresh button next to the search button.
    };


  // Function to add a new song to the musicData state
  const handleSongAdded = (newSong) => {
    setMusicData((prevMusicData) => [...prevMusicData, newSong]);
  };

  return (
    <div className="App">
      <NavigationBar />
      <div className="content">
        <h1>Music Library</h1>
        <SearchBar onSearch={handleSearch} />
        <MusicTable musicData={musicData} />
        <AddSongForm onSongAdded={handleSongAdded} />
      </div>
    </div>
  );
}

export default App;
