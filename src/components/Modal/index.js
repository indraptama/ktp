import {h} from 'preact';

export default function Modal(props) {

  let active = props.isActive ? Style.ModalActive : Style.ModalOff

  return(
    <div style={active}>
      {props.children}
    </div>
  )
}

const Style = {
  ModalActive: {
    display: "block",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.5)",
    overflowY: "scroll",
    display: "flex",
    alignItems: "center",
    justifyContent: "Center",
  },
  ModalOff: {
    display: "none",

  }
}
