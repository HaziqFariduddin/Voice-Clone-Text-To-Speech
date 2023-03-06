import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [audioUrl, setAudioUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const APIkey = process.env.REACT_APP_API_KEY;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.elevenlabs.io/v1/text-to-speech/XmOlcbcKsCsZm1gWLpUU",
        {
          text: text,
          voice_settings: {
            stability: 0.37,
            similarity_boost: 0.9,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": APIkey,
            Accept: "audio/mpeg",
          },
          responseType: "blob",
        }
      );
      setAudioUrl(window.URL.createObjectURL(response.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <div className="response">
        {loading ? (
          <div className="spinner">
            <div className="spinner1"></div>
          </div>
        ) : (
          audioUrl && <audio src={audioUrl} controls />
        )}
      </div>

      <form className='form' onSubmit={handleSubmit}>
        <input
          className='input'
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter Text"
          required
        />
        <button type="submit" className='input-submit'>
          {loading ? "Generating ...." : "Generate Voice"}
        </button>
      </form>
    </div>
  );
}

export default App;


