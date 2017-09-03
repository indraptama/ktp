import {h} from 'preact';
import style from './style';


export default function UserCard(props) {
  const userSex = props.gender === "female" ? "genderBgFemale" : "genderBgMale";
  const sexColor = props.gender === "female" ? "#E91E63" : "#673AB7";
  const sexAvatar = props.gender === "female" ? genderStyle.female : genderStyle.male;
  return (
    <div href="#" style={Style.UserCard}>
      <div style={sexAvatar}>
        <img src={props.image} alt=""/>
      </div>
      <div style={Style.UserCard_desc}>
        <h6>{props.fullName}</h6>
        <span>{props.nik}</span>
      </div>

    </div>
  )
}


const Style = {
  UserCard: {
    maxWidth: '160px',
    borderRadius: '2px',
    margin: '.25rem',
    transition: 'box-shadow 250ms ease',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #eee',
  },
  UserCard_desc:{
    fontSize: 12,
    backgroundColor: '#fff',
    textTransform: 'capitalize',
    lineHeight: 1.5,
    padding: 8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  UserCard_img: {
    backgroundColor: '#fff',
    width: '160px',
    height: '160px',
    overflow: 'hidden'
  }
}

const genderStyle = {
  male: {
    backgroundColor: "#2196F3",
    backgroundImage: "url('assets/icons/male.svg')",
    width: '160px',
    height: '160px',
    overflow: 'hidden',
  },
  female: {
    backgroundColor: "#E91E63",
    backgroundImage: "url('assets/icons/female.svg')",
    width: '160px',
    height: '160px',
    overflow: 'hidden',
  },
}
