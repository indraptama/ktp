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
      modalOpen: false,
		};
		this.handleSaveData = this.handleSaveData.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);

  }

	handleSaveData(data) {
		const pihak_1 = { ...this.state.pihak_1 };
		const noUrut = (Object.keys(pihak_1).length - 1) + 1;
		const nik = data.nik;
    pihak_1[`${noUrut}`] = data;
		// pihak_1[`${noUrut}_${data._id}`] = data;
		// pihak_1[data._id] = data;
		this.setState({
			pihak_1,
      modalOpen: false,
		});
	}

  modalOpen(e) {
    e.preventDefault();
    this.setState({
      modalOpen: true,
    })
  }

  modalClose(e) {
    e.preventDefault();
    this.setState({
      modalOpen: false,
    })
  }

	render() {
		const persons = this.state.pihak_1;

    const userCards = Object.keys(persons).map(person => {
      return (
        <div key={persons[person].nik}>
          <UserCard gender={persons[person].gender}
            fullName={persons[person].fullName}
            nik={persons[person].nik} /></div>
      )
    })

    const resultPihaks_1 = Object.keys(persons).map(person => {
      return (
        <div key={persons[person].nik}>
          <KtpResult dataKTP={persons[person]} editButton={this.modalOpen}/>
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
                <ButtonFab onClick={this.modalOpen}>
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

        <Modal isActive={this.state.modalOpen}>
          <KtpField saveData={this.handleSaveData} cancelInput={this.modalClose}/>
        </Modal>
			</div>
		);
	}
}

{/* <KtpField saveData={this.handleSaveData} /> */}

{/* <UserCard gender={"male"} fullName="Tn. indra pratama putra" nik="12345678912345" onClick={console.log('hallo')}/> */}
