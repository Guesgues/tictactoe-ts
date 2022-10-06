interface Props {
  value: string;
  onClick(): void;
}
function Square(props: Props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
export default Square;
