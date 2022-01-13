export const DEFAULT_ROWS_IN_CONNECT_4 = 6;
export const DEFAULT_COLS_IN_CONNECT_4 = 7;
export const NO_PLAYER = 0;
export const PLAYER_ONE = 1;
export const PLAYER_TWO = 2;

export const isGameBoardFull = (slots) => {
  for (let i = 0; i < DEFAULT_COLS_IN_CONNECT_4 - 1; i++) {
    if (slots[0][i] === NO_PLAYER) {
      return false;
    }
  }
  return true;
};

export const checkWinner = (slots) => {
  for (let i = DEFAULT_ROWS_IN_CONNECT_4 - 1; i > -1; i--) {
    for (let j = 0; j < DEFAULT_COLS_IN_CONNECT_4; j++) {
      const winner = checkWinnerAtCell(i, j, slots);
      if (winner !== NO_PLAYER) {
        return winner;
      }
    }
  }
  return NO_PLAYER;
};

//Return the player that won the game at this cell
const checkWinnerAtCell = (i, j, slots) => {
  //typeOfWinner = []
  //const typeOfWinner = typeOfWinner(i,j,slots);
  //if (typeOfWinner !== NO_PLAYER) {
  // return typeOfWinner;
  //}
  const horizontalWinner = checkHorizontal(i, j, slots);
  if (horizontalWinner !== NO_PLAYER) {
    console.log("horizontal win");
    return horizontalWinner;
  }
  const verticalWinner = checkVertical(i, j, slots);
  if (verticalWinner !== NO_PLAYER) {
    console.log("vertical win");
    return verticalWinner;
  }
  const diagonalWinner = checkDiagonal(i, j, slots);
  if (diagonalWinner !== NO_PLAYER) {
    console.log("diagonal win");
    return diagonalWinner;
  }
  return NO_PLAYER;
};

const checkHorizontal = (i, j, slots) => {
  if (checkHorizontalLeft(i, j, slots) !== NO_PLAYER) {
    console.log("left");
    return checkHorizontalLeft(i, j, slots);
  }
  if (checkHorizontalRight(i, j, slots) !== NO_PLAYER) {
    console.log("right");
    console.log(i, j);
    return checkHorizontalRight(i, j, slots);
  }
  return NO_PLAYER;
};

const checkHorizontalRight = (i, j, slots) => {
  const playerAtFirstSlot = slots[i][j];
  for (let k = 1; k < 4; k++) {
    if (j + k > DEFAULT_COLS_IN_CONNECT_4 - 1) {
      return NO_PLAYER;
    } else if (slots[i][j + k] !== playerAtFirstSlot) {
      return NO_PLAYER;
    }
  }
  return playerAtFirstSlot;
};

const checkHorizontalLeft = (i, j, slots) => {
  const playerAtFirstSlot = slots[i][j];
  for (let m = 1; m < 4; m++) {
    if (j - m < 0) {
      return NO_PLAYER;
    } else if (slots[i][j - m] !== playerAtFirstSlot) {
      return NO_PLAYER;
    }
  }
  return playerAtFirstSlot;
};

const checkVertical = (i, j, slots) => {
  if (checkVerticalUp(i, j, slots) !== NO_PLAYER) {
    return checkVerticalUp(i, j, slots);
  }
  if (checkVerticalDown(i, j, slots) !== NO_PLAYER) {
    return checkVerticalDown(i, j, slots);
  }
  return NO_PLAYER;
};

const checkVerticalUp = (i, j, slots) => {
  const playerAtFirstSlot = slots[i][j];
  for (let m = 1; m < 4; m++) {
    if (i - m < 0) {
      return NO_PLAYER;
    } else if (slots[i - m][j] !== playerAtFirstSlot) {
      return NO_PLAYER;
    }
  }
  return playerAtFirstSlot;
};

const checkVerticalDown = (i, j, slots) => {
  const playerAtFirstSlot = slots[i][j];
  for (let k = 1; k < 4; k++) {
    if (i + k > DEFAULT_ROWS_IN_CONNECT_4 - 1) {
      return NO_PLAYER;
    } else if (slots[i + k][j] !== playerAtFirstSlot) {
      return NO_PLAYER;
    }
  }
  return playerAtFirstSlot;
};

const checkDiagonal = (i, j, slots) => {
  if (checkDiagonalTopLeft(i, j, slots) !== NO_PLAYER) {
    return checkDiagonalTopLeft(i, j, slots);
  }
  if (checkDiagonalTopRight(i, j, slots) !== NO_PLAYER) {
    return checkDiagonalTopRight(i, j, slots);
  }
  if (checkDiagonalBottomLeft(i, j, slots) !== NO_PLAYER) {
    return checkDiagonalBottomLeft(i, j, slots);
  }
  if (checkDiagonalBottomRight(i, j, slots) !== NO_PLAYER) {
    return checkDiagonalBottomRight(i, j, slots);
  }
  return NO_PLAYER;
};

const checkDiagonalTopLeft = (i, j, slots) => {
  const playerAtFirstSlot = slots[i][j];
  for (let m = 1; m < 4; m++) {
    if (i - m < 0 || j - m < 0) {
      return NO_PLAYER;
    } else if (slots[i - m][j - m] !== playerAtFirstSlot) {
      return NO_PLAYER;
    }
  }
  return playerAtFirstSlot;
};

const checkDiagonalTopRight = (i, j, slots) => {
  const playerAtFirstSlot = slots[i][j];
  for (let k = 1; k < 4; k++) {
    if (j + k > DEFAULT_COLS_IN_CONNECT_4 - 1 || i - k < 0) {
      return NO_PLAYER;
    } else if (slots[i - k][j + k] !== playerAtFirstSlot) {
      return NO_PLAYER;
    }
  }
  return playerAtFirstSlot;
};

const checkDiagonalBottomLeft = (i, j, slots) => {
  const playerAtFirstSlot = slots[i][j];
  for (let k = 1; k < 4; k++) {
    if (i + k > DEFAULT_ROWS_IN_CONNECT_4 - 1 || j - k < 0) {
      return NO_PLAYER;
    } else if (slots[i + k][j - k] !== playerAtFirstSlot) {
      return NO_PLAYER;
    }
  }
  return playerAtFirstSlot;
};

const checkDiagonalBottomRight = (i, j, slots) => {
  const playerAtFirstSlot = slots[i][j];
  for (let k = 1; k < 4; k++) {
    if (i + k > DEFAULT_ROWS_IN_CONNECT_4 - 1 || j + k > DEFAULT_COLS_IN_CONNECT_4 - 1) {
      return NO_PLAYER;
    } else if (slots[i + k][j + k] !== playerAtFirstSlot) {
      return NO_PLAYER;
    }
  }
  return playerAtFirstSlot;
};
