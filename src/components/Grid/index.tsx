import { useEffect, useRef, useState } from "react";

import Square from "../Square";
import "./style.css";

function Grid({ updateScore }: { updateScore: (winner: string) => void }) {
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState<boolean>(true);
  const [board, setBoard] = useState<Array<Array<string>>>(Array.from({ length: 3 }).fill(null).map(() => Array.from({ length: 3 }).fill("")) as Array<Array<string>>);
  const [winner, setWinner] = useState<string | null>(null);
  const moveCount = useRef<number>(0);

  const handleCellClick = (cellIndex: number, rowIndex: number) => {
    const playerMark = isFirstPlayerTurn ? "X" : "O";
    const tempBoard = board.map(row => [...row]);
    if (tempBoard[rowIndex][cellIndex].length)
      return;

    tempBoard[rowIndex][cellIndex] = playerMark;
    setBoard(tempBoard);
    setIsFirstPlayerTurn(prev => !prev);
    moveCount.current = moveCount.current + 1;
  };

  const allEqual = (sequence: string[]): boolean => {
    // ! Check whether all the elements have length or not
    const isAnyEmpty = sequence.some(element => !element.length);

    if (isAnyEmpty)
      return false;

    const isAllEqual = sequence.every(val => val === sequence[0]);
    const winnerPlayer = !isAllEqual ? null : sequence[0] === "X" ? "firstPlayer" : "secondPlayer";
    if (winnerPlayer) {
      setWinner(winnerPlayer);
    }
    return isAllEqual;
  };

  const checkWinner = () => {
    let isWinnerFound = false;
    // ! First check the rows
    board.forEach((row: string[]) => {
      const isEqual = allEqual(row);

      if (isEqual) {
        isWinnerFound = true;
      }
    });

    // ! Second check the columns
    if (!isWinnerFound) {
      for (let i = 0; i < board.length; i++) {
        const column: string[] = [];
        board.forEach((row) => {
          column.push(row[i]);
        });

        const isAllEqual = allEqual(column);
        console.log("🚀 ~ checkWinner ~ isAllEqual:", isAllEqual);

        if (isAllEqual) {
          isWinnerFound = true;
          return;
        }
      }
    }
    // ! Third check the two diagonals
    for (let i = 0; i < 2; i++) {
      const firstDiagonal = [board[0][0], board[1][1], board[2][2]];
      const secondDiagonal = [board[0][2], board[1][1], board[2][0]];

      if (allEqual(firstDiagonal)) {
        isWinnerFound = true;
        break;
      }
      else if (allEqual(secondDiagonal)) {
        isWinnerFound = true;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array.from({ length: 3 }).fill(null).map(() => Array.from({ length: 3 }).fill("")) as Array<Array<string>>);
    setIsFirstPlayerTurn(true);
    setWinner(null);
    moveCount.current = 0;
  };

  useEffect(() => {
    if (winner) {
      updateScore(winner);
      resetGame();
    }
  }, [winner]);

  useEffect(() => {
    if (moveCount.current >= 5 && moveCount.current <= 9) {
      checkWinner();
    }

    if (moveCount.current === 9)
      resetGame();
  }, [moveCount.current]);

  const paintBoard = () =>
    board.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => (
        <Square key={cellIndex} content={cell} handleClick={() => handleCellClick(cellIndex, rowIndex)} />
      ));
    });

  return (
    <div className="grid">
      {paintBoard()}
    </div>
  );
}

export default Grid;
