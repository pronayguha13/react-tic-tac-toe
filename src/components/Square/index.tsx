import "./style.css";

type SquareProps = {
  content: string;
  handleClick: () => void;
};
function Square({ content, handleClick }: SquareProps) {
  return (
    <div className="square" onClick={handleClick}>
      {content}
    </div>
  );
}

export default Square;
