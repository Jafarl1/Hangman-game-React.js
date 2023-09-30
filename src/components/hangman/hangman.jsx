/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Keypad from "../keypad/keypad.jsx";
import { useState, useEffect } from "react";
import { list } from "../../db.js";
import { hangmanImages, getSuitableImagesPack } from "./hangmanImages.js";

import heart from "../../assets/images/heart.png";
import restart from "../../assets/images/restart.png";

import styles from "./hangman.module.css";

function Hangman() {
  const [currentWordObject, setCurrentWordObject] = useState("");
  const [fieldsArray, setFieldsArray] = useState([]);
  const [gameLevel, setGameLevel] = useState("easy");
  const [gameStarted, setGameStarted] = useState(false);
  const [chancesRemaining, setChancesRemaining] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [wrongsLimit, setWrongsLimit] = useState(0);
  const [currentImage, setCurrentImage] = useState(hangmanImages[0]);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (currentWordObject && currentWordObject.word.length > 10) {
      startNewGame();
    }

    if (currentWordObject) {
      const length = currentWordObject.word.length;
      const maxWrongs = determineLimit(gameLevel, length);
      setFieldsArray(Array(length).fill(""));
      setChancesRemaining(Array(maxWrongs).fill(""));
      setWrongsLimit(maxWrongs);
    }
  }, [currentWordObject, gameLevel]);

  function startNewGame() {
    const randomIndex = Math.floor(Math.random() * list.length);
    setCurrentWordObject(list[randomIndex]);
    setCurrentImage(hangmanImages[0]);
    setMistakes([]);
    setGameStarted(false);
  }

  function determineLimit(level, length) {
    const difficultyLevel = {
      easy: 0.6,
      medium: 0.4,
      hard: 0.2,
    };

    return Math.ceil(length * difficultyLevel[level]);
  }

  function selectLevel(e) {
    const level = e.target.value;
    setGameLevel(level.toLowerCase());
  }

  function decreaseLimit() {
    chancesRemaining.pop();
    drawingGallow(wrongsLimit, chancesRemaining.length);
  }

  function drawingGallow(limit, chances) {
    const hangmanImagesArray = getSuitableImagesPack(limit);

    if (chances in hangmanImagesArray) {
      setCurrentImage(hangmanImagesArray[chances]);
      if (chances === 0) {
        finishTheGame("lost");
      }
    }
  }

  function finishTheGame(result) {
    setTimeout(() => {
      alert(`You ${result}`);
      startNewGame();
    }, 100);
  }

  function handleCurrentLetter(currentWordObject, letter) {
    setGameStarted(true);
    const newArray = [...fieldsArray];

    if (
      !currentWordObject.word.includes(letter) &&
      !mistakes.includes(letter)
    ) {
      setMistakes([...mistakes, letter]);
      decreaseLimit();
    }

    for (let index = 0; index < newArray.length; index++) {
      if (letter === currentWordObject.word[index] && !newArray[index]) {
        newArray[index] = letter;
        if (!newArray.includes("")) {
          finishTheGame("win");
        }
      }
    }
    setFieldsArray(newArray);
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
          <button className={styles.restartButton} onClick={startNewGame}>
            <img className={styles.restart} src={restart} alt="Restart" />
          </button>
        </div>

        <div className={styles.life}>
          {chancesRemaining.map((chance, index) => (
            <img className={styles.image} key={index} src={heart} alt="Heart" />
          ))}
          <div className={styles.mistakesTable}>
            Mistakes ({mistakes.length}):
            <span className={styles.mistakesList}>
              {mistakes.map((mistake, index) => (
                <p key={index} className={styles.mistakeItem}>
                  {mistake}
                </p>
              ))}
            </span>
          </div>
        </div>
        <div className={styles.field}>
          {fieldsArray.map((field, index) => (
            <div className={styles.cell} key={index}>
              {field}
            </div>
          ))}
        </div>
        <Keypad
          handleCurrentLetter={handleCurrentLetter}
          currentWordObject={currentWordObject}
        />
      </div>
    </>
  );
}

export default Hangman;
