import {h} from 'preact';

export default function ButtonFab(props) {
  const Type = props.buttonType;
  return (
    <button onClick={props.onClick} style={Style.fab}>
      <span style={Style.span}>{props.children}</span>
    </button>
  )
}

const Style = {
  fab: {
    width: 48,
    height: 48,
    backgroundColor: "#673AB7",
    color: "#fff",
    margin: 0,
    lineHeight: "48px",
    borderRadius: 500,
    border: "none",
    fontSize: 24,
    outline: "none",
    position: "relative",
    verticalAlign: "middle",
  },
  span: {
    margin: 0,
    verticalAlign: "middle",
    lineHeight: 1,
    padding: 0,
  }
}
