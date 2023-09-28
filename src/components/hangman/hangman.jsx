/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Keypad from "../keypad/keypad.jsx";
import { useState, useEffect } from "react";
import { list } from "../../db.js";
import heart from "../../assets/images/heart.png";
import restart from "../../assets/images/restart.png";
import hangman0 from "../../assets/svg/hangman-0.svg";
import hangman1 from "../../assets/svg/hangman-1.svg";
import hangman2 from "../../assets/svg/hangman-2.svg";
import hangman4 from "../../assets/svg/hangman-4.svg";
import hangman6 from "../../assets/svg/hangman-6.svg";

import styles from "./hangman.module.css";

function Hangman() {
  const [currentWordObject, setCurrentWordObject] = useState("");
  const [array, setArray] = useState([]);
  const [chancesRemaining, setChancesRemaining] = useState([]);
  const [wrongLimit, setWrongLimit] = useState(0);
  const [mistakes, setMistakes] = useState([]);
  const [currentImage, setCurrentImage] = useState(hangman0);

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (currentWordObject) {
      const length = currentWordObject.word.length;
      const maxWrongs = Math.floor(length * 0.5);
      setArray(Array(length).fill(""));
      setChancesRemaining(Array(maxWrongs).fill(""));
      setWrongLimit(maxWrongs);
    }
  }, [currentWordObject]);

  function newGame() {
    setCurrentImage(hangman0);
    setMistakes([]);
    const randomIndex = Math.floor(Math.random() * list.length);
    setCurrentWordObject(list[randomIndex]);
  }

  function decreaseLimit() {
    chancesRemaining.pop();
    gallowDrawing(wrongLimit, chancesRemaining.length);
  }

  function gallowDrawing(limit, chances) {
    if (limit === 4) {
      switch (chances) {
        case 3:
          setCurrentImage(hangman1);
          break;
        case 2:
          setCurrentImage(hangman2);
          break;
        case 1:
          setCurrentImage(hangman4);
          break;
        case 0:
          setCurrentImage(hangman6);
          endOfTheGame("lost");
          break;
        default:
          setCurrentImage(hangman0);
          break;
      }
    } else if (limit === 3) {
      switch (chances) {
        case 2:
          setCurrentImage(hangman1);
          break;
        case 1:
          setCurrentImage(hangman4);
          break;
        case 0:
          setCurrentImage(hangman6);
          endOfTheGame("lost");
          break;
        default:
          setCurrentImage(hangman0);
          break;
      }
    } else if (limit === 2) {
      switch (chances) {
        case 1:
          setCurrentImage(hangman1);
          break;
        case 0:
          setCurrentImage(hangman6);
          endOfTheGame("lost");
          break;
        default:
          setCurrentImage(hangman0);
          break;
      }
    }
  }

  function endOfTheGame(result) {
    setTimeout(() => {
      alert(`You ${result}`);
      newGame();
    }, 100);
  }

  function currentLetter(currentWordObject, letter) {
    const newArray = [...array];

    if (
      !currentWordObject.word.includes(letter) &&
      !mistakes.includes(letter)
    ) {
      setMistakes([...mistakes, letter]);
      decreaseLimit();
    }

    for (let i = 0; i < newArray.length; i++) {
      if (letter === currentWordObject.word[i] && !newArray[i]) {
        newArray[i] = letter;
        if (!newArray.includes("")) {
          endOfTheGame("win");
        }
      }
    }
    setArray(newArray);
  }

  return (
    <>
      <div className={styles.hangman}>
        <div>
          <img src={currentImage} className={styles.hangmanImage} alt="Icon" />
        </div>
        <div className={styles.hintLine}>
          <h3>{currentWordObject.hint}</h3>
          <button className={styles.restartButton} onClick={newGame}>
            <img className={styles.restart} src={restart} alt="Restart" />
          </button>
        </div>

        <div className={styles.life}>
          {chancesRemaining.map((l, i) => (
            <img className={styles.image} key={i} src={heart} alt="Heart" />
          ))}
          <div className={styles.mistakesTable}>
            Mistakes ({mistakes.length}):
            <span className={styles.mistakesList}>
              {mistakes.map((mistake, i) => (
                <p key={i} className={styles.mistakeItem}>
                  {mistake}
                </p>
              ))}
            </span>
          </div>
        </div>
        <div className={styles.field}>
          {array.map((l, i) => (
            <div className={styles.cell} key={i}>
              {l}
            </div>
          ))}
        </div>
        <Keypad
          currentLetter={currentLetter}
          currentWordObject={currentWordObject}
        />
      </div>
    </>
  );
}

export default Hangman;
