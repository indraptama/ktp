import {h} from 'preact';
import style from './style';


export default function UserCard(props) {
  const userSex = props.gender === "female" ? "genderBgFemale" : "genderBgMale";
  const sexColor = props.gender === "female" ? "#E91E63" : "#673AB7";
  const sexAvatar = props.gender === "female" ? genderStyle.female : genderStyle.male;
  return (
    <div href="#" className={[style.UserCard, userSex].join(' ')}>
      <div className={style.UserCard_img} style={sexAvatar}>
        <img src={props.image} alt=""/>
      </div>
      <div className={style.UserCard_desc}>
        <h6 className={style.UserCard_name}>{props.fullName}</h6>
        <span className={style.UserCard_nik}>{props.nik}</span>
      </div>

    </div>
  )
}

const genderStyle = {
  male: {
    backgroundColor: "#2196F3",
    backgroundImage: "url('assets/icons/male.svg')",
  },
  female: {
    backgroundColor: "#E91E63",
    backgroundImage: "url('assets/icons/female.svg')",
  },
}
