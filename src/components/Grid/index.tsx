import { useState } from "react";

import Square from "../Square";
import "./style.css";

function Grid() {
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState<boolean>(true);
  const [playerMoves, setPlayerMoves] = useState<Map<string, Array<number>>>(
    () => new Map([
      ["firstPlayer", []],
      ["secondPlayer", []],
    ]),
  );

  const updatePlayerMove = (player: string, cellNumber: number) => {
    const updatedPlayerMoves = new Map(playerMoves);
    const existingMoves = updatedPlayerMoves.get(player) || [];

    updatedPlayerMoves.set(player, [...existingMoves, cellNumber]);
    setPlayerMoves(updatedPlayerMoves);
    setIsFirstPlayerTurn(prev => !prev);
  };
  /**
   * @description Function to handle user move by clicking on any Square component
   * @param {number} cellNumber index of the cell where the user has clicked
   */
  const handleClick = (cellNumber: number) => {
    updatePlayerMove(
      isFirstPlayerTurn ? "firstPlayer" : "secondPlayer",
      cellNumber,
    );
  };
  /**
   * @description Function to get whether a cell is selected or not
   * @param cellIndex index of the cell
   * @returns {boolean} whether the cell is selected or not
   */
  const getIsSelected = (cellIndex: number): boolean => {
    const firstPlayerMoves: Array<number>
      = playerMoves.get("firstPlayer") || [];

    const secondPlayerMoves: Array<number>
      = playerMoves.get("secondPlayer") || [];

    return (
      firstPlayerMoves.includes(cellIndex)
      || secondPlayerMoves.includes(cellIndex)
    );
  };
  /**
   * @description Function to decide whether the cell is selected or not and by whom
   * @param cellIndex index of the cell selected
   * @returns {string | null} name of the selected player or null
   */
  const getPlayerSelection = (cellIndex: number): string | null => {
    const firstPlayerMoves: Array<number>
      = playerMoves.get("firstPlayer") || [];

    const secondPlayerMoves: Array<number>
      = playerMoves.get("secondPlayer") || [];

    if (firstPlayerMoves.includes(cellIndex))
      return "firstPlayer";
    if (secondPlayerMoves.includes(cellIndex))
      return "secondPlayer";

    return null;
  };

  // const findPattern = () => {
  //   const firstPlayerMoves = playerMoves.get("firstPlayer") || [];
  //   const secondPlayerMoves = playerMoves.get("secondPlayer") || [];
  //   // if there are less than three moves then move on
  //   // if (isFirstPlayerTurn) {

  //   // }
  // };

  return (
    <div className="grid">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, index) => (
        <Square
          key={el}
          handleClick={() => handleClick(index)}
          isSelected={getIsSelected(index)}
          player={getPlayerSelection(index)}
        />
      ))}
    </div>
  );
}

export default Grid;
