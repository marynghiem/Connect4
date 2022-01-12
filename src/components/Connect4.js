import "../css/Connect4.css";
import React, { useState } from "react";
import {
  checkWinner,
  DEFAULT_COLS_IN_CONNECT_4,
  DEFAULT_ROWS_IN_CONNECT_4,
  PLAYER_ONE,
  PLAYER_TWO,
  isGameBoardFull,
} from "../game_logic/connect4Logic";

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
    if (isGameBoardFull(slots) === true) {
      alert("Gameboard is full. There is a tie!");
    } else if (lowestRow(colIdx) === undefined) {
      alert("Column is full!");
      return;
    } else if (checkWinner(slots) === PLAYER_ONE) {
      alert("Player one wins!");
    } else if (checkWinner(slots) === PLAYER_TWO) {
      alert("Player two wins!");
    } else {
      newSlots[lowestRow(colIdx)][colIdx] = player;
      setSlots(newSlots);
      togglePlayer();
    }
    console.log(checkWinner(slots));
  };

  const lowestRow = (columnNum) => {
    for (let i = DEFAULT_ROWS_IN_CONNECT_4 - 1; i > -1; i--) {
      if (slots[i][columnNum] === 0) {
        return i;
      }
    }
  };

  return (
    <div>
      <h1 className="titleName">Connect 4</h1>
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
                  <div className={changeColor(rowIdx, colIdx)}></div>
                </div>
              )
            )
        )}
      </div>
      <button className="button">Restart Game</button>
    </div>
  );
};
