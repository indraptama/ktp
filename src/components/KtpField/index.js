import { h,Component } from 'preact';
import style from './style';
import gstyle from '../_style';


// Import Components
import TextInput from '../TextInput';
// import MaskInput from '../MaskInput';
import DropDown from '../DropDown';

export default class KtpField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      nik: '',
      fullName:'',
      bornPlace:'',
      bornDay:'',
      bornMonth:'',
      bornYear:'',
      gender:'male',
      streetAddress:'',
      rt:'',
      rw:'',
      kelurahanType:'desa',
      kelurahanName:'',
      kecamatan:'',
      cityType:'kabupaten',
      cityName:'',
      martialStatus:'single',
      occupation:'',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSave(e) {
    let dataKTP = {
      _id: this.state.nik,
      nik: this.state.nik,
      fullName: this.state.fullName,
      bornPlace: this.state.bornPlace,
      bornDate: `${this.state.bornDay}-${this.state.bornMonth}-${this.state.bornYear}`,
      gender: this.state.gender,
      streetAddress: this.state.streetAddress,
      rt: this.state.rt,
      rw: this.state.rw,
      kelurahanType: this.state.kelurahanType,
      kelurahanName: this.state.kelurahanName,
      kecamatan: this.state.kecamatan,
      cityType: this.state.cityType,
      cityName: this.state.cityName,
      martialStatus: this.state.martialStatus,
      occupation: this.state.occupation,
    }
    e.preventDefault();
    this.props.saveData(dataKTP)
    // console.log(dataKTP);
  }

  // handleCancel(e) {
  //   e.preventDefault();
  //   this.props.cancelInput;
  // }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className={style.KtpField}>
        <header className={style.KtpField_header}>
          <img src="assets/icons/ktp.svg" alt=""/>
          <h3>Isilah data berikut sesuai dengan Kartu Identitas Penghadap</h3>
        </header>
        <form>
          <ul>
            <li><h4>Informasi Pribadi</h4></li>
            <li><TextInput title="Nomor Induk Kependudukan" name="nik" isNumeric maxlength="16" onChange={this.handleInputChange}/></li>
            <li><TextInput title="Nama Lengkap" name="fullName" onChange={this.handleInputChange}/></li>
            <li className={gstyle.flex}>
              <div className={gstyle.w_50}>
                <TextInput title="Kota Kelahiran" name="bornPlace" onChange={this.handleInputChange}/>
              </div>
              <div className={[gstyle.flex, gstyle.w_50].join(' ')}>
                <TextInput title="Tgl.Lahir" name="bornDay" isNumeric maxlength="2" onChange={this.handleInputChange}/>
                <div className={gstyle.mh1}>
                  <TextInput title="Bln.Lahir" name="bornMonth" isNumeric maxlength="2" onChange={this.handleInputChange}/>
                </div>
                <TextInput title="Thn.lahir" name="bornYear" isNumeric maxlength="4" onChange={this.handleInputChange}/>
              </div>
            </li>
            <li><DropDown dataItems={gender} title="jenis Kelamin" name="gender" onChange={this.handleInputChange}/></li>
            <li><h4>Alamat</h4></li>
            <li className={gstyle.flex}>
              <div className={gstyle.w_50}>
                <TextInput title="alamat" name="streetAddress" onChange={this.handleInputChange}/>
              </div>
              <div className={[gstyle.flex, gstyle.w_50].join(' ')}>
                <div className={gstyle.mr1}>
                  <TextInput title="RT" name="rt" isNumeric maxlength="3" onChange={this.handleInputChange}/>
                </div>
                <TextInput title="RW" name="rw" isNumeric maxlength="3" onChange={this.handleInputChange}/>
              </div>
            </li>
            <li className={[gstyle.flex]}>
              <DropDown dataItems={kelurahan} title="jenis administrasi" name="kelurahanType" onChange={this.handleInputChange}/>
              <TextInput title="Nama Desa/Kelurahan" name="kelurahanName" placeholder="contoh: Desa Bersemi Indah" onChange={this.handleInputChange}/>
            </li>
            <li>
              <TextInput title="Kecamatan" name="kecamatan" onChange={this.handleInputChange}/>
            </li>
            <li className={[gstyle.flex]}>
              <DropDown dataItems={city} title="jenis administrasi" name="cityType" onChange={this.handleInputChange}/>
              <TextInput title="Kota/Kabupaten" name="cityName" onChange={this.handleInputChange}/>
            </li>
            <li><h4>Pekerjaan & Status Pernikahan</h4></li>
            <li className={[gstyle.flex]}>
              <DropDown dataItems={martialStatus} title="Status Pernikahan" name="martialStatus" onChange={this.handleInputChange}/>
              <TextInput title="Pekerjaan" name="occupation" onChange={this.handleInputChange}/>
            </li>
            <li>
            </li>
    			</ul>
          <div className={style.KtpField_action}>

              <button className={style.KtpField_buttonCancel}onClick={this.props.cancelInput}>Cancel</button>
              <button className={style.KtpField_buttonSave}onClick={this.handleSave.bind(this)}>Save</button>

          </div>
    		</form>
    	</div>
    );
  }
}


const gender = [
  {
    label: 'Laki-laki',
    value: 'male'
  },
  {
    label: 'Perempuan',
    value: 'female'
  }
]

const kelurahan = [
  {
    label: 'Desa',
    value: 'desa'
  },
  {
    label: 'Kelurahan',
    value: 'kelurahan'
  }
]

const city = [
  {
    label: 'Kabupaten',
    value: 'kabupaten'
  },
  {
    label: 'Kota',
    value: 'kota'
  }
]



const martialStatus = [
  {
    label: 'Belum Menikah',
    value: 'single'
  },
  {
    label: 'Menikah',
    value: 'marriage'
  },
  {
    label: 'Cerai Hidup',
    value: 'divorced'
  },
  {
    label: 'Cerai Mati',
    value: 'widowed'
  }
]
