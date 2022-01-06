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
    newSlots[DEFAULT_ROWS_IN_CONNECT_4 - 1][colIdx] = player;
    setSlots(newSlots);
    togglePlayer();
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
              <div className="grid-item" key={rowIdx + "," + colIdx}>
                <div className={changeColor(rowIdx, colIdx)} onClick={() => handleClick(colIdx)}>
                  {slot}
                </div>
              </div>
            )
          )
      )}
    </div>
  );
};
