import React, { useState } from "react";
import axios from "axios";

const AddSongForm = ({ onSongAdded }) => {
  const [newSong, setNewSong] = useState({
    title: "",
    album: "",
    artist: "",
    genre: "",
    release_date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong((prevSong) => ({ ...prevSong, [name]: value }));
  };

  const handleAddSong = () => {
    axios
      .post("http://127.0.0.1:8000/api/music/", newSong)
      .then((response) => {
        onSongAdded(response.data); // Pass the new song data to the parent component
        setNewSong({
          title: "",
          album: "",
          artist: "",
          genre: "",
          release_date: "",
        });
      })
      .catch((error) => console.error(error));
  };

  

  return (
    <div>
      <h2>Add a New Song</h2>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newSong.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Album:</label>
          <input
            type="text"
            name="album"
            value={newSong.album}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Artist:</label>
          <input
            type="text"
            name="artist"
            value={newSong.artist}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={newSong.genre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Release Date:</label>
          <input
            type="date"
            name="release_date"
            value={newSong.release_date}
            onChange={handleInputChange}
          />
        </div>
       <button type="button" onClick={handleAddSong}>
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddSongForm;


 