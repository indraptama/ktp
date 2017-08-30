import { h, Component } from 'preact';
import style from './style';
import gstyle from '../../components/_style';
import KtpField from '../../components/KtpField';
import KtpResult from '../../components/KtpResult';
import UserCard from '../../components/UserCard';
import ButtonFab from '../../components/ButtonFab';
import Modal from '../../components/Modal';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pihak_1: {},
			pihak_2: {},
      modalInputOpen: false,
      modalEditOpen: false,
		};
		this.handleSaveData = this.handleSaveData.bind(this);
    this.handleEditData = this.handleEditData.bind(this);
    this.modalInputOpen = this.modalInputOpen.bind(this);
    this.modalInputClose = this.modalInputClose.bind(this);
    this.modalEditOpen = this.modalEditOpen.bind(this);
    this.modalEditClose = this.modalEditClose.bind(this);
  }

	handleSaveData(data) {
		const pihak_1 = { ...this.state.pihak_1 };
		const noUrut = (Object.keys(pihak_1).length - 1) + 1;
		const nik = data.nik;
    pihak_1[`${noUrut}`] = data;

		this.setState({
			pihak_1,
      modalInputOpen: false,
		});
	}

  handleEditData(data) {
    this.setState({
      modalEditOpen: false,
    })
  }

  modalInputOpen(e) {
    e.preventDefault();
    this.setState({
      modalInputOpen: true,
    })
  }

  modalInputClose(e) {
    e.preventDefault();
    this.setState({
      modalInputOpen: false,
    })
  }

  modalEditOpen(e, data) {
    e.preventDefault();
    this.setState({
      modalEditOpen: true,
    })
  }

  modalEditClose(e, data) {
    e.preventDefault();
    this.setState({
      modalEditOpen: false,
    })
  }

	render() {
		const persons = this.state.pihak_1;

    const userCards = Object.keys(persons).map(person => {
      return (
        <div key={persons[person].nik}>
          <UserCard gender={persons[person].gender}
            fullName={persons[person].fullName}
            nik={persons[person].nik} />
        </div>
      )
    })

    const resultPihaks_1 = Object.keys(persons).map(person => {
      return (
        <div key={persons[person].nik}>
          <KtpResult dataKTP={persons[person]} editButton={this.modalEditOpen}/>
          <Modal isActive={this.state.modalEditOpen}>
            <KtpField outputData={this.handleEditData} cancelInput={this.modalEditClose} inputData={persons[person]} _idUrut={(Object.keys(persons[person]).length - 1) + 1}/>
          </Modal>
        </div>
      )
    })

		return (
			<div className={style.home}>
				<div className={gstyle.flex}>
					<div className={[gstyle.w_50, style.Compasitor].join(' ')}>
            <div className={style.party}>
              <header className={style.partyHeader}>
                <h6>Pihak Pertama</h6>
              </header>
              <div className={style.partyList}>
                {userCards}
              </div>
              <div className={style.partyFooter}>
                <ButtonFab onClick={this.modalInputOpen}>
                  <i class="material-icons md-24">add</i>
                </ButtonFab>
              </div>
            </div>
					</div>
					<div className={[gstyle.w_50, style.ResultPaper].join(' ')}>
						<ol>{
							resultPihaks_1
            }</ol>
					</div>
				</div>

        <Modal isActive={this.state.modalInputOpen}>
          <KtpField outputData={this.handleSaveData} cancelInput={this.modalInputClose} inputData={defaultDataKtp}/>
        </Modal>

			</div>
		);
	}
}

const defaultDataKtp = {
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
