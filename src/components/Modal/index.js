import {h} from 'preact';

export default function Modal(props) {

  let active = props.isActive ? Style.ModalActive : Style.ModalOff

  return(
    <div style={active}>
      <div style={Style.ModalContainer}>{props.children}</div>
    </div>
  )
}

const Style = {
  ModalActive: {
    display: "block",
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ModalOff: {
    display: "none",
  },

  ModalContainer: {
    maxHeight: "90%",
    overflowY: "scroll",
    borderRadius: "2px",
    boxShadow: "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
    backgroundColor: "#fff",
  }
}
