import "./style.css";
type SquareProps = {
  handleClick: () => void;
};
const Square = ({ handleClick }: SquareProps) => {
  return (
    <div className="square" onClick={handleClick}>
      Square
    </div>
  );
};

export default Square;
