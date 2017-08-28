import { h, Component } from 'preact';
import style from './style';
import gstyle from '../../components/_style';
import KtpField from '../../components/KtpField';
import KtpResult from '../../components/KtpResult';
import UserPill from '../../components/UserPill';
import UserCard from '../../components/UserCard';


export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pihak_1: {},
			pihak_2: {}
		};
		this.handleSaveData = this.handleSaveData.bind(this);

  }

	handleSaveData(data) {
		const pihak_1 = { ...this.state.pihak_1 };
		const noUrut = (Object.keys(pihak_1).length - 1) + 1;
		const nik = data.nik;
    pihak_1[`${noUrut}`] = data;
		// pihak_1[`${noUrut}_${data._id}`] = data;
		// pihak_1[data._id] = data;
		this.setState({
			pihak_1
		});
	}


	render() {
		const persons = this.state.pihak_1;
    const Pihaks_1 = Object.keys(persons).map(person => {
      return (
        <KtpResult dataKTP={persons[person]} key={persons[person].nik} />
      )
    })

		return (
			<div className={style.home}>
				<div className={gstyle.flex}>
					<div className={[gstyle.w_50, style.Compasitor].join(' ')}>
            <UserPill gender={"female"} fullName="indra pratama putra" nik="12345678912345" onClick={console.log('hallo')}/>
						<UserCard gender={"male"} fullName="Tn. indra pratama putra" nik="12345678912345" onClick={console.log('hallo')}/>
					</div>

					<div className={[gstyle.w_50, style.ResultPaper].join(' ')}>
						{
							Pihaks_1

            }
					</div>
				</div>
			</div>
		);
	}
}

{/* <KtpField saveData={this.handleSaveData} /> */}
