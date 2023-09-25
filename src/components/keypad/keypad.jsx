/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./keypad.module.css";

function Keypad() {
  const [keypadBoard, setKeypadBoard] = useState([
    ..."qwertyuiopasdfghjklzxcvbnm",
  ]);

  const handleClickOnKeypad = (e) => {
    const value = e.target.innerHTML;
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
          <div
            className={`${styles.letter} ${styles.del}`}
            onClick={handleClickOnKeypad}
          >
            del
          </div>
        </div>
      </div>
    </>
  );
}

export default Keypad;
