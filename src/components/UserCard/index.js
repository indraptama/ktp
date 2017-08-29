import {h} from 'preact';
import MaleIcon from './Icons/male.svg';
import FemaleIcon from './Icons/female.svg';

export default function UserCard(props) {
  const userSex = props.gender === "female" ? "genderBgFemale" : "genderBgMale";
  const UserCard_desc = props.gender === "female" ? Style.UserCard_desc_female : Style.UserCard_desc_male;
  const sexAvatar = props.gender === "female" ? Object.assign(genderStyle.female, Style.UserCard_img) : Object.assign(genderStyle.male, Style.UserCard_img);
  return (
    <div href="#" style={Style.UserCard}>
      <div style={sexAvatar}>
        <img src={props.image} alt=""/>
      </div>
      <div style={UserCard_desc}>
        <h6 style={Style.UserCard_name}>{props.fullName}</h6>
        <span style={Style.UserCard_nik}>{props.nik}</span>
      </div>

    </div>
  )
}

const genderStyle = {
  male: {
    backgroundColor: "#2196F3",
    backgroundImage: `url(${MaleIcon})`,
  },
  female: {
    backgroundColor: "#E91E63",
    backgroundImage: `url(${FemaleIcon})`,
  },
}

const Style = {
  UserCard: {
    color: '#fff',
    maxWidth: '160px',
    borderRadius: '2px',
    transition: 'box-shadow 250ms ease',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  UserCard_img: {
    width: '160px',
    height: '160px',
    overflow: 'hidden',
  },
  UserCard_desc_male: {
    padding: '.5rem',
    backgroundColor: '#2196F3',
  },
  UserCard_desc_female: {
    padding: '.5rem',
    backgroundColor: '#E91E63',
  },

  UserCard_name: {
    margin: '0',
    fontSize: '12px',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  UserCard_nik: {
    margin: '0',
    fontSize: '11px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
  }
}

// UserCard: 'hover,',
// UserCard: 'focus {',
//   boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
//   transition: 'box-shadow 250ms ease',
// },
