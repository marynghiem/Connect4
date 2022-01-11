import "../css/Connect4.css";
import React, { useState } from "react";

const create2DArray = (rowNum, columnNum) => {
  const totalArray = [];
  for (let i = 0; i < rowNum; i++) {
    const rows = [];
    for (let j = 0; j < columnNum; j++) {
      rows.push(0);
    }
    totalArray.push(rows);
  }
  return totalArray;
};
const DEFAULT_ROWS_IN_CONNECT_4 = 6;
const DEFAULT_COLS_IN_CONNECT_4 = 7;
const NO_PLAYER = 0;
const PLAYER_ONE = 1;
const PLAYER_TWO = 2;

export const Connect4 = () => {
  const [slots, setSlots] = useState(create2DArray(DEFAULT_ROWS_IN_CONNECT_4, DEFAULT_COLS_IN_CONNECT_4));
  const [player, setPlayer] = useState(PLAYER_ONE);

  const togglePlayer = () => {
    if (player === PLAYER_ONE) {
      setPlayer(PLAYER_TWO);
    } else if (player === PLAYER_TWO) {
      setPlayer(PLAYER_ONE);
    }
  };

  const changeColor = (rowIdx, colIdx) => {
    let slotvalue = slots[rowIdx][colIdx];
    if (slotvalue === 0) {
      return "heart";
    } else if (slotvalue === 1) {
      return "heart redHeart";
    } else if (slotvalue === 2) {
      return "heart blueHeart";
    }
  };

  const handleClick = (colIdx) => {
    const newSlots = [...slots];
    if (lowestRow(colIdx) === undefined) {
      alert("Column is full!");
      return;
    }
    newSlots[lowestRow(colIdx)][colIdx] = player;
    setSlots(newSlots);
    togglePlayer();
    console.log(checkWinner());
  };

  const lowestRow = (columnNum) => {
    for (let i = DEFAULT_ROWS_IN_CONNECT_4 - 1; i > -1; i--) {
      if (slots[i][columnNum] === 0) {
        return i;
      }
    }
  };

  //game logic

  //Returns the player that won the game, or NO_PLAYER if no one wins
  const checkWinner = () => {
    for (let i = DEFAULT_ROWS_IN_CONNECT_4 - 1; i > -1; i--) {
      for (let j = 0; j < DEFAULT_COLS_IN_CONNECT_4; j++) {
        const winner = checkWinnerAtCell(i, j);
        if (winner !== NO_PLAYER) {
          return winner;
        }
      }
    }
    return NO_PLAYER;
  };

  //Return the player that won the game at this cell
  const checkWinnerAtCell = (i, j) => {
    if (checkHorizontal(i, j) !== NO_PLAYER) {
      return checkHorizontal(i, j);
    }
    if (checkVertical(i, j) !== NO_PLAYER) {
      return checkVertical(i, j);
    }
    if (checkDiagonal(i, j) !== NO_PLAYER) {
      return checkDiagonal(i, j);
    }
    return NO_PLAYER;
  };

  const checkHorizontal = (i, j) => {
    if (checkHorizontalLeft(i, j) !== NO_PLAYER) {
      return checkHorizontalLeft(i, j);
    }
    if (checkHorizontalRight(i, j) !== NO_PLAYER) {
      return checkHorizontalRight(i, j);
    }
  };

  const checkHorizontalRight = (i, j) => {
    const player = slots[i][j];
    if (player === PLAYER_ONE) {
      //checking on right 3 spaces
      for (let k = 1; k < 4; k++) {
        //if there is no more spaces to left
        if (j + k > DEFAULT_COLS_IN_CONNECT_4 - 1) {
          return NO_PLAYER;
        } else if (slots[i][j + k] !== PLAYER_ONE) {
          return NO_PLAYER;
        }
      }
      return PLAYER_ONE;
    } else if (player === PLAYER_TWO) {
      //checking on right 3 spaces
      for (let k = 1; k < 4; k++) {
        //if there is no more spaces to left
        if (j + k > DEFAULT_COLS_IN_CONNECT_4 - 1) {
          return NO_PLAYER;
        } else if (slots[i][j + k] !== PLAYER_ONE) {
          return NO_PLAYER;
        }
      }
      return PLAYER_TWO;
    }
  };

  const checkHorizontalLeft = (i, j) => {
    const player = slots[i][j];
    if (player === PLAYER_ONE) {
      for (let m = 1; m < 4; m++) {
        //if there are no more spaces to right
        if (j - m < 0) {
          return NO_PLAYER;
        } else if (slots[i][j - m] !== PLAYER_ONE) {
          return NO_PLAYER;
        }
      }
      return PLAYER_ONE;
    } else if (player === PLAYER_TWO) {
      for (let m = 1; m < 4; m++) {
        //if there are no more spaces to right
        if (j - m < 0) {
          return NO_PLAYER;
        } else if (slots[i][j - m] !== PLAYER_TWO) {
          return NO_PLAYER;
        }
      }
      return PLAYER_TWO;
    }
  };

  const checkVertical = (i, j) => {
    if (checkVerticalUp(i, j) !== NO_PLAYER) {
      return checkVerticalUp(i, j);
    }
    if (checkVerticalDown(i, j) !== NO_PLAYER) {
      return checkVerticalDown(i, j);
    }
  };

  const checkVerticalUp = (i, j) => {
    const player = slots[i][j];
    if (player === PLAYER_ONE) {
      for (let m = 1; m < 4; m++) {
        //if there are no more spaces up
        if (i - m < 0) {
          return NO_PLAYER;
        } else if (slots[i - m][j] !== PLAYER_ONE) {
          return NO_PLAYER;
        }
      }
      return PLAYER_ONE;
    } else if (player === PLAYER_TWO) {
      for (let m = 1; m < 4; m++) {
        //if there are no more spaces up
        if (i - m < 0) {
          return NO_PLAYER;
        } else if (slots[i - m][j] !== PLAYER_TWO) {
          return NO_PLAYER;
        }
      }
      return PLAYER_TWO;
    }
  };
  const checkVerticalDown = (i, j) => {
    const player = slots[i][j];
    if (player === PLAYER_ONE) {
      for (let k = 1; k < 4; k++) {
        if (i + k > DEFAULT_ROWS_IN_CONNECT_4 - 1) {
          return NO_PLAYER;
        } else if (slots[i + k][j] !== PLAYER_ONE) {
          return NO_PLAYER;
        }
      }
      return PLAYER_ONE;
    } else if (player === PLAYER_TWO) {
      for (let k = 1; k < 4; k++) {
        if (i + k > DEFAULT_ROWS_IN_CONNECT_4 - 1) {
          return NO_PLAYER;
        } else if (slots[i + k][j] !== PLAYER_TWO) {
          return NO_PLAYER;
        }
      }
      return PLAYER_TWO;
    }
  };

  const checkDiagonal = (i, j) => {
    if (checkDiagonalTopLeft(i, j) !== NO_PLAYER) {
      return checkDiagonalTopLeft(i, j);
    }
    if (checkDiagonalTopRight(i, j) !== NO_PLAYER) {
      return checkDiagonalTopRight(i, j);
    }
    if (checkDiagonalBottomLeft(i, j) !== NO_PLAYER) {
      return checkDiagonalBottomLeft(i, j);
    }
    if (checkDiagonalBottomRight(i, j) !== NO_PLAYER) {
      return checkDiagonalBottomRight(i, j);
    }
  };

  const checkDiagonalTopLeft = (i, j) => {
    const player = slots[i][j];
    if (player === PLAYER_ONE) {
      for (let m = 1; m < 4; m++) {
        if (i - m < 0 || j - m < 0) {
          return NO_PLAYER;
        } else if (slots[i - m][j - m] !== PLAYER_ONE) {
          return NO_PLAYER;
        }
      }
      return PLAYER_ONE;
    } else if (player === PLAYER_TWO) {
      for (let m = 1; m < 4; m++) {
        if (i - m < 0 || j - m < 0) {
          return NO_PLAYER;
        } else if (slots[i - m][j - m] !== PLAYER_TWO) {
          return NO_PLAYER;
        }
      }
      return PLAYER_TWO;
    }
  };
  const checkDiagonalTopRight = (i, j) => {
    const player = slots[i][j];
    if (player === PLAYER_ONE) {
      for (let k = 1; k < 4; k++) {
        if (j + k > DEFAULT_COLS_IN_CONNECT_4 - 1 || i - k < 0) {
          return NO_PLAYER;
        } else if (slots[i - k][j + k] !== PLAYER_ONE) {
          return NO_PLAYER;
        }
      }
      return PLAYER_ONE;
    } else if (player === PLAYER_TWO) {
      for (let k = 1; k < 4; k++) {
        if (j + k > DEFAULT_COLS_IN_CONNECT_4 - 1 || i - k < 0) {
          return NO_PLAYER;
        } else if (slots[i - k][j + k] !== PLAYER_TWO) {
          return NO_PLAYER;
        }
      }
      return PLAYER_TWO;
    }
  };

  const checkDiagonalBottomLeft = (i, j) => {
    const player = slots[i][j];
    if (player === PLAYER_ONE) {
      for (let k = 1; k < 4; k++) {
        if (i + k > DEFAULT_ROWS_IN_CONNECT_4 - 1 || j - k < 0) {
          return NO_PLAYER;
        } else if (slots[i + k][j - k] !== PLAYER_ONE) {
          return NO_PLAYER;
        }
      }
      return PLAYER_ONE;
    } else if (player === PLAYER_TWO) {
      for (let k = 1; k < 4; k++) {
        if (i + k > DEFAULT_ROWS_IN_CONNECT_4 - 1 || j - k < 0) {
          return NO_PLAYER;
        } else if (slots[i + k][j - k] !== PLAYER_TWO) {
          return NO_PLAYER;
        }
      }
      return PLAYER_TWO;
    }
  };

  const checkDiagonalBottomRight = (i, j) => {
    const player = slots[i][j];
    if (player === PLAYER_ONE) {
      for (let k = 1; k < 4; k++) {
        if (i + k > DEFAULT_ROWS_IN_CONNECT_4 - 1 || j + k > DEFAULT_COLS_IN_CONNECT_4 - 1) {
          return NO_PLAYER;
        } else if (slots[i + k][j + k] !== PLAYER_ONE) {
          return NO_PLAYER;
        }
      }
      return PLAYER_ONE;
    } else if (player === PLAYER_TWO) {
      for (let k = 1; k < 4; k++) {
        if (i + k > DEFAULT_ROWS_IN_CONNECT_4 - 1 || j + k > DEFAULT_COLS_IN_CONNECT_4 - 1) {
          return NO_PLAYER;
        } else if (slots[i + k][j + k] !== PLAYER_TWO) {
          return NO_PLAYER;
        }
      }
      return PLAYER_TWO;
    }
  };

  return (
    <div className="board">
      {slots.map(
        (
          row,
          rowIdx // loop through each row - each item is one array
        ) =>
          row.map(
            (
              slot,
              colIdx // loop through each column - each item is a 0, 1, or 2
            ) => (
              <div className="grid-item" key={rowIdx + "," + colIdx} onClick={() => handleClick(colIdx)}>
                <div className={changeColor(rowIdx, colIdx)}>{slot}</div>
              </div>
            )
          )
      )}
    </div>
  );
};
