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

export const Connect4 = () => {
  const [slots, setSlots] = useState(create2DArray(DEFAULT_ROWS_IN_CONNECT_4, DEFAULT_COLS_IN_CONNECT_4));

  return (
    <div className="board">
      {slots.map((row, rowIdx) =>
        row.map((slot, colIdx) => (
          <div className="grid-item" key={rowIdx + "," + colIdx}>
            <div id="heart"></div>
          </div>
        ))
      )}
    </div>
  );
};
