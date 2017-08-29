import {h} from 'preact';
import style from './style.css';
import gstyle from '../_style.css';

export default function UserPill(props) {

  const userSex = props.gender === "female" ? "genderBgFemale" : "genderBgMale";

  return (
    <a className={[style.UserPill, userSex].join(' ')} href="#" onClick={props.onClick}>
      <div className={style.UserPill_container}>
        <div className={style.UserPill_img}>
          <img src={props.images} alt=""/>
        </div>
        <div className={style.UserPill_data}>
          <h6>{props.fullName}</h6>
          <span>{props.nik}</span>
        </div>
      </div>
    </a>
  )
}
