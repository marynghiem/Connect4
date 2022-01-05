import "../css/Connect4.css";
import React, { useState } from "react";

const create2DArray = (rowNum, columnNum) => {
  const totalArray = [];
  for (let i = 0; i < rowNum; i++) {
    const row = [];
    for (let j = 0; j < columnNum; j++) {
      row.push(0);
    }
    totalArray.push(row);
  }
  return totalArray;
};
const DEFAULT_ROWS_IN_CONNECT_4 = 6;
const DEFAULT_COLS_IN_CONNECT_4 = 7;

export const Connect4 = () => {
  const [slots, setSlots] = useState(create2DArray(DEFAULT_ROWS_IN_CONNECT_4, DEFAULT_COLS_IN_CONNECT_4));

  return <div class="board"></div>;
};
