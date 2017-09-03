import {h, Component } from 'preact';
import KtpField from '../../components/KtpField';
import UserCard from '../../components/UserCard';
import KtpResult from '../../components/KtpResult';
import Modal from '../../components/Modal';
import ButtonFab from '../../components/ButtonFab';
import { observer } from 'mobx-react';

@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultKtp: defaultDataKtp,
      openModal: false,
    }
  }

  submitNewKtp(value) {
    // add new KTP
    if (value._index === undefined ) {
      this.props.store.addNewKtp(value);
      this.setState({
        openModal: false,
      })
    }

    // update exsisten KTP
    else {
      this.props.store.updateKtp(value);
      this.setState({
        defaultKtp: defaultDataKtp,
        openModal: false,
      })
    }
  }

  deleteKtp(value) {
     this.props.store.deleteKtp(value);
  }

  updateKtp(value) {
    const urut = this.props.store.KTPS.findIndex( i => i._idx === value);
    this.setState({
      defaultKtp: this.props.store.KTPS[urut].ktpData,
      openModal: true,
    })
  }

  modalOpen(e) {
    e.preventDefault();
    this.setState({
      openModal: true,
    })
  }

  modalClose(e) {
    e.preventDefault();
    this.setState({
      openModal: false,
      defaultKtp: defaultDataKtp,
    })
  }

  render() {
    const { KTPS } = this.props.store;

    const renderCard = KTPS.slice().map(ktp => (
      <div key={ktp._idx}><UserCard fullName={ktp.ktpData.fullName} nik={ktp.ktpData.nik} gender={ktp.ktpData.gender}/></div>
    ))
    const renderResult = KTPS.slice().map(ktp => (
      <div key={ktp._idx}>
        <KtpResult dataKTP={ktp.ktpData} index={ktp._idx} editButton={this.updateKtp.bind(this)} removeButton={this.deleteKtp.bind(this)}/>
      </div>
    ))

    return (
      <div>
        <div style={Style.mainContent}>
          <div style={Style.cardContainer}>
            <div style={Style.cardInnerContainer}>
              {renderCard}
            </div>
            <div style={Style.addActionContainer}>
              <ButtonFab><i className="material-icons" onClick={this.modalOpen.bind(this)}>add</i></ButtonFab>
            </div>
          </div>

          <div style={Style.resultContainer}>
            {renderResult}
          </div>
        </div>
        <div>
          <Modal isActive={this.state.openModal}>
            <KtpField Submit={this.submitNewKtp.bind(this)} cancelInput={this.modalClose.bind(this)} defaultData={this.state.defaultKtp} />
          </Modal>
        </div>
      </div>);
  }
}


const Style = {
  mainContent: {
    marginTop: 56,
    display: 'flex',
  },
  cardContainer: {
    width: '50%',
    padding: 16,
  },
  cardInnerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  resultContainer: {
    width: '50%',
    backgroundColor: '#fff',
    minHeight: 'calc(100vh - 56px)',
  },
  addActionContainer: {
    textAlign: 'right',
    padding: 16,
  }
}



const defaultDataKtp = {
  _index: undefined,
  _id: "",
  nik: "",
  fullName: "",
  bornPlace: "",
  bornDay: "",
  bornMonth: "",
  bornYear: "",
  gender: "male",
  streetAddress: "",
  rt: "",
  rw: "",
  kelurahanType: "desa",
  kelurahanName: "",
  kecamatan: "",
  cityType: "kabupaten",
  cityName: "",
  martialStatus: "single",
  occupation: "",
}
