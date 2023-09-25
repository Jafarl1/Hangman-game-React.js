/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Keypad from "../keypad/keypad.jsx";
import { useState, useEffect } from "react";
import { list } from "../../db.js";
import heart from "../../assets/images/heart.png";

import styles from "./hangman.module.css";

function Hangman() {
  const [current, setCurrent] = useState("");
  const [array, setArray] = useState([]);
  const [wrongLimit, setWrongLimit] = useState([]);

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (current) {
      setArray(Array(current.word.length).fill(""));

      if (current.word.length < 5) {
        setWrongLimit(Array(2).fill(""));
      } else if (current.word.length < 9) {
        setWrongLimit(Array(3).fill(""));
      } else {
        setWrongLimit(Array(4).fill(""));
      }
    }
  }, [current]);

  function newGame() {
    const randomIndex = Math.floor(Math.random() * list.length);
    setCurrent(list[randomIndex]);
  }

  function decreaseLimit() {
    wrongLimit.pop();

    if (wrongLimit.length === 0) {
      alert("YOU LOSE!");
      newGame();
    }
  }

  function currentLetter(current, letter) {
    const newArray = [...array];

    if (!current.word.includes(letter)) {
      decreaseLimit();
    }

    for (let i = 0; i < newArray.length; i++) {
      if (letter === current.word[i] && !newArray[i]) {
        newArray[i] = letter;
      }
    }
    setArray(newArray);
  }

  return (
    <>
      <div className={styles.hangman}>
        <h2>{current.hint}</h2>
        <div className={styles.life}>
          {wrongLimit.map((l, i) => (
            <img className={styles.image} key={i} src={heart} alt="Heart" />
          ))}
        </div>
        <div className={styles.field}>
          {array.map((l, i) => (
            <div className={styles.cell} key={i}>
              {l}
            </div>
          ))}
        </div>
        <Keypad currentLetter={currentLetter} current={current} />
      </div>
    </>
  );
}

export default Hangman;
