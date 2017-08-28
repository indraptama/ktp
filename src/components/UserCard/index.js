import {h} from 'preact';
import style from './style';


export default function UserCard(props) {
  const userSex = props.gender === "female" ? "genderBgFemale" : "genderBgMale";
  return (
    <div href="#" className={[style.UserCard, userSex].join(' ')}>
      <div className={style.UserCard_img} style={`background-color: url(${props.image})`}>
        <img src={props.image} alt=""/>
      </div>
      <div className={style.UserCard_desc}>
        <h6 className={style.UserCard_name}>{props.fullName}</h6>
        <span className={style.UserCard_nik}>{props.nik}</span>
      </div>

    </div>
  )
}
