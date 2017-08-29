import { h,Component } from 'preact';

// import Library
import nikParser from '../../library/nikparser.js';

import style from './style';
import gstyle from '../_style';


// Import Components
import TextInput from '../TextInput';
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
    this.handleInputNik = this.handleInputNik.bind(this);
  }


  handleSave(e) {
    e.preventDefault();
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
    //  Export State to Parent Components as Object
    this.props.saveData(dataKTP);

    // Reset State to initial Value
    this.setState({
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
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleInputNik(event) {
    const Value = event.target.value;
    const NikResult = (NIK) => {
      if (NIK.length === 16) {
        const NIKParser = nikParser(NIK);
        console.log(NIKParser);
        this.setState({
          nik: Value,
          bornDay: NIKParser.bornDay,
          bornMonth: NIKParser.bornMonth,
          bornYear: NIKParser.bornYear,
          gender: NIKParser.gender,
        })
      }

      else {
        console.log('error')
        this.setState({
          nik: Value,
        })
      }
    }

    NikResult(Value);

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
            <li><TextInput Value={this.state.nik} title="Nomor Induk Kependudukan" name="nik" isNumeric maxlength="16" onChange={this.handleInputNik}/></li>
            <li><TextInput Value={this.state.fullName} title="Nama Lengkap" name="fullName" onChange={this.handleInputChange}/></li>
            <li className={gstyle.flex}>
              <div className={gstyle.w_50}>
                <TextInput Value={this.state.bornPlace} title="Kota Kelahiran" name="bornPlace" onChange={this.handleInputChange}/>
              </div>
              <div className={[gstyle.flex, gstyle.w_50].join(' ')}>
                <TextInput Value={this.state.bornDay} title="Tgl.Lahir" name="bornDay" isNumeric maxlength="2" onChange={this.handleInputChange}/>
                <div className={gstyle.mh1}>
                  <TextInput Value={this.state.bornMonth} title="Bln.Lahir" name="bornMonth" isNumeric maxlength="2" onChange={this.handleInputChange}/>
                </div>
                <TextInput Value={this.state.bornYear} title="Thn.lahir" name="bornYear" isNumeric maxlength="4" onChange={this.handleInputChange}/>
              </div>
            </li>
            <li><DropDown Value={this.state.gender} dataItems={gender} title="jenis Kelamin" name="gender" onChange={this.handleInputChange}/></li>
            <li><h4>Alamat</h4></li>
            <li className={gstyle.flex}>
              <div className={gstyle.w_50}>
                <TextInput Value={this.state.streetAddress} title="alamat" name="streetAddress" onChange={this.handleInputChange}/>
              </div>
              <div className={[gstyle.flex, gstyle.w_50].join(' ')}>
                <div className={gstyle.mr1}>
                  <TextInput Value={this.state.rt} title="RT" name="rt" isNumeric maxlength="3" onChange={this.handleInputChange}/>
                </div>
                <TextInput Value={this.state.rw} title="RW" name="rw" isNumeric maxlength="3" onChange={this.handleInputChange}/>
              </div>
            </li>
            <li className={[gstyle.flex]}>
              <DropDown Value={this.state.kelurahanType} dataItems={kelurahan} title="jenis administrasi" name="kelurahanType" onChange={this.handleInputChange}/>
              <TextInput Value={this.state.kelurahanName} title="Nama Desa/Kelurahan" name="kelurahanName" placeholder="contoh: Desa Bersemi Indah" onChange={this.handleInputChange}/>
            </li>
            <li>
              <TextInput Value={this.state.kecamatan} title="Kecamatan" name="kecamatan" onChange={this.handleInputChange}/>
            </li>
            <li className={[gstyle.flex]}>
              <DropDown Value={this.state.cityType} dataItems={city} title="jenis administrasi" name="cityType" onChange={this.handleInputChange}/>
              <TextInput Value={this.state.cityName} title="Kota/Kabupaten" name="cityName" onChange={this.handleInputChange}/>
            </li>
            <li><h4>Pekerjaan & Status Pernikahan</h4></li>
            <li className={[gstyle.flex]}>
              <DropDown Value={this.state.martialStatus} dataItems={martialStatus} title="Status Pernikahan" name="martialStatus" onChange={this.handleInputChange}/>
              <TextInput Value={this.state.occupation} title="Pekerjaan" name="occupation" onChange={this.handleInputChange}/>
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
