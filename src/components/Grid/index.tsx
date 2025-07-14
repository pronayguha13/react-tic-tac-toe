import { useState } from "react";
import Square from "../Square";
import "./style.css";
const Grid = () => {
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState<boolean>(true);
  const [playerMoves, setPlayerMoves] = useState<Map<string, Array<number>>>(
    new Map([
      ["firstPlayer", []],
      ["secondPlayer", []],
    ])
  );

  const updatePlayerMove = (player: string, cellNumber: number) => {
    const updatedPlayerMoves = new Map(playerMoves);
    console.log(updatedPlayerMoves.values());
    const existingMoves = updatedPlayerMoves.get(player) || [];
    // const opponentMoves = updatedPlayerMove.get("")
    if (existingMoves.includes(cellNumber)) {
      window.alert("Alreday selected");
    } else {
      updatedPlayerMoves.set(player, [...existingMoves, cellNumber]);
      setPlayerMoves(updatedPlayerMoves);
    }
  };
  /**
   * @description Function to handle user move by clicking on any Square component
   * @param {number} cellNumber index of the cell where the user has clicked
   */
  const handleClick = (cellNumber: number) => {
    updatePlayerMove(
      isFirstPlayerTurn ? "firstPlayer" : "secondPlayer",
      cellNumber
    );
    setIsFirstPlayerTurn((prev) => !prev);
  };
  return (
    <div className="grid">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, index) => (
        <Square key={index} handleClick={() => handleClick(index)} />
      ))}
    </div>
  );
};

export default Grid;
