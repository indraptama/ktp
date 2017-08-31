import {h, Component } from 'preact';
import style from './style';
import { observer } from 'mobx-react';

// import Components
import UserCard from '../../components/UserCard';
import KtpField from '../../components/KtpField';
import Modal from '../../components/Modal';
import ButtonFab from '../../components/ButtonFab';


@observer
export default class Home extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
			modalOpen: false,
		}
	}

	handleSaveData(data) {
		let dataKtps = { ...this.props.store.dataKtp };
		this.props.store.addNewKtp(data);
		this.setState({
			modalOpen: false,
		})
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

	render(){
		const { dataKtp } = this.props.store;
		const Cards = dataKtp.map(key => {
			return (
				<UserCard nik={ key.nik }
						gender={ key.gender }
						fullName={ key.fullName } />
			)
		})
		return (
			<div className={style.home}>
				<div style="display:flex">
						<div style={"width:50%"}>
							<ButtonFab onClick={this.modalOpen.bind(this)} />
						</div>
						<div style={"width:50%"}>
							<div style="display:flex;flex-wrap:wrap">
								{Cards}
							</div>
						</div>
				</div>
				<Modal isActive={this.state.modalOpen}>
					<KtpField outputData={this.handleSaveData.bind(this)} cancelInput={this.modalClose.bind(this)} defaultData/>
				</Modal>
			</div>
		)
	}
}
