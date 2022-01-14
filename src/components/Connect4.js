import "../css/Connect4.css";
import React, { useEffect, useState } from "react";
import {
  checkWinner,
  DEFAULT_COLS_IN_CONNECT_4,
  DEFAULT_ROWS_IN_CONNECT_4,
  PLAYER_ONE,
  PLAYER_TWO,
  isGameBoardFull,
  NO_PLAYER,
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
  const [closeModal, setCloseModal] = useState(false);

  const togglePlayer = () => {
    if (player === PLAYER_ONE) {
      setPlayer(PLAYER_TWO);
    } else if (player === PLAYER_TWO) {
      setPlayer(PLAYER_ONE);
    }
  };

  const changeHeartColor = (rowIdx, colIdx) => {
    let slotvalue = slots[rowIdx][colIdx];
    if (slotvalue === 0) {
      return "heart";
    } else if (slotvalue === 1) {
      return "heart redHeart fall";
    } else if (slotvalue === 2) {
      return "heart blueHeart fall";
    }
  };

  const changePlayersTurnColor = () => {
    if (player === PLAYER_ONE) {
      return "playersTurn";
    } else if (player === PLAYER_TWO) {
      return "playersTurn blueTurn";
    }
  };

  const handleOpenModal = () => {
    const winner = checkWinner(slots);
    if (closeModal === true) {
      return "modal closeModal";
    } else if (winner === PLAYER_ONE) {
      return "modal openModal";
    } else if (winner === PLAYER_TWO) {
      return "modal openModal";
    } else {
      return "modal";
    }
  };

  const handleCloseModal = () => {
    setCloseModal(true);
  };

  const handleClick = (colIdx) => {
    //doesnt allow user to play if board is full or if theres a winner
    if (isGameBoardFull(slots) || checkWinner(slots) !== NO_PLAYER) {
      return;
    }
    //doesnt allow user to add to column if it is full
    else if (lowestRow(colIdx) === undefined) {
      alert("Column is full!");
      return;
    }
    //sets state first
    const newSlots = [...slots];
    newSlots[lowestRow(colIdx)][colIdx] = player;
    setSlots(newSlots);
    togglePlayer();
    if (closeModal === true) {
      setCloseModal(false);
    }
  };
  //once state is set, then it runs useEffect
  useEffect(() => {
    //const winner = checkWinner(slots);
    //if (winner === PLAYER_ONE) {
    // setTimeout(function () {
    //  alert("Player one wins!");
    //}, 520);
    //} else if (winner === PLAYER_TWO) {
    //setTimeout(function () {
    //alert("Player two wins!");
    // }, 520);}else
    if (isGameBoardFull(slots) === true) {
      alert("Gameboard is full. There is a tie!");
    }
  }, [slots]);

  const lowestRow = (columnNum) => {
    for (let i = DEFAULT_ROWS_IN_CONNECT_4 - 1; i > -1; i--) {
      if (slots[i][columnNum] === 0) {
        return i;
      }
    }
  };

  const handleClearBoard = () => {
    setSlots(create2DArray(DEFAULT_ROWS_IN_CONNECT_4, DEFAULT_COLS_IN_CONNECT_4));
    setPlayer(PLAYER_ONE);
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
                  <div className={changeHeartColor(rowIdx, colIdx)}></div>
                </div>
              )
            )
        )}
      </div>
      <div id="myModal" className={handleOpenModal()}>
        <div className="modal-content">
          <span className="close" onClick={handleCloseModal}>
            &times;
          </span>
          <p className="congratsStatement">Congrats! Player {checkWinner(slots)} is the winnner!</p>
          <button className="button" onClick={handleClearBoard}>
            Restart Game
          </button>
        </div>
      </div>
      <div className="playersTurnAndButton">
        <div className={changePlayersTurnColor()}>Players {player} turn!</div>
        <button className="button" onClick={handleClearBoard}>
          Restart Game
        </button>
      </div>
    </div>
  );
};
