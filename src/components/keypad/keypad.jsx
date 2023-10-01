/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "./keypad.module.css";

const keypadBoard = [..."qwertyuiopasdfghjklzxcvbnm"];
function Keypad({ handleCurrentLetter, currentWordObject }) {
  const handleClickOnKeypad = (e) => {
    const value = e.target.innerHTML;
    handleCurrentLetter(currentWordObject, value);
  };

  return (
    <>
      <div className={styles.keypad}>
        <span className={styles.header}>Keypad</span>
        <div className={styles.letters}>
          {keypadBoard.map((letter, index) => (
            <div
              className={styles.letter}
              key={index}
              onClick={handleClickOnKeypad}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Keypad;
