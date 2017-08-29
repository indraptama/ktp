import {h} from 'preact';

export default function Grid(props) {
  return(
    <div style={Style.Grid}>
      {props.children}
    </div>
  )
}

function GridHalf(props) {
  return (
    <div style={Style.GridHalf}>
      {props.children}
    </div>
  )
}


const Style = {
  Grid: {
    display: "flex",
    flexWrap: "wrap",
  },
  GridHalf: {
    width: "50%",
  }
}
