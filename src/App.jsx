/* eslint-disable no-unused-vars */
import { useState } from "react";
import Hangman from "./components/hangman/hangman.jsx";

import "./styles/styles.css";

function App() {
  return (
    <>
      <div className="app">
        <div className="wrap">
          <Hangman />
        </div>
      </div>
    </>
  );
}

export default App;
