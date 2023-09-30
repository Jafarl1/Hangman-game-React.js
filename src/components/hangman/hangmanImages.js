import hangman0 from "../../assets/svg/hangman-0.svg";
import hangman1 from "../../assets/svg/hangman-1.svg";
import hangman2 from "../../assets/svg/hangman-2.svg";
import hangman3 from "../../assets/svg/hangman-3.svg";
import hangman4 from "../../assets/svg/hangman-4.svg";
import hangman5 from "../../assets/svg/hangman-5.svg";
import hangman6 from "../../assets/svg/hangman-6.svg";

export const hangmanImages = {
  0: hangman0,
  1: hangman1,
  2: hangman2,
  3: hangman3,
  4: hangman4,
  5: hangman5,
  6: hangman6,
};

export const getSuitableImagesPack = (limit) => {
  const imagesPacks = {
    6: {
      5: hangmanImages[1],
      4: hangmanImages[2],
      3: hangmanImages[3],
      2: hangmanImages[4],
      1: hangmanImages[5],
      0: hangmanImages[6],
    },
    5: {
      4: hangmanImages[1],
      3: hangmanImages[2],
      2: hangmanImages[3],
      1: hangmanImages[4],
      0: hangmanImages[6],
    },
    4: {
      3: hangmanImages[1],
      2: hangmanImages[2],
      1: hangmanImages[4],
      0: hangmanImages[6],
    },
    3: {
      2: hangmanImages[1],
      1: hangmanImages[4],
      0: hangmanImages[6],
    },
    2: {
      1: hangmanImages[1],
      0: hangmanImages[6],
    },
    1: {
      0: hangmanImages[6],
    },
  };

  return imagesPacks[limit];
};
