import "./style.css";

type SquareProps = {
  handleClick: () => void;
  isSelected: boolean;
  player: string | null;
};
function Square({ isSelected, player, handleClick }: SquareProps) {
  const onClickSquare = () => {
    if (!isSelected) {
      handleClick();
    }
  };

  const getCellContent = () => {
    if (player === "firstPlayer") {
      return "X";
    }
    else if (player === "secondPlayer") {
      return "O";
    }
    else {
      return "";
    }
  };
  return (
    <div className="square" onClick={onClickSquare}>
      {getCellContent()}
    </div>
  );
}

export default Square;
