/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Keypad from "../keypad/keypad.jsx";
import { useState, useEffect } from "react";
import { list } from "../../db.js";

import { hangmanImages } from "./hangmanImages.js";

import heart from "../../assets/images/heart.png";
import restart from "../../assets/images/restart.png";

import styles from "./hangman.module.css";

function Hangman() {
  const [currentWordObject, setCurrentWordObject] = useState("");
  const [array, setArray] = useState([]);
  const [gameLevel, setGameLevel] = useState("easy");
  const [gameStarted, setGameStarted] = useState(false);
  const [chancesRemaining, setChancesRemaining] = useState([]);
  const [wrongLimit, setWrongLimit] = useState(0);
  const [mistakes, setMistakes] = useState([]);
  const [currentImage, setCurrentImage] = useState(hangmanImages[0]);

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (currentWordObject && currentWordObject.word.length > 10) {
      newGame();
    }

    if (currentWordObject) {
      const length = currentWordObject.word.length;
      const maxWrongs = determineLimit(gameLevel, length);
      setArray(Array(length).fill(""));
      setChancesRemaining(Array(maxWrongs).fill(""));
      setWrongLimit(maxWrongs);
    }
  }, [currentWordObject, gameLevel]);

  function newGame() {
    const randomIndex = Math.floor(Math.random() * list.length);
    setCurrentWordObject(list[randomIndex]);
    setCurrentImage(hangmanImages[0]);
    setMistakes([]);
    setGameStarted(false);
  }

  function determineLimit(level, length) {
    if (level === "easy") {
      return Math.ceil(length * 0.6);
    } else if (level === "medium") {
      return Math.ceil(length * 0.4);
    } else if (level === "hard") {
      return Math.ceil(length * 0.2);
    }
  }

  function selectLevel(e) {
    const level = e.target.value;
    setGameLevel(level.toLowerCase());
  }

  function decreaseLimit() {
    chancesRemaining.pop();
    gallowDrawing(wrongLimit, chancesRemaining.length);
  }

  function gallowDrawing(limit, chances) {
    let hangmanImagesArray;

    if (limit === 6) {
      hangmanImagesArray = {
        5: hangmanImages[1],
        4: hangmanImages[2],
        3: hangmanImages[3],
        2: hangmanImages[4],
        1: hangmanImages[5],
        0: hangmanImages[6],
      };
    } else if (limit === 5) {
      hangmanImagesArray = {
        4: hangmanImages[1],
        3: hangmanImages[2],
        2: hangmanImages[3],
        1: hangmanImages[4],
        0: hangmanImages[6],
      };
    } else if (limit === 4) {
      hangmanImagesArray = {
        3: hangmanImages[1],
        2: hangmanImages[2],
        1: hangmanImages[4],
        0: hangmanImages[6],
      };
    } else if (limit === 3) {
      hangmanImagesArray = {
        2: hangmanImages[1],
        1: hangmanImages[4],
        0: hangmanImages[6],
      };
    } else if (limit === 2) {
      hangmanImagesArray = {
        1: hangmanImages[1],
        0: hangmanImages[6],
      };
    } else if (limit === 1) {
      hangmanImagesArray = {
        0: hangmanImages[6],
      };
    }

    if (chances in hangmanImagesArray) {
      setCurrentImage(hangmanImagesArray[chances]);
      if (chances === 0) {
        endOfTheGame("lost");
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
    setGameStarted(true);
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
        <div className={styles.gameTable}>
          <div className={styles.levelArea}>
            <h3 className={styles.levelH2}>level</h3>
            <select
              name="level"
              className={styles.levelSelect}
              onChange={selectLevel}
              disabled={gameStarted}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
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
